#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
from time import strftime
from params import *
import gdal
import gdalnumeric
from params import mapparams


class DirectoryAndMapFile:
    
    def createMapParams(self, map_file, dir_tif, map_tif):
        f = open(map_file, "w")
        f.write(mapparams.getMapFile(dir_tif))
        f.close()
        
    '''def editTemplate(self, templatepr):
        f = open(x, "w")
        f.write(templatepr.mapfile)
        f.close()'''    

    def createDirectory(self, path, product):
        if os.access(path, os.W_OK) == False:
            return "Write to the directory is not possible!"
        else:
            dirname = path + product #+ '_' + strftime("%d.%m.%Y-%I:%M-%p")
            return os.makedirs(dirname, 0777)
        
    def selectfiles(self, dirs):
        return [map(lambda i: dirs[x] + '/' + i, filter(lambda i: '.hdf' in i, os.listdir(dirs[x]))) for x in range(len(dirs))]

#     def infofiles(self, dirs):
#         #files = self.selectfiles(dirs)
#         for i in range(len(self.selectfiles(dirs))):
#             for j in range(len(self.selectfiles(dirs)[i])):
#                 ds = gdal.Open(self.selectfiles(dirs)[i][j])
#                 sds_md = ds.GetMetadata('GRINGPOINTLATITUDE')
#                 print sds_md
        
        #files = [gdal.Open(self.selectfiles(dirs)[i]) for i in range(len(self.selectfiles(dirs)))]
        
# dirs = ['/home/diver/geoserver', '/home/diver/geoserver/data/hdf']    
# f  = DirectoryAndMapFile()
# print f.infofiles(dirs)





