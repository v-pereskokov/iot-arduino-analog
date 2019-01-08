int raw_temp;
char *temp = "000.0000 C";
char symbol = 'a';
char flag = 'a';
int count_flag = 5;

void send_message(char *message)
{
  UART1_Write_Text(message);
  UART1_Write_Text("\r\n");
}

void get_temperature()
{
  Ow_Reset(&PORTB, 1);                         // Onewire reset signal
  Ow_Write(&PORTB, 1, 0xCC);                   // Issue command SKIP_ROM
  Ow_Write(&PORTB, 1, 0x44);                   // Issue command CONVERT_T

  while (Ow_Read(&PORTB, 1) == 0) ;
  Ow_Reset(&PORTB, 1);                         // Onewire reset signal
  Ow_Write(&PORTB, 1, 0xCC);                   // Issue command SKIP_ROM
  Ow_Write(&PORTB, 1, 0xBE);                   // Issue command READ_SCRATCHPAD

  raw_temp  = Ow_Read(&PORTB, 1);              // Read temperature LSB byte
  raw_temp |= (Ow_Read(&PORTB, 1) << 8);       // Read temperature MSB byte

  if (raw_temp & 0x8000)
  {                       // If the temperature is negative
    temp[0] = '-';                              // Put minus sign (-)
    raw_temp = ~raw_temp + 1;                   // Change temperature value to positive form
  }
  else 
  {
    if ((raw_temp >> 4) >= 100)                  // If the temperatue >= 100 °C
    {
      temp[0] = '1';                            // Put 1 of hundreds
    }
    else
    {                                        // otherwise
      temp[0] = ' ';                            // put space ' '
    }
  }

    // Put the first two digits ( for tens and ones)
  temp[1] = ( (raw_temp >> 4) / 10 ) % 10 + 48;      // Put tens digit
  temp[2] =   (raw_temp >> 4)        % 10  + 48;     // Put ones digit

    // Put the 4 fraction digits (digits after the point)
    // Why 625: because we're working with 12-bit resolution
  temp[4] = ( (raw_temp & 0x0F) * 625) / 1000 + 48;          // Put thousands digit
  temp[5] = (((raw_temp & 0x0F) * 625) / 100 ) % 10 + 48;    // Put hundreds digit
  temp[6] = (((raw_temp & 0x0F) * 625) / 10 )  % 10 + 48;    // Put tens digit
  temp[7] = ( (raw_temp & 0x0F) * 625) % 10 + 48;            // Put ones digit

  send_message(temp);
}

void main() {
  int i;
  UART1_Init(9600);

  while(1) {
    if (UART1_Data_Ready())
    {
      symbol = UART1_Read();
    }
    
    if (symbol == 't')
    {
      if (flag == 'u' || flag == 'l')
      {
        i = 0;
        for (i; i < 5; ++i)
        {
          send_message(flag == 'u' ? " 127.0000 C" : "-12.0000 C");
          Delay_ms(1000);
        }
        flag = 'b';
      }
      else 
      {
        get_temperature(); 
      }
    }
    else if (symbol == 'u')
    {
      flag = 'u';
      symbol = 't';
    }
    else if (symbol == 'l')
    {
      flag = 'l';
      symbol = 't';
    }
    else
    {
      get_temperature();
    }
    Delay_ms(1000);
  }
}