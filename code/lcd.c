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

int is_move = 0;
int i = 0; // Current text index

int is_overflow_text()
{
  return i >= 63 ? 1 : 0;
}

void reset_text()
{
  memset(text, 0, 64);
  i = 0;
}

void show_text()
{
  int k = 0;

  for (k; k < (i < 15) ? 19 : i; ++k)
  {
    Lcd_Out(1, 1, text);
    Lcd_Cmd(_LCD_SHIFT_RIGHT);
    Delay_ms(500);
  }

  Lcd_Cmd(_LCD_RETURN_HOME);
}

void read_text()
{
  if (UART1_Data_Ready())
  {
    previous_symbol = symbol;
    symbol = UART1_Read();

    if (strcmp("move", text) == 0)
    {
      is_move = (is_move == 1) ? 0 : 1;
      return;
    }

    if (is_overflow_text())
    {
      show_text();
      return;
    }

    if (symbol == '#')
    {
      show_text();
    }
    else
    {
      if (previous_symbol == '#')
      {
        reset_text();
      }
      text[i] = symbol;
      ++i;
      Lcd_Cmd(_LCD_CLEAR);
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
    read_text();
  }
}
