// Stepper motor module connections
sbit Stepper_pin1 at RB0_bit;
sbit Stepper_pin2 at RB1_bit;
sbit Stepper_pin3 at RB2_bit;
sbit Stepper_pin4 at RB3_bit;
sbit Stepper_pin1_Direction at TRISB0_bit;
sbit Stepper_pin2_Direction at TRISB1_bit;
sbit Stepper_pin3_Direction at TRISB2_bit;
sbit Stepper_pin4_Direction at TRISB3_bit;
 
int is_open = 0;
 
void send_message(char *message)
{
  UART1_Write_Text(message);
  UART1_Write_Text("\r\n");
}

void main() {
  char symbol;
  UART1_Init(9600);
  ADCON1 = 0x07;
  Stepper_Init(0);
  stepper_speed(50);
   
  while (1) 
  {
    if (UART1_Data_Ready())
    {
      symbol = UART1_Read();
      if (symbol == 't')
      {
        if (is_open == 0)
        {
          Stepper_Step(2);
          send_message("Opened");
          is_open = 1;
        }
        else
        {
          Stepper_Step(-2);
          send_message("Closed");
          is_open = 0;
        }
      }
      else if (symbol == 'r')
      {
        send_message(is_open == 0 ? "Close" : "Open");
      }
    }
  }
}
