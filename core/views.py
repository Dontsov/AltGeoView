'''
'''
import os
from jinja2 import Environment, FileSystemLoader
from bottle import jinja2_template as template




class BaseViews():
    def indexView(self):
#          TEMPLATE_DIR = './template/'
#          html = Environment(loader=FileSystemLoader(TEMPLATE_DIR),
#                               trim_blocks=True)
#         return html.get_template('base.tpl').render(title = 'Altai State University',
#                                                          test = 'Test')

        print template('', name = 'world')
         
         
 

        