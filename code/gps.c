#define time_offset 3600 // define a clock offset of 3600 seconds (1 hour) ==> UTC + 1

#include "gps_module.c"

// LCD module connections
sbit LCD_RS at RD0_bit;
sbit LCD_EN at RD1_bit;
sbit LCD_D4 at RD2_bit;
sbit LCD_D5 at RD3_bit;
sbit LCD_D6 at RD4_bit;
sbit LCD_D7 at RD5_bit;

sbit LCD_RS_Direction at TRISD0_bit;
sbit LCD_EN_Direction at TRISD1_bit;
sbit LCD_D4_Direction at TRISD2_bit;
sbit LCD_D5_Direction at TRISD3_bit;
sbit LCD_D6_Direction at TRISD4_bit;
sbit LCD_D7_Direction at TRISD5_bit;

void main()
{
  OSCCON = 0X70; // set internal oscillator to 8MHz
  Lcd_Init();
  Lcd_Cmd(_LCD_CURSOR_OFF);
  Lcd_Cmd(_LCD_CLEAR);
  lcd_out(1, 2, codetxt_to_ramtxt("GPS CLOCK (UTC+1)"));
  lcd_out(3, 3, codetxt_to_ramtxt("TIME:   :  :"));
  lcd_out(4, 3, codetxt_to_ramtxt("DATE:   -  -20"));

  UART1_Init(9600);

  while (1)
  {
    if (UART1_Data_Ready() == 1)
      if (GPSRead())
      {
        // read UTC time and date and save them to utc_time structure
        utc_time.hh = GPSHour();   // hour 0-23
        utc_time.mn = GPSMinute(); // minutes 0-59
        utc_time.ss = GPSSecond(); // seconds 0-59

        utc_time.md = GPSDay();         // month day 1-31
        utc_time.mo = GPSMonth();       // month 1-12
        utc_time.yy = GPSYear() + 2000; // four digits year (2018, 2019 ...)

        // get unix time
        unix_time = Time_dateToEpoch(&utc_time);

        // add the offset (in seconds) to the unix time
        unix_time += time_offset;

        // get the local time
        Time_epochToDate(unix_time, &my_time);

        // print day of the week
        print_wday(my_time.wd);
        // print time
        byte_to_str(my_time.hh, txt);
        lcd_out(3, 9, txt);
        byte_to_str(my_time.mn, txt);
        lcd_out(3, 12, txt);
        byte_to_str(my_time.ss, txt);
        lcd_out(3, 15, txt);
        // print date
        byte_to_str(my_time.md, txt);
        lcd_out(4, 9, txt);
        byte_to_str(my_time.mo, txt);
        lcd_out(4, 12, txt);
        byte_to_str((my_time.yy - 2000), txt);
        lcd_out(4, 17, txt);
      }
  }
}
