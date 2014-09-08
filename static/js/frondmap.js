// make map available for easy debugging
var map;


function init(){
 	
 	var altaimap = "http://localhost/cgi-bin/mapserv?MAP=/home/diver/geoserver/maps/map.map&LAYERS=all&MODE=MAP";
    var maxExtent = new OpenLayers.Bounds(60.2289530630876442, 48.9969740071353286, 110.0024212413648002, 57.9999999949999889), /// -6378137, -6378137, 6378137, 6378137 
        restrictedExtent = maxExtent.clone(),
        maxResolution = 156543.0339;
    
    var options = {
        projection: new OpenLayers.Projection('WGS84'),
       // displayProjection: new OpenLayers.Projection("EPSG:4326"),
        units: 'degrees',
        numZoomLevels: 7,
        maxResolution: maxResolution,
        maxExtent: maxExtent,
        restrictedExtent: restrictedExtent
    };
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
          scales: [4000000, 3000000, 2000000, 1000000, 500000, 100000],
          numZoomLevels: 8
 		  },
          
          {
          units: 'degrees',
          projection: new OpenLayers.Projection('WGS84'),
});



    var imageLayer = new OpenLayers.Layer.MapServer("Altai Region",
    		 altaimap,
			{ layers: 'image',
			  format: 'png24',      
			  isBaseLayer: true,
			  visibility: false,
	
});
var test = new OpenLayers.Layer.MapServer("Ban367",
   			 "http://localhost/cgi-bin/mapserv?MAP=/home/diver/geoserver/maps/bands367.map&layer=367&MODE=MAP",
   			  {layers: 'image',
			  format: 'png24',      
			  isBaseLayer: false,
			  visibility: false,
			  overlays: true
});
 var imageLayer2 = new OpenLayers.Layer.MapServer("Altai Region111",
    		 altaimap,
			{ layers: 'image',
			  format: 'png24',      
			  isBaseLayer: false,
			  visibility: false,
	
});


 	map.addLayers([imageLayer, test, imageLayer2]);
 	
 	
    map.zoomToExtent(new OpenLayers.Bounds(60.2289530630876442, 48.9969740071353286, 110.0024212413648002, 57.9999999949999889));
    map.addControl(new OpenLayers.Control.LayerSwitcher());
    map.addControl(new OpenLayers.Control.Permalink());
    map.addControl(new OpenLayers.Control.MousePosition());
    
    if (!map.getCenter()) {map.zoomToMaxExtent()}
}