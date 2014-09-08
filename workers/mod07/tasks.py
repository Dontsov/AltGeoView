from celery.decorators import task
from osgeo import gdal
from celery.task.sets import TaskSet
import tasks
@task
def hdf2geotiff(hdf1):
    hdf = gdal.Open(hdf1)
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
    #print "Hdf it's good format!"
