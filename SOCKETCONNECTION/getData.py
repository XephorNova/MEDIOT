# import serial 
# from ast import literal_eval
import asyncio
import concurrent
 
# with serial.Serial('COM3',9600) as ser:
#     while True:
    
#         #x = ser.read()          # read one byte
#         #s = ser.read(100)        # read up to ten bytes (timeout)
#         line = ser.readline()
#         #print(literal_eval("'%s'" % line))   # read a '\n' terminated line
#         print(line.decode('utf-8'))


######
# class Output(asyncio.Protocol):
#     def connection_made(self, transport):
#         self.transport = transport
#         print('port opened', transport)
#         transport.serial.rts = False
#         transport.write(b'hello world\n')

#     def data_received(self, data):
#         print('data received', repr(data))
#         self.transport.close()

#     def connection_lost(self, exc):
#         print('port closed')
#         asyncio.get_event_loop().stop()

# loop = asyncio.get_event_loop()
# coro = serial.aio.create_serial_connection(loop, Output, 'COM3', baudrate=115200)
# loop.run_until_complete(coro)
# loop.run_forever()
# loop.close()

import asyncio
import concurrent

from serial import Serial

# Normal serial blocking reads
# This could also do any processing required on the data
def get_byte():
    return s.readline()

# Runs blocking function in executor, yielding the result
@asyncio.coroutine
def get_byte_async():
    with concurrent.futures.ThreadPoolExecutor(max_workers=1) as executor:
        res = yield from loop.run_in_executor(executor, get_byte)
        return res

def get_and_print():
    b = yield from get_byte_async()
    print (b)

s = Serial("COM3", 9600)
loop = asyncio.get_event_loop()
while True:
    loop.run_until_complete(get_and_print())