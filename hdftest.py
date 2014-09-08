# -*- coding: utf-8 -*-

from osgeo import gdal

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

            out_names = [s.rsplit(':', 1)[1] for s in names]

        for ind, name in enumerate(out_names):
            geotrans  = gdal.GCPsToGeoTransform(sds[ind].GetGCPs())
            if geotrans:
                dst_name = name + '.tif'
                format = "GTiff"
                driver = gdal.GetDriverByName( format )
                dst_ds = driver.CreateCopy( dst_name, sds[ind], 1 )
                dst_ds.SetGeoTransform( geotrans )

#hdffile = ''
hdffile = 'MOD09GA.A2011185.h23v03.005.2011210213638.hdf'
raster = RasterWork()
raster.hdf2geotiff(hdffile)
        
        
