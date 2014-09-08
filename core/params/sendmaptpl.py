#!/usr/bin/env python
# -*- coding: utf-8 -*-
from time import strftime


def sendmap(mapname, namepage):

    tmplpr = {
             'mapfile' : mapname, 
             'namepage' : namepage,
            # 'sizeH' : sizeH,
            # 'sizeW' : sizeW,
            # 'name_prod' : name_prod,
            # 'map_tiff' : map_tiff,
         }


    templepr = """<html>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<head>
      <title>%(namepage)s</title>
      <script src="/static/js/OpenLayers/OpenLayers.js"></script>
      <link rel="stylesheet" type="text/css" href="/static/css/style.css" />
     
</head>
 <body>
    <div id="mapdiv"></div>
<script>
    var modname1 = "http://localhost/cgi-bin/mapserv?map=%(mapfile)s&layer=prod&layer=altay&layer=altay-city"; 
    graticuleCtl = new OpenLayers.Control.Graticule({
                    labelled: true,
                    targetSize: 700
                });
    var map = new OpenLayers.Map('mapdiv',{ controls: [
                        new OpenLayers.Control.Navigation(),
                        new OpenLayers.Control.PanZoomBar(),
                        new OpenLayers.Control.LayerSwitcher({'ascending':false}),
                        new OpenLayers.Control.ScaleLine(),
                        new OpenLayers.Control.MousePosition(),
                        new OpenLayers.Control.OverviewMap(),
                        new OpenLayers.Control.KeyboardDefaults(),
                        new OpenLayers.Control.Graticule (),
                      ],
                    scales: [4000000, 2000000, 1000000, 500000, 200000],
                    numZoomLevels: 8
                    
                },
                {
                    units: 'degrees',
                    projection: new OpenLayers.Projection('WGS84'),
                  });
    var bounds =  new OpenLayers.Bounds(62.2289530630876442, 49.9969740071353286, 120.0024212413648002, 59.9999999949999889);
    var modname = new OpenLayers.Layer.MapServer("Map Data",
            modname1,
             {layers: 'image',
              format: 'png24',      
              isBaseLayer: true,
              visibility: false
             });
     map.addLayer(modname);
         map.zoomToExtent(new OpenLayers.Bounds(59.2289530630876442, 48.9969740071353286, 107.0024212413648002, 53.9999999949999889));
         if (!map.getCenter()) map.zoomToMaxExtent();
</script>
</body>
</html>
""" % tmplpr
    return templepr 








     


