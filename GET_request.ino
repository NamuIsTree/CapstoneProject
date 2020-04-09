#include <OneWire.h>
#include <DallasTemperature.h>
#include <WiFi.h>
#include <HTTPClient.h>

#define ONE_WIRE_BUS 13
OneWire oneWire(ONE_WIRE_BUS);

DallasTemperature sensors(&oneWire);
const char* ssid = "SSID";
const char* password = "****";

String Url = "http://107.23.254.187:8080/sensorData?";
String DeviceId = "device_id=1&";
String TempValue = "temperature_value=";
String SeqNum = "sequence_number=";

float Celcius=0;
 
void setup(void)
{
  Serial.begin(9600);
  delay(4000);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }

  Serial.println("Connected to the WiFi network");
 
  sensors.begin();
}

int sqn = 0;
void loop(void)
{ 
  HTTPClient http;
  
  sensors.requestTemperatures(); 
  Celcius=sensors.getTempCByIndex(0);
  Serial.print(" C  ");
  Serial.println(Celcius);
  delay(1000);

  Serial.println(Url + DeviceId + TempValue + String(Celcius) + "&" + SeqNum + String(sqn));
  http.begin(Url + DeviceId + TempValue + String(Celcius) + "&" + SeqNum + String(sqn));
  sqn++;
  int httpCode = http.GET();
  delay(5000);
}
