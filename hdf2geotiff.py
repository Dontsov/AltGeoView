#!/usr/bin/env python
# -*- coding: utf-8 -*-
import gdal
import gdalnumeric
from osgeo import gdal
filename = './data/hdf/MOD07_L2.A2013036.0535.005.2013079062316.hdf' #
hdf = gdal.Open(filename)
#print type(hdf.GetSubDatasets())
#print len(hdf.GetMetadata('SUBDATASETS'))

class RasterWork:
    #Класс работы с растровыми изображениями GeoTiff
    def hdf2geotiff(self, hdffile):
        hdf = gdal.Open(hdffile)
        sdslist = hdf.GetSubDatasets()
        names = []
        for s in sdslist:
            names.append(s[0])
            sds = []
        for n in names:
            sds.append(gdal.Open(n))
            sds[0].GetMetadata()
            geotrans  = gdal.GCPsToGeoTransform(sds[0].GetGCPs())  
        dst_name = './data/geotiff/test.tif'
        format = "GTiff"
        driver = gdal.GetDriverByName( format )
        dst_ds = driver.CreateCopy( dst_name, sds[0], 1 )
        
    #Обновлённый класс для работы с Geotiff
    
    def hdf2geotifNewOll(self, hdffile):
        hdf = gdal.Open(hdffile)
        sdslist = hdf.GetSubDatasets()

        names = []
        for s in sdslist:
            names.append(s[0])

        sds = []
        for n in names:
            sds.append(gdal.Open(n))

        out_names = [s.rsplit(':', 1)[1] for s in names]

        for ind, name in enumerate(out_names):
            print ind
            print name
            '''geotrans  = gdal.GCPsToGeoTransform(sds[ind].GetGCPs())
             if geotrans:
                 dst_name = './data/geotiff/test/' + name + '.tif'
                 format = "GTiff"
                 driver = gdal.GetDriverByName( format )
                 dst_ds = driver.CreateCopy( dst_name, sds[ind], 1 )
                 dst_ds.SetGeoTransform( geotrans )'''
        
    def hdf2geotifNew(self, hdffile, dir_tif, name_tif):
        hdf = gdal.Open(hdffile)
        sdslist = hdf.GetSubDatasets()

        names = []
        for s in sdslist:
            names.append(s[0])

        sds = []
        for n in names:
            sds.append(gdal.Open(n))
        out_names = [s.rsplit(':', 1)[1] for s in names]
        geotrans  = gdal.GCPsToGeoTransform(sds[7].GetGCPs())
        dst_name = dir_tif +'/'+ name_tif + '.tif'
        format = "GTiff"
        driver = gdal.GetDriverByName( format )
        dst_ds = driver.CreateCopy( dst_name, sds[7], 1 )
        dst_ds.SetGeoTransform( geotrans )
