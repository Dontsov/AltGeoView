# -*- coding: utf-8 -*-
from osgeo import gdal
from celery.task.sets import TaskSet
import tasks
'''
hdf = gdal.Open('MOD07_L2.A2013036.0535.005.2013079062316.hdf')
def mod07_hdf2geotiff(hdf):
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
        
        
if __name__ == '__main__':
    print "Making pi"
    mod07_hdf2geotiff(hdf)'''
    
    
from celery.task.sets import TaskSet

import tasks
#hdf1 = ['MOD07_L2.A2013036.0535.005.2013079062316.hdf', 'MOD07_L2.A2013036.0535.005.20130790623.hdf']
def hdf2(hdf1):

    #taskset = TaskSet(tasks.hdf2geotiff(hdf1))
    taskset = TaskSet(tasks.hdf2geotiff.subtask((x, )) for x in hdf1)
    taskset_result = taskset.apply_async()

    results = taskset_result.join_native()
    
'''if __name__ == '__main__':
    #print "Making pi"
    hdf2(hdf1)'''
    
    