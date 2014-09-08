#!/usr/bin/env python
# -*- coding: utf-8 -*-

import cProfile
#cProfile.run('foo()')
#import pyhdf
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
# import numpy  
# import struct  
data = SD('MOD09GA.A2011185.h22v03.005.2011210213142.hdf')#.info()


file = 'MOD09GA.A2011185.h22v03.005.2011210213142.hdf'


# print dir(gdal)



dirs = ['/media/9b100bde-aa1b-4f6e-9221-fdc848ef342f/data']
files = [map(lambda i: dirs[x] + '/' + i, filter(lambda i: '.hdf' in i, os.listdir(dirs[x]))) for x in range(len(dirs))]
# print files
print files[0]


def infofiles(file):
    params = ['RANGEBEGINNINGDATE', 'GRINGPOINTLATITUDE', 'GRINGPOINTLONGITUDE']
    info = []
    for i in range(len(files[0])):
        metadata = os.popen('gdalinfo '+ file[0][i]).read()
        info.append(metadata)
        
        
        
def info2db(file):
    params = ['Files:', 'RANGEBEGINNINGDATE', 'GRINGPOINTLATITUDE', 'GRINGPOINTLONGITUDE']
    info = []
    metadata = os.popen('gdalinfo '+ file).read()
#     print metadata
    info = metadata.split('\n')
#     print info
    res = []
    for i in range(len(params)):
        ss = filter(lambda x: params[i] in x, info)
        res.append(ss)
    inf = []
    for i in range(len(res)):
        fil = res[i][0].replace(' ','').replace(':','=')
        
        inf.append(fil)
    res = dict([x.strip().split('=') for x in inf])
    db.product.insert(res)
    
    
    
      
for i in range(len(files[0])):
      info2db(files[0][i])
    


#     print inf
    
    
    
    
# info2db('/media/9b100bde-aa1b-4f6e-9221-fdc848ef342f/data/MOD09.A2012336.0048.005.2014071144204.hdf')
    
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
#     print metadata
#     infoSp, res = [], []
#     for i in range(len(info)):
#         infoSp[i] = info[i].split('\n')
#         ifn = filter(lambda x: params[i] in x, infoSp[i])
#         res.append(ifn)
#     print info
        
#     res = []
#     for i in range(len(params)):
#         ss = filter(lambda x: params[i] in x, data)
#         res.append(ss)
# #     print res
#     data = dict([x[0].strip().split('=') for x in res])
#     data['fileName'] = file
# #     print data
#     db.product.insert(data)
    
    
# infofiles(files)
    
#     print data

# tt = files[0]
# # print tt[1]
# # print tt
# for i in range(len(tt)):
#     infofiles(tt[i])
#     i = i + 1
    
# insertData = [infofiles(tt[i]) for i in range(len(files))]

# print insertData



#     for i in range(len(res)):
#         re = res[i].replace(' ','')
#         print re
        
         
                    
#db.product.find({"RANGEBEGINNINGDATE": {$regex: /2012-07-16/}})


# db.product.insert({'qwq':212121})    
# infofiles('/home/diver/geoserver/data/hdf/MOD09GA.A2012198.h22v03.005.201324417090.hdf')
    






# def dbtest(files):
#     info = []
#     info2 = []
#     for f in range(len(files)):
#         for fl in range(len(files[f])):
#             metadata = os.popen('gdalinfo '+ files[f][fl]).read()
#             print type(metadata)
#             data = metadata.split('\n')
#             info.append(data)
# # print type(metadata)
#         
#         
#         
#         params = ['GRINGPOINTLATITUDE', 'GRINGPOINTLONGITUDE']
# #         print info
            
            
#         sum = {}
#         ru = []
#         coor = []
#         for i in range(len(info)):
#             for j in range(len(params)):
#                 ss = filter(lambda x: params[j] in x, info[i])
# #             print ss
#             ss1 = ss[0].replace(' ','')
#             ru.append(ss1)
#         
#         print ru
#         res1 = []
#         for i in range(len(ru)):
#             ru1 = ru[i].split('=')
#             resul = ru1[1:]
# #             print ru1
#             res1.append(resul)
#             
#         print res1
# print '################'           
        
#         dicts = dict(params, res1)
#             dicts = {k: v for k, v in zip(params, res1)}
#             db.product.insert(dicts)
#             print dicts
        
        
        
#             resul = res[1:]
#             r = resul[0].split(',')
#             coor.append(r)
#         print coor#sum[params[i]]
#                 db.product.insert(sum)
#                 dicts = dict(params, r)   
#                 print dicts
#                 

        
# dbtest(files)   


# metadata = os.popen('gdalinfo MOD09GA.A2011185.h22v03.005.2011210213142.hdf').read()
# # print type(metadata)
# params = ['GRINGPOINTLATITUDE', 'GRINGPOINTLONGITUDE']
# s = metadata.split('\n')
# from collections import defaultdict

# sum = defaultdict(list)
# sum = {}
# ru = []
# for i in range(len(params)):
#     ss = filter(lambda x: params[i] in x, s)
#     ss1 = ss[0].replace(' ','')
#     ru.append(ss1)
#     res = ru[0].split('=')
#     resul = res[1:]
#     r = resul[0].split(',')
#     sum[params[i]] = r
    


# db.product.insert(sum)
# dicts = dict(params, sum)   
# print sum


# print sum[0].split('=')

# dataset = gdal.Open(file)
# band = dataset.GetRasterBand(1)  
#Reading the raster properties  
# print dataset.GetProjection()  
# print dataset.GetGeoTransform()  
# xsize = band.XSize  
# ysize = band.YSize  
# datatype = band.DataType  


# print data.datasets().keys()


# print data.attr()#.keys

# print dir(SD)