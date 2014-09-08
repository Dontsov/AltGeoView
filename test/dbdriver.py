dirs = ['/home/diver/geoserver/data/hdf']
files = [map(lambda i: dirs[x] + '/' + i, filter(lambda i: '.hdf' in i, os.listdir(dirs[x]))) for x in range(len(dirs))]
# print files
# print files


from numpy import *
from pyhdf.SD import SD, SDS, SDC, SDAttr 
from osgeo import gdal  
from osgeo.gdalconst import *  
import os
import pymongo
# import re

from pymongo import Connection
connection = Connection()
db=connection.test

dirs = ['/home/diver/geoserver/data/hdf']
files = [map(lambda i: dirs[x] + '/' + i, filter(lambda i: '.hdf' in i, os.listdir(dirs[x]))) for x in range(len(dirs))]



def infofiles(file):
    params = ['RANGEBEGINNINGDATE', 'GRINGPOINTLATITUDE', 'GRINGPOINTLONGITUDE']
    metadata = os.popen('gdalinfo '+ file).read()
#     print metadata
    data = metadata.split('\n')
    res = []
    for i in range(len(params)):
        ss = filter(lambda x: params[i] in x, data)
        res.append(ss)
#     print res
    data = dict([x[0].strip().split('=') for x in res])
    data['fileName'] = file
    db.product.insert(data)
    
#     print data

tt = files[0]
# print tt[1]
# print tt
for i in range(len(tt)):
    infofiles(tt[i])
    i = i + 1
    
# insertData = [infofiles(tt[i]) for i in range(len(files))]

# print insertData

