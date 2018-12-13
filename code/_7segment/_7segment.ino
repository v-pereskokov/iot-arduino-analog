// segment | Arduino board PIN number

#define G 10
#define F1 9
#define A 13
#define B 6
#define E 1
#define D 2
#define C 4
#define DP 14

// functions to display digits

void digit0()
{
  // for 0 needed to turn ON F1 A B C D E segments, so:

  digitalWrite(A, HIGH);
  digitalWrite(B, HIGH);
  digitalWrite(C, HIGH);
  digitalWrite(D, HIGH);
  digitalWrite(E, HIGH);
  digitalWrite(F1, HIGH);

  //////////////////////// G segment should be turn OF1F1
  digitalWrite(G, LOW);
};

void digit1()
{

  digitalWrite(A, LOW);
  digitalWrite(B, HIGH);
  digitalWrite(C, HIGH);
  digitalWrite(D, LOW);
  digitalWrite(E, LOW);
  digitalWrite(F1, LOW);
  digitalWrite(G, LOW);
};

void digit2()
{

  digitalWrite(A, HIGH);
  digitalWrite(B, HIGH);
  digitalWrite(C, LOW);
  digitalWrite(D, HIGH);
  digitalWrite(E, HIGH);
  digitalWrite(F1, LOW);
  digitalWrite(G, HIGH);
};

void digit3()
{

  digitalWrite(A, HIGH);
  digitalWrite(B, HIGH);
  digitalWrite(C, HIGH);
  digitalWrite(D, HIGH);
  digitalWrite(E, LOW);
  digitalWrite(F1, LOW);
  digitalWrite(G, HIGH);
};

void digit4()
{

  digitalWrite(A, LOW);
  digitalWrite(B, HIGH);
  digitalWrite(C, HIGH);
  digitalWrite(D, LOW);
  digitalWrite(E, LOW);
  digitalWrite(F1, HIGH);
  digitalWrite(G, HIGH);
};

void digit5()
{

  digitalWrite(A, HIGH);
  digitalWrite(B, LOW);
  digitalWrite(C, HIGH);
  digitalWrite(D, HIGH);
  digitalWrite(E, LOW);
  digitalWrite(F1, HIGH);
  digitalWrite(G, HIGH);
};

void digit6()
{

  digitalWrite(A, HIGH);
  digitalWrite(B, LOW);
  digitalWrite(C, HIGH);
  digitalWrite(D, HIGH);
  digitalWrite(E, HIGH);
  digitalWrite(F1, HIGH);
  digitalWrite(G, HIGH);
};

void digit7()
{

  digitalWrite(A, HIGH);
  digitalWrite(B, HIGH);
  digitalWrite(C, HIGH);
  digitalWrite(D, LOW);
  digitalWrite(E, LOW);
  digitalWrite(F1, LOW);
  digitalWrite(G, LOW);
};

void digit8()
{

  digitalWrite(A, HIGH);
  digitalWrite(B, HIGH);
  digitalWrite(C, HIGH);
  digitalWrite(D, HIGH);
  digitalWrite(E, HIGH);
  digitalWrite(F1, HIGH);
  digitalWrite(G, HIGH);
};

void digit9()
{

  digitalWrite(A, HIGH);
  digitalWrite(B, HIGH);
  digitalWrite(C, HIGH);
  digitalWrite(D, HIGH);
  digitalWrite(E, LOW);
  digitalWrite(F1, HIGH);
  digitalWrite(G, HIGH);
};

//function to display digit from inputed int

void showdigit(int digit)

{

  switch (digit)
  {

    case 0:
      digit0();
      break;

    case 1:
      digit1();
      break;

    case 2:
      digit2();
      break;

    case 3:
      digit3();
      break;

    case 4:
      digit4();
      break;

    case 5:
      digit5();
      break;

    case 6:
      digit6();
      break;

    case 7:
      digit7();
      break;

    case 8:
      digit8();
      break;

    case 9:
      digit9();
      break;

    default:

      break;
  };
}

void setup()

{

  pinMode(A, OUTPUT);
  pinMode(B, OUTPUT);
  pinMode(C, OUTPUT);
  pinMode(D, OUTPUT);
  pinMode(E, OUTPUT);
  pinMode(F1, OUTPUT);
  pinMode(G, OUTPUT);
  pinMode(DP, OUTPUT);

  pinMode(8, OUTPUT);
};
void loop()

{

  
digitalWrite(8, HIGH);

delay(1000);

digitalWrite(8, LOW);

delay(1000);

//  for (int i = 0; i < 10; i++)
//  { //counting from 0 to 9
//
//    showdigit(i);
//
//    delay(1000); // 1000ms= 1s delay
//
//    if (i % 2)
//    {
//      digitalWrite(DP, HIGH);
//    }
//
//    else
//    {
//      digitalWrite(DP, LOW);
//    };
//  };
};

