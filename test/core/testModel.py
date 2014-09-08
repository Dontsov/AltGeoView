#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
from time import strftime
from params import *
import gdal
import gdalnumeric

'''
Некоторы тестовые и пробные функции 
'''

def hdf2geotifNew(hdffile, dir_tif, name_tif):
        hdf = gdal.Open(hdffile)
        sdslist = hdf.GetSubDatasets()

        names = []
        for s in sdslist:
            names.append(s[0])

        sds = []
        for n in names:
            sds.append(gdal.Open(n))
        out_names = [s.rsplit(':', 1)[1] for s in names]
        print out_names
        geotrans  = gdal.GCPsToGeoTransform(sds[7].GetGCPs())
        dst_name = dir_tif +'/'+ name_tif + '.tif'
        format = "GTiff"
        driver = gdal.GetDriverByName( format )
        dst_ds = driver.CreateCopy( dst_name, sds[7], 1 )
        dst_ds.SetGeoTransform( geotrans )
