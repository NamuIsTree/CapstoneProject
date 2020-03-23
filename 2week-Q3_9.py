import random
import time
from requests import request
for i in range(10):
    value = random.randint(0, 60)
    r = request('GET', "http://107.23.254.187:8000/" + str(value) + "%20HTTP/1.1")
    print("sent")