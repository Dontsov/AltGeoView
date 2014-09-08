var altaimap = "http://localhost/cgi-bin/mapserv?map=/home/diver/geoserver/maps/map.map&layer=altay&layer=altay-city&mode=map";
graticuleCtl = new OpenLayers.Control.Graticule({
 	labelled: true,
    targetSize: 700
});

var map = new OpenLayers.Map('mapdiv',{
          controls: [
           	new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.PanZoomBar(),
            new OpenLayers.Control.LayerSwitcher({'ascending':false}),
			new OpenLayers.Control.ScaleLine(),
			new OpenLayers.Control.MousePosition(),
            new OpenLayers.Control.OverviewMap(),
            new OpenLayers.Control.KeyboardDefaults(),
			new OpenLayers.Control.Graticule (),
			],
          scales: [4000000, 1000000, 100000, 10000, 1000, 100, 10],
          numZoomLevels: 8
 		  },
          
          {
          units: 'degrees',
          projection: new OpenLayers.Projection('WGS84'),
});

var bounds =  new OpenLayers.Bounds(62.2289530630876442, 49.9969740071353286, 120.0024212413648002, 59.9999999949999889);

var imageLayer = new OpenLayers.Layer.MapServer("Altai Region",
    		 altaimap,
			{ layers: 'image',
			  format: 'png24',      
			  isBaseLayer: true,
			  visibility: false
});



map.addLayer(imageLayer);
map.zoomToExtent(new OpenLayers.Bounds(59.2289530630876442, 48.9969740071353286, 107.0024212413648002, 53.9999999949999889));
if (!map.getCenter()) map.zoomToMaxExtent();


