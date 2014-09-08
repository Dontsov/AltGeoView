#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
Created on 14.04.2014
@author: diver
'''
from bottle import jinja2_template as template
from bottle import Bottle, run, route, static_file, view, template, post, request
from jinja2 import Markup

# class Urls(object):

@route('/static/:path#.+#', name='static')
def static(path):
    return static_file(path, root='static')

@route('/')
def index():
    return template('template/base.tpl', name_title='Алтайский государственный университет', name_asu = 'Алтайский государственный университет')
     
@route('/test')
def test():
    return template('template/base.tpl', name='test')

@route('/hello/:name')
def hello(name):
    return 'Hello, %s' % name


    

    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
#     def urls(self, environ, start_response):
#         '''
#         Constructor
#         '''
#         try:
#             if environ['PATH_INFO'] == '/':
#                 status = '200 OK'
#                 f = open(r'./template/base.html')
# #                 output = template('hello {{name}}', name = 'world')  # .decode('utf8')
# #                 f.close()
#                 response_headers = [('Content-type', 'html; charset=UTF-8')]
#                 start_response(status, response_headers)
# #                 index = views.BaseViews()
# #                 index.indexView()                
#                 print template('template/base.tpl', name ='')
#                   
# 
# 
#             elif environ['PATH_INFO'] == '/frondmap':
#                 status = '200 OK'
#                 f = open(r'./template/test.html')
#                 output = f.read()
#                 f.close()
#                 response_headers = [('Content-type', 'html; charset=UTF-8'),
#                         ('Content-Length', str(len(output)))]
#                 start_response(status, response_headers)
#                 return [output]     
#             elif environ['PATH_INFO'] == '/map':
# 
#                 if environ['REQUEST_METHOD'] == 'POST':
#                     fields = request.parse_formvars(environ)
#                     prod = fields.get('prod', 'default')
#                     path = '/home/diver/geoserver/maps/'
# #                     product = strftime("%d.%m.%Y")
#                     product = 'test2777'
#                     pat = path + product
#                     if os.path.exists(pat) == False:
#                         dir_tif = '/home/diver/geoserver/data/geotiff/' + product
#                         os.makedirs(dir_tif, 0777)
#                         filename = '/home/diver/geoserver/data/hdf/MOD07_L2.A2013036.0535.005.2013079062316.hdf'
#                         raster = RasterWork()
#                         raster.hdf2geotifNew(filename, dir_tif, prod)
#                         map = mapparams.getMapFile(dir_tif)
#                         x = path + product + '/' + product + '.map'
#                         
#                         f = DirectoryAndMapFile()
#                         f.createDirectory(path, product)
#                         f.createMapParams(x, dir_tif, prod)
#                     
#                         output = sendmaptpl.sendmap()
#                 
#                         status = '200 OK'         
#                         response_headers = [('Content-type', 'html; charset=UTF-8'),
#                                             ('Content-Length', str(len(output)))]
#                         start_response(status, response_headers)
#                         return [output]
#               
#                     else:
#                         status = "200 OK"
#                         response_headers = [('Content-type', 'html; charset=UTF-8')]
#                         start_response(status, response_headers, sys.exc_info())
#                         return ["Форма получения данных не была заполнена!"]
# #                 
#                 else:
#                     status = "404  Error"
#                     response_headers = [("content-type", "text/plain")]
#                     start_response(status, response_headers, sys.exc_info())
#                     return ["Error"]
#         except Exception:
#             status = "500 Error"
#             response_headers = [("content-type", "text/plain")]
#             start_response(status, response_headers, sys.exc_info())
#             return ["Error"]
