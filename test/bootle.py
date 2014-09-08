#!/usr/bin/env python
# -*- coding: utf-8 -*-

from bottle import route, run
from bottle import jinja2_template as template

@route('/')
def index():
    return template('../template/base.tpl', name = u'яяя'.encode('utf-8'))

run(host='localhost', port=8080) 
