# -*- coding: utf-8 -*-

from osgeo import gdal
import os
from core.models import DirectoryAndMapFile

def testhdf(hdf, dirtif):
    
    sdslist = hdf.GetSubDatasets()

    names = []
    for s in sdslist:
        names.append(s[0])

    sds = []
    for n in names:
        sds.append(gdal.Open(n))

    out_names = [s.rsplit(':', 1)[1] for s in names]
    dir = DirectoryAndMapFile()
    dir.createDirectory('/home/diver/geolocal/testtifdata/', dirtif)
    
    for ind, name in enumerate(out_names):
        geotrans  = gdal.GCPsToGeoTransform(sds[ind].GetGCPs())
        if geotrans:
            dst_name = '/home/diver/geolocal/testtifdata/' + dirtif + name + '.tif'
            format = "GTiff"
            driver = gdal.GetDriverByName( format )
            dst_ds = driver.CreateCopy( dst_name, sds[ind], 1 )
            dst_ds.SetGeoTransform( geotrans )



hdf = gdal.Open('MOD07_L2.A2013036.0535.005.2013079062316.hdf')
#testhdf(hdf, 'qwqwqw111/')
