
var altaimap = "http://localhost/cgi-bin/mapserv?map=/home/diver/geolocal/maps/altai.map&layer=altay&layer=altay-city";
var mod07ozone = "http://localhost/cgi-bin/mapserv?map=/home/diver/geolocal/map/mod07.map&layer=prod&layer=altay&layer=altay-city";
var mod07temperature = "http://localhost/cgi-bin/mapserv?map=/home/diver/geolocal/map/mod07temperature.map&layer=prod&layer=altay&layer=altay-city";
var mod09ga = "http://localhost/cgi-bin/mapserv?map=/home/diver/geolocal/map/mod09.map&layer=prod&layer=altay&layer=altay-city";
var mod14 = "http://localhost/cgi-bin/mapserv?map=/home/diver/geolocal/map/mod14.map&layer=prod&layer=altay&layer=altay-city"; 
    
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
          projection: new OpenLayers.Projection('WGS84'),// установка проекции
});

var bounds =  new OpenLayers.Bounds(62.2289530630876442, 49.9969740071353286, 120.0024212413648002, 59.9999999949999889);

var imageLayer = new OpenLayers.Layer.MapServer("Altai Region",
    		 altaimap,
			{ layers: 'image',
			  format: 'png24',      
			  isBaseLayer: true,
			  visibility: false
});

var mod07ozone = new OpenLayers.Layer.MapServer("MOD07 Total_Ozone",
    		 mod07ozone,
		          { layers: 'image',
			    format: 'png24',      
			    isBaseLayer: false,
			    visibility: false
});
    
var mod07temperature = new OpenLayers.Layer.MapServer("MOD07 Surface_Temperature",
    		       mod07temperature,
		          { layers: 'image',
			    format: 'png24',      
			    isBaseLayer: false,
			    visibility: false
});

var mod09ga = new OpenLayers.Layer.MapServer("MOD09GA",
              mod09ga,
		     { layers: 'image',
		       format: 'png24',      
		       isBaseLayer: false,
		       visibility: false
});
    
var mod14 = new OpenLayers.Layer.MapServer("MOD14",
            mod14,
		  { layers: 'image',
	            format: 'png24',      
	            isBaseLayer: false,
		    visibility: false
});
    	

map.addLayers([imageLayer, mod07ozone, mod07temperature,  mod09ga, mod14]);
map.zoomToExtent(new OpenLayers.Bounds(59.2289530630876442, 48.9969740071353286, 107.0024212413648002, 53.9999999949999889));
if (!map.getCenter()) map.zoomToMaxExtent();


