#!/usr/bin/env python
# -*- coding: utf-8 -*-
mapname = ''
sizeH = ''
sizeW = ''
name_prod = ''
map_tiff = ''
mapparams = {
             'mapname' : mapname, 
             'sizeH' : sizeH,
             'sizeW' : sizeW,
             'name_prod' : name_prod,
             'map_tiff' : map_tiff,
         }

mapfile = r"""MAP
IMAGETYPE PNG
  NAME {mapname}
  SIZE {sizeH} {sizeW}
  UNITS dd
  EXTENT 60.2289530630876442 48.9969740071353286 110.0024212413648002 57.9999999949999889
  FONTSET "./fonts/fonts.list"
  SYMBOLSET './symbols/symbols35.sym'
  OUTPUTFORMAT
    NAME pnggd
    DRIVER "GD/PNG"
    MIMETYPE "image/png"
    EXTENSION "png24"
  END
  WEB
    TEMPLATE  '/home/diver/!geolocal/example/templates/template1.html'
    IMAGEPATH '/home/diver/geolocal/maps/images/'
    IMAGEURL  '/maps/images/'
  METADATA
      'ows_title'           'QGIS-MAP'
      'ows_onlineresource'  'http://localhost/cgi-bin/mapserv?map=/home/diver/geolocal/map/data/temp.map'
      'ows_srs'             'WGS84'
    END
  END
LAYER
    NAME '{name_prod}' 
    TYPE RASTER
    DUMP true
    DATA "/home/diver/geoserver/test/output.tif"
    STATUS ON
    TYPE RASTER
   PROJECTION
    'proj=longlat'
    'datum=WGS84'
    'no_defs'
    END
PROCESSING "SCALE=AUTO" 
PROCESSING "SCALE_BUCKETS=256" 
END
LAYER
  NAME altay
  DATA '/home/diver/geolocal/vertor_map/region/region_alt.shp'
  STATUS OFF
  TYPE POLYGON
  OPACITY 30 #значение прозрачности
  CLASS
    NAME "Алтайский край"
    STYLE
    COLOR 232 232 232
    OUTLINECOLOR 32 32 32
    END
   END 
 END 
  LAYER
    NAME 'altay-city'
    TYPE POLYGON
    DUMP true
    TEMPLATE fooOnlyForWMSGetFeatureInfo
  EXTENT 82.259762 51.109428 84.881962 53.076854
    DATA '/home/diver/geolocal/data/altay-city.shp'
    METADATA
      'ows_title' 'altay-city'
    END
    STATUS OFF
    TRANSPARENCY 100
    PROJECTION
    'proj=longlat'
    'datum=WGS84'
    'no_defs'
    END
    LABELITEM 'NAM'
    CLASS
       NAME 'altay-city' 
       STYLE
         WIDTH 0.91 
         OUTLINECOLOR 0 0 0
         COLOR 86 182 230
       END
     LABEL 
      FONT arial
      TYPE truetype
      SIZE 8
      COLOR 0 0 0
      ANGLE 0
      POSITION cc
      FORCE false
      ANTIALIAS false
      PARTIALS false
     END 
    END
  END
END""".format(**mapparams)

def createMap():

     
f = open("maptest.map", "wr")
f.write(mapfile)
f.close()

