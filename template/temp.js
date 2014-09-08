<html>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<head>

    
 	 <script src="/static/js/OpenLayers/OpenLayers.js"></script>
    <!--  <link rel="stylesheet" type="text/css" href="css/style.css" /> -->
 	 <style type="text/css">
    	#mapdiv { 
     		width: 700px; /* Ширина */
     		height: 500px;
		border: 1px solid;
		/*background-color: 545454; b0b0b0;*/
		/*background: -moz-linear-gradient(left, #545454, #f8f8f8); /* Firefox 3.6+ */ */
    	}
    	div.olControlMousePosition {
    margin-bottom: 45px;
    left: 3px;
    display: block;
    position: absolute;
    font-family: Arial;
    font-size: 15px;
}
  </style>
  
  
<script type="text/javascript">
        var map, layer;
        function init(){

    map = new OpenLayers.Map("map");//инициализация карты
    var mapnik = new OpenLayers.Layer.OSM();//создание слоя карты
    map.addLayer(mapnik);//добавление слоя
    map.setCenter(new OpenLayers.LonLat(82.6167, 52.7667) //(широта, долгота)
          .transform(
            new OpenLayers.Projection("EPSG:4326"), // переобразование в WGS 1984
            new OpenLayers.Projection("EPSG:900913") // переобразование проекции
          ), 10 // масштаб
        );
    var layerMarkers = new OpenLayers.Layer.Markers("Markers");//создаем новый слой маркеров
    
    var mod07temperature = new OpenLayers.Layer.MapServer("MOD07 Surface_Temperature",
    		       mod07temperature,
		          { layers: 'prod',
			    format: 'png24',      
			    isBaseLayer: false,
			    visibility: false
 		});
    map.addLayer(mod07temperature);
    map.addLayer(layerMarkers);//добавляем этот слой к карте
    map.events.register('click', map, function (e) {    
        var size = new OpenLayers.Size(21, 25);//размер картинки для маркера
        var offset = new OpenLayers.Pixel(-(size.w / 2), -size.h); //смещение картинки для маркера
        var icon = new OpenLayers.Icon('/Images/smilies.png', size, offset);//картинка для маркера
        layerMarkers.addMarker(//добавляем маркер к слою маркеров
            new OpenLayers.Marker(map.getLonLatFromViewPortPx(e.xy), //координаты вставки маркера
            icon));//иконка маркера
    }); //добавление событие клика по карте

        }
    </script>
</head>
















































<body onload="init()">
 <div id="map" class="smallmap"></div>
<div id="mapdiv1111"></div>
<script>
var altaimap = "http://localhost/cgi-bin/mapserv?map=/home/diver/geolocal/maps/altai.map&layer=altay&layer=altay-city";
var mod07ozone = "http://localhost/cgi-bin/mapserv?map=/home/diver/geolocal/maps/mod07.map&layer=prod&layer=altay&layer=altay-city";
//var mod07temperature = "http://localhost/cgi-bin/mapserv?map=/home/diver/geolocal/maps/mod07temperature.map&layer=prod&layer=altay&layer=altay-city";
var mod09ga = "http://localhost/cgi-bin/mapserv?map=/home/diver/geolocal/maps/mod09.map&layer=prod&layer=altay&layer=altay-city";
//var mod14 = "http://localhost/cgi-bin/mapserv?map=/home/diver/geolocal/maps/%s&layer=%s&layer=altay&layer=altay-city"; 
    graticuleCtl = new OpenLayers.Control.Graticule({
                    labelled: true,
                    targetSize: 700,
                });
    var map = new OpenLayers.Map('mapdiv', {
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
					     {layers: 'image',
						  format: 'png24',      
						  isBaseLayer: true,
						  visibility: false
						 });

    var mod07ozone = new OpenLayers.Layer.MapServer("MOD07 Total_Ozone",
    		mod07ozone,
		     {layers: 'image',
			  format: 'png24',      
			  isBaseLayer: false,
			  visibility: false
			 });
    /*var mod07temperature = new OpenLayers.Layer.MapServer("MOD07 Surface_Temperature",
    		mod07temperature,
		     {layers: 'image',
			  format: 'png24',      
			  isBaseLayer: false,
			  visibility: false
			 });*/
    var mod09ga = new OpenLayers.Layer.MapServer("MOD09GA",
            mod09ga,
		     {layers: 'image',
			  format: 'png24',      
			  isBaseLayer: false,
			  visibility: false
			 });
	var oam = new OpenLayers.Layer.OSM(
        "Express Base",
        "http://maps.kosmosnimki.ru/TileService.ashx?Request=gettile&layerName=04C9E7CE82C34172910ACDBF8F1DF49A&apikey=L5VW1QBBHJ&z=${z}&x=${x}&y=${y}",
        {
            sphericalMercator: false
        }
    );
    
 

    	map.addLayers([imageLayer, mod07ozone, mod09ga, oam]);
    	map.addControl(new OpenLayers.Control.LayerSwitcher());
     	//map.zoomToExtent(new OpenLayers.Bounds(107.0024212413648002, 53.9999999949999889));
     	if (!map.getCenter()) map.zoomToMaxExtent();
</script>
</body>
</html>

 



















<html>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<head>

    
 	 <script src="/static/js/OpenLayers/OpenLayers.js"></script>
    <!--  <link rel="stylesheet" type="text/css" href="css/style.css" /> -->
 	 <style type="text/css">
    	#mapdiv { 
     		width: 700px; /* Ширина */
     		height: 500px;
		border: 1px solid;
		/*background-color: 545454; b0b0b0;*/
		/*background: -moz-linear-gradient(left, #545454, #f8f8f8); /* Firefox 3.6+ */ */
    	}
    	div.olControlMousePosition {
    margin-bottom: 45px;
    left: 3px;
    display: block;
    position: absolute;
    font-family: Arial;
    font-size: 15px;
}
  </style>
  
  
<script type="text/javascript">
        var map, layer;
        function init(){
         	var maxExtent = new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508);
            var restrictedExtent = maxExtent.clone();
            var maxResolution = 156543.0339;
            var options = {
                projection: new OpenLayers.Projection("EPSG:900913"),
                displayProjection: new OpenLayers.Projection("EPSG:4326"),
                numZoomLevels: 18,
                maxResolution: maxResolution,
                maxExtent: maxExtent,
                restrictedExtent: restrictedExtent
            };
            map = new OpenLayers.Map('map', options);
            // create Virtual Earth layers
            var veroad = new OpenLayers.Layer.VirtualEarth("Virtual Earth Roads", { 'type': VEMapStyle.Road, sphericalMercator: true });
            var veaer = new OpenLayers.Layer.VirtualEarth("Virtual Earth Aerial", { 'type': VEMapStyle.Aerial, hericalMercator: true });
            var vehyb = new OpenLayers.Layer.VirtualEarth("Virtual Earth Hybrid", { 'type': VEMapStyle.Hybrid, sphericalMercator: true });
            // create OSM layer
            var mapnik = new OpenLayers.Layer.OSM();
            // create OAM layer
            var oam = new OpenLayers.Layer.XYZ("OpenAerialMap", "http://tile.openaerialmap.org/tiles/1.0.0/openaerialmap-900913/${z}/${x}/${y}.png", { sphericalMercator: true });
            // create OSM layer
            var osmarender = new OpenLayers.Layer.OSM("OpenStreetMap (Tiles@Home)", "http://tah.openstreetmap.org/Tiles/tile/${z}/${x}/${y}.png");
            map.addControl(new OpenLayers.Control.ScaleLine());
            map.addControl(new OpenLayers.Control.MousePosition());
            map.addLayers([ mapnik, veroad, veaer, vehyb]);
            map.addControl(new OpenLayers.Control.LayerSwitcher());

            var point0 = new OpenLayers.Geometry.Point(82.6167, 52.7667);
            point0.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
            map.setCenter(new OpenLayers.LonLat(point0.x, point0.y), 9);
        }
    </script>
</head>
















































<body onload="init()">
 <div id="map" class="smallmap"></div>
<div id="mapdiv1111"></div>
<script>
var altaimap = "http://localhost/cgi-bin/mapserv?map=/home/diver/geolocal/maps/altai.map&layer=altay&layer=altay-city";
var mod07ozone = "http://localhost/cgi-bin/mapserv?map=/home/diver/geolocal/maps/mod07.map&layer=prod&layer=altay&layer=altay-city";
//var mod07temperature = "http://localhost/cgi-bin/mapserv?map=/home/diver/geolocal/maps/mod07temperature.map&layer=prod&layer=altay&layer=altay-city";
var mod09ga = "http://localhost/cgi-bin/mapserv?map=/home/diver/geolocal/maps/mod09.map&layer=prod&layer=altay&layer=altay-city";
//var mod14 = "http://localhost/cgi-bin/mapserv?map=/home/diver/geolocal/maps/%s&layer=%s&layer=altay&layer=altay-city"; 
    graticuleCtl = new OpenLayers.Control.Graticule({
                    labelled: true,
                    targetSize: 700,
                });
    var map = new OpenLayers.Map('mapdiv', {
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
					     {layers: 'image',
						  format: 'png24',      
						  isBaseLayer: true,
						  visibility: false
						 });

    var mod07ozone = new OpenLayers.Layer.MapServer("MOD07 Total_Ozone",
    		mod07ozone,
		     {layers: 'image',
			  format: 'png24',      
			  isBaseLayer: false,
			  visibility: false
			 });
    /*var mod07temperature = new OpenLayers.Layer.MapServer("MOD07 Surface_Temperature",
    		mod07temperature,
		     {layers: 'image',
			  format: 'png24',      
			  isBaseLayer: false,
			  visibility: false
			 });*/
    var mod09ga = new OpenLayers.Layer.MapServer("MOD09GA",
            mod09ga,
		     {layers: 'image',
			  format: 'png24',      
			  isBaseLayer: false,
			  visibility: false
			 });
	var oam = new OpenLayers.Layer.OSM(
        "Express Base",
        "http://maps.kosmosnimki.ru/TileService.ashx?Request=gettile&layerName=04C9E7CE82C34172910ACDBF8F1DF49A&apikey=L5VW1QBBHJ&z=${z}&x=${x}&y=${y}",
        {
            sphericalMercator: false
        }
    );
    
 

    	map.addLayers([imageLayer, mod07ozone, mod09ga, oam]);
    	map.addControl(new OpenLayers.Control.LayerSwitcher());
     	//map.zoomToExtent(new OpenLayers.Bounds(107.0024212413648002, 53.9999999949999889));
     	if (!map.getCenter()) map.zoomToMaxExtent();
</script>
</body>
</html>

 

