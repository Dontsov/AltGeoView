#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import codecs
import configobj
import re



def createMapfile(path):
    config = configobj.ConfigObj()
    config.filename = path
    config[''] = '''
          XXXXkey1 = XXXXvalue1 \n
          XXXXkey2 = XXXXvalue2
          XXXXkey3 = XXXXvalue3
          [[XXXXsection1]]
          XXXXkey1 = XXXXvalue1
          XXXXkey2 = XXXXvalue2
          XXXXkey3 = XXXXvalue3
     '''.splitlines()
    config.write()
    



def createConfig(path, input_file, output_file, spatial_subset_type, lat_long, projection_type, params):
    config = configobj.ConfigObj()
    config.filename = path
    config["INPUT_FILENAME"] = input_file
    config["OUTPUT_FILENAME"] = output_file
    config["SPECTRAL_SUBSET"] = "( 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 )"
    config["SPATIAL_SUBSET_TYPE"] = spatial_subset_type
    config["SPATIAL_SUBSET_UL_CORNER"] = "(" + lat_long['lat_ul'] + " " + lat_long['long_ul'] + ")"
    config["SPATIAL_SUBSET_LR_CORNER"] = "(" + lat_long['lat_lr'] + " " + lat_long['long_lr'] + ")"
    config["OUTPUT_PROJECTION_TYPE"] = projection_type
    config["OUTPUT_PROJECTION_PARAMETERS"] = (r'('+ params['param11'] + ' ' + params['param12'] + ' ' + params['param13'] + u'\u000d' 
                                                  + params['param21'] + ' ' + params['param22'] + ' ' + params['param23'] + u'\u000d'
                                                  + params['param31'] + ' ' + params['param32'] + ' ' + params['param33'] + u'\u000d'
                                                  + params['param41'] + ' ' + params['param42'] + ' ' + params['param43'] + u'\u000d'
                                                  + params['param51'] + ' ' + params['param52'] + ' ' + params['param53']+')')
    config.write()
    
#---------------------------------------------------------------------#
    
lat_long = {'lat_ul' : '56.767676', 'long_ul' : '434.434',
            'lat_lr' : '32.434343', 'long_lr' : '212.44', }

params = {'param11' : '21211', 'param12' : '0', 'param13' : '0',
          'param21' : '0', 'param22' : '0', 'param23' : '0',
          'param31' : '0', 'param32' : '0', 'param33' : '0',
          'param41' : '0', 'param42' : '0', 'param43' : '0',
          'param51' : '0', 'param52' : '0', 'param53' : '0',}

createMapfile('/home/diver/geolocal/test9999.prm')












