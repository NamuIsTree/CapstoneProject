import random
import time
from requests import request
for i in range(10):
    value = random.randint(0, 60)
    r = request('GET', "https://api.thingspeak.com/update?api_key=7ILK07RR8OQJUMD1&field1=" + str(value) + "%20HTTP/1.1")
    time.sleep(20)