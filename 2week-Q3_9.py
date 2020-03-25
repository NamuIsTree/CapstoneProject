import random
import requests
for i in range(10):
    x = random.randint(0, 60)
    y = random.randint(0, 60)
    z = random.randint(0, 60)
    r = requests.get('http://107.23.254.187:8000/get?x=' + str(x) + '&y=' + str(y) + '&z=' + str(z))