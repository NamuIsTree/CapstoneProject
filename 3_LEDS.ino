int led[3] = {15, 4, 17};
int gnd[3] = { 2, 16, 5};

#define trig 14
#define echo 12

void setup() {
  // Setup for HC_SR04
  Serial.begin (9600);
  pinMode (trig, OUTPUT);
  pinMode (echo, INPUT);

  // Setup for LEDs
  for (int i = 0; i < 3; i++) {
    pinMode (led[i], OUTPUT);
    digitalWrite (led[i], 1);

    pinMode (gnd[i], OUTPUT);
    digitalWrite (gnd[i], 0);
  }
}

void loop() {
  int delayTime = 50;
  long duration, distance;

  digitalWrite (trig, LOW);
  delayMicroseconds (2);
  digitalWrite (trig, HIGH);
  delayMicroseconds (10);
  digitalWrite (trig, LOW);

  duration = pulseIn(echo, HIGH);
  distance = duration * 170 / 1000;

  Serial.println(distance);
  delay(100);

  int Case = 1;

  if (distance < 100) Case = 5;
  else if (distance < 200) Case = 3;

  digitalWrite (led[0], HIGH);
  digitalWrite (led[2], HIGH);
  delay (300);
  digitalWrite (led[0], LOW);
  digitalWrite (led[2], LOW);
  delay (500);

  
  for (int i = 0; i < Case; i++) {
    digitalWrite (led[1], HIGH);
    delay (300 / Case);
    digitalWrite (led[1], LOW);
    delay (500 / Case);
  }
}
