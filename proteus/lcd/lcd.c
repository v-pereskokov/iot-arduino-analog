// Lcd pinout settings
sbit LCD_RS at RB0_bit;
sbit LCD_EN at RB1_bit;
sbit LCD_D4 at RB2_bit;
sbit LCD_D5 at RB3_bit;
sbit LCD_D6 at RB4_bit;
sbit LCD_D7 at RB5_bit;

// Pin direction
sbit LCD_RS_Direction at TRISB0_bit;
sbit LCD_EN_Direction at TRISB1_bit;
sbit LCD_D4_Direction at TRISB2_bit;
sbit LCD_D5_Direction at TRISB3_bit;
sbit LCD_D6_Direction at TRISB4_bit;
sbit LCD_D7_Direction at TRISB5_bit;

char symbol;
char previous_symbol;
char text[64];
char message[64];

int i = 0;

void reset_text(char *text)
{
  int l, m;
  text[0] = 0;
  memset(text, 0, 64);
  i = 0;
}

void send_message(char *message)
{
  UART1_Write_Text(message);
  UART1_Write_Text("\r\n");
}

void show_text(char *message)
{
  Lcd_Cmd(_LCD_CLEAR);
  Lcd_Out(1, 1, message);
}

void exe_command()
{
  int j = 1, k = 0;
  
  for (j; j < i; ++j, ++k)
  {
    message[k] = text[j];
  }
  
  if (text[0] == 's')
  {
    show_text(message);
    reset_text(message);
  }
  else if (text[0] == 'h')
  {
    Lcd_Cmd(_LCD_CLEAR);
    reset_text(text);
    reset_text(message);
  }
}

void read_command() 
{
  if (UART1_Data_Ready())
  {
    previous_symbol = symbol;
    symbol = UART1_Read();
    
    if (symbol != '#') {
      if (previous_symbol == '#')
      {
        reset_text(text);
      }
    
      text[i] = symbol;
      ++i;
    }
    else
    {
      exe_command();
    }
  }
}

void main()
{
  UART1_Init(9600);

  Lcd_Init();
  Lcd_Cmd(_LCD_CURSOR_OFF);

  while (1)
  {
    read_command();
  }
}