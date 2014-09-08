import sys
import os

def application(environ, start_response):
    try:
        status = '200 OK'
        f = open(r'./template/map.html')
        output = f.read()
        f.close()
        response_headers = [('Content-type', 'html'),
                        ('Content-Length', str(len(output)))]
        start_response(status, response_headers)
        return [output]
    except:
        status = "500 Error"
        response_headers = [("content-type", "text/plain")]
        start_response(status, response_headers, sys.exc_info())
        return ["Error"]