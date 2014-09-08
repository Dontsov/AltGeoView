#!/usr/bin/env python
# -*- coding: utf-8 -*-

from bottle import Bottle, run, route, static_file, view, template, post, request, app 
import sys
from jinja2 import Markup
reload(sys)
sys.setdefaultencoding('utf-8')

STATIC_ROOT="/home/diver/geoserver"
# 
from urls import index
# name = 'Rerererere'
# 
# @route('/')
# @view('index')
# def index_stat():
#     return { 'get_url': Bottle.get_url } 


index()
# index_stat()


run(host='localhost', port=8080) 




    
    





