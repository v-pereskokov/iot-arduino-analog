#include <SoftwareSerial.h>

int gLedPin = 13;
int gRxPin = 19;
int gTxPin = 18;

SoftwareSerial BTSerial(gRxPin, gTxPin);

void setup() {
  Serial.begin(9600);
  Serial.println("Enter AT commands:");
  BTSerial.begin(9600);
}

void loop() {
  if (Serial.available()) {
    BTSerial.print(Serial.read());
  }

  if (BTSerial.available()) {
    Serial.print(BTSerial.read());
  }
}

