# from aiohttp import web

# async def handle(request):
#     name = request.match_info.get('name', "Anonymous")
#     text = "Hello, " + name
#     return web.Response(text=text)

# app = web.Application()
# app.router.add_get('/', handle)
# app.router.add_get('/{name}', handle)

# web.run_app(app)

#import serial

import socket
import random
# import serial
# ser =  serial.Serial('COM3',9600) 


    
serv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
serv.bind(('0.0.0.0', 5000))
serv.listen(5)



def repea():
    conn, addr = serv.accept()
    while True:
        num = str(random.randint(1,100))    
        conn.send(num.encode())

repea()