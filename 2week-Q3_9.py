import random
import time
from requests import request
for i in range(10):
    x = random.randint(0, 60)
    y = random.randint(0, 60)
    z = random.randint(0, 60)
    r = request('GET', 'http://107.23.254.187:8000/get?x=' + str(x) + '&y=' + str(y) + '&z=' + str(z) + "%20HTTP/1.1")