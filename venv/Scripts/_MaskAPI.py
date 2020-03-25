import requests
import os
import json
url = "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1"

store_r = requests.get(url + "/stores/json")
sales_r = requests.get(url + "/sales/json")

st_total_page = store_r.json()['totalPages']
sa_total_page = sales_r.json()['totalPages']

salesInfos = {}

for i in range(1, st_total_page + 1) :
    url = "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/stores/json?page=" + str(i)
    store_r = requests.get(url)
    count = json.loads(store_r.text) ['count']
    storeInfos = json.loads(store_r.text) ['storeInfos']

    print("store data is loading from api ... " + str(round(i/54 * 100, 2)) + "%")

    for j in range(count) :
        salesInfos[storeInfos[j]['code']] = [storeInfos[j]['addr'], storeInfos[j]['name']];

print("주소를 입력하세요.")
print("시, 도")
si = input()
print("구, 군, 면, 읍")
gu = input()
print("동, 도로명")
dong = input()

print("수량 표시) break : 판매 중지, empty : 0 ~ 1, few : 2 ~ 30, some : 30 ~ 100, plenty : 100 ~")
cnt = 0
for i in range(1, sa_total_page + 1) :
    url = "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/sales/json?page=" + str(i)
    sales_r = requests.get(url)
    count = json.loads(sales_r.text) ['count']
    sales = json.loads(sales_r.text) ['sales']

    for j in range(count) :
        if sales[j]['code'] in salesInfos :
            info_list = salesInfos[sales[j]['code']]
            if si in info_list[0] and gu in info_list[0] and dong in info_list[0]:
               cnt += 1
               print(str(cnt) + ") 주소 : " + info_list[0] + " 판매점 명 : " + info_list[1])
               print("수량 : " + sales[j]['remain_stat'] + " (updated : " + sales[j]['created_at'] + ")")

print("총" + str(cnt) + "개의 판매점을 찾았습니다.")