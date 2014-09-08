var mapPanel, tree;
Ext.onReady(function() {
    // create a map panel with some layers that we will show in our layer tree
    // below.
	var options = {
            //div: "mapdiv",
            allOverlays: false,
            projection: "EPSG:3857",
            displayProjection: new OpenLayers.Projection("EPSG:4326"), 
	    sphericalMercator: true,
            restrictedExtent: new OpenLayers.Bounds(7965839.18, 13589035.09, 9963800.99, 100408.89),
            scales: [800000, 7000000, 6000000, 5000000, 4000000, 300000],
	    numZoomLevels: 6,
            units: "m",
//         	numZoomLevels: 10,
//         	numZoomLevels: 3,
         	// maxResolution: 611.496226171875,
            // numZoomLevels: 10,
           // scales: [13867008,3466752,108336,54168,27084,13542,6771],,
            controls: [
   	 	new OpenLayers.Control.Navigation(),
     	new OpenLayers.Control.PanZoomBar(),
     	new OpenLayers.Control.LayerSwitcher({'ascending':false}),
	 	new OpenLayers.Control.ScaleLine(),
	 	new OpenLayers.Control.MousePosition(),
     	new OpenLayers.Control.OverviewMap(),
     	new OpenLayers.Control.KeyboardDefaults(),
	 	new OpenLayers.Control.Graticule ()
	 	]
        };	
	
    mapPanel = new GeoExt.MapPanel({
        border: true,
        region: "center",
        // we do not want all overlays, to try the OverlayLayerContainer
        map: new OpenLayers.Map(options),
//        zoom: 6,
        layers: [
              /*new OpenLayers.Layer.OSM("Openstreatemap API"),
                 new OpenLayers.Layer.XYZ("Spot5 (Космоснимки API)",
                		 "http://maps.kosmosnimki.ru/TileService.ashx?Request=gettile&layerName=04C9E7CE82C34172910ACDBF8F1DF49A&apikey=L5VW1QBBHJ&z=${z}&x=${x}&y=${y}&CRS=EPSG:3857",{
                         layers: "bluemarble"
                 }, {
                     buffer: 0,
                     visibility: false
                 }
              ),***/
       new OpenLayers.Layer.MapServer("Алтайский край (Shp-формат)",
    		     "http://localhost/cgi-bin/mapserv?MAP=/home/diver/geoserver/maps/map.map&LAYERS=all&MODE=MAP",
    		     { visibility: false}
       ),
   		  
       new OpenLayers.Layer.MapServer("Ban367",
   				 "http://localhost/cgi-bin/mapserv?MAP=/home/diver/geoserver/maps/bands367.map&layer=367&MODE=MAP",
   				 { visibility: true }),
				 
        new OpenLayers.Layer.MapServer("Landsat8",
   				 "http://localhost/cgi-bin/mapserv?MAP=/home/diver/geoserver/maps/Landsat8/landsat8-11:30.16.07.14.map&layer=11:09.16.07&MODE=MAP",
   				 { visibility: true }),
              
       new OpenLayers.Layer.MapServer("Tasmania (Group Layer)",
                      "http://localhost/cgi-bin/mapserv?MAP=/home/diver/geoserver/maps/bands367.map&layer=367", {
                          transparent: true,
                          format: "image/png",
                          displayInLayerSwitcher: false,
                          visibility: false
                      }
                  )
            // create a group layer (with several layers in the "layers" param)
            // to show how the LayerParamLoader works
// new OpenLayers.Layer.WMS("Tasmania (Group Layer)",
// "http://demo.opengeo.org/geoserver/wms", {
// layers: [
// "topp:tasmania_state_boundaries",
// "topp:tasmania_water_bodies",
// "topp:tasmania_cities",
// "topp:tasmania_roads"
// ],
// transparent: true,
// format: "image/gif"
// }, {
// isBaseLayer: false,
// buffer: 0,
// // exclude this layer from layer container nodes
// displayInLayerSwitcher: false,
// visibility: false
// }
// )
        ]
    });
    
    
    
    extent = [7965839.18, 13589035.09, 9963800.99, 100408.89];
    map.addControl( new OpenLayers.Control.LayerSwitcher() );
    map.zoomToExtent(extent);

    // create our own layer node UI class, using the TreeNodeUIEventMixin
    var LayerNodeUI = Ext.extend(GeoExt.tree.LayerNodeUI, new GeoExt.tree.TreeNodeUIEventMixin());
        
    // using OpenLayers.Format.JSON to create a nice formatted string of the
    // configuration for editing it in the UI
    var treeConfig = [{
        nodeType: "gx_baselayercontainer"
    }, {
        nodeType: "gx_overlaylayercontainer",
        expanded: true,
        // render the nodes inside this container with a radio button,
        // and assign them the group "foo".
        loader: {
            baseAttrs: {
                radioGroup: "foo",
                uiProvider: "layernodeui"
            }
        }
    }, //{
//        nodeType: "gx_layer",
//        layer: "Ban367",
//        isLeaf: false,
//        // create subnodes for the layers in the LAYERS param. If we assign
//        // a loader to a LayerNode and do not provide a loader class, a
//        // LayerParamLoader will be assumed.
//        loader: {
//            param: "LAYERS"
//        },
    {
        nodeType: "gx_layer",
        layer: "Tasmania (Group Layer)",
        isLeaf: false,
        // create subnodes for the layers in the LAYERS param. If we assign
        // a loader to a LayerNode and do not provide a loader class, a
        // LayerParamLoader will be assumed.
        loader: {
            param: "LAYERS"
        }
    }];
    // The line below is only needed for this example, because we want to allow
    // interactive modifications of the tree configuration using the
    // "Show/Edit Tree Config" button. Don't use this line in your code.
    treeConfig = new OpenLayers.Format.JSON().write(treeConfig, true);

    // create the tree with the configuration from above
    tree = new Ext.tree.TreePanel({
        border: true,
        region: "west",
        title: "",
        width: 200,
        split: true,
        collapsible: true,
        collapseMode: "mini",
        autoScroll: true,
        plugins: [
            new GeoExt.plugins.TreeNodeRadioButton({
                listeners: {
                    "radiochange": function(node) {
                        alert(node.text + " is now the active layer.");
                    }
                }
            })
        ],
        loader: new Ext.tree.TreeLoader({
            // applyLoader has to be set to false to not interfer with loaders
            // of nodes further down the tree hierarchy
            applyLoader: false,
            uiProviders: {
                "layernodeui": LayerNodeUI
            }
        }),
        root: {
            nodeType: "async",
            // the children property of an Ext.tree.AsyncTreeNode is used to
            // provide an initial set of layer nodes. We use the treeConfig
            // from above, that we created with OpenLayers.Format.JSON.write.
            children: Ext.decode(treeConfig)
            // Don't use the line above in your application. Instead, use
            // children: treeConfig
            
        },
        listeners: {
            "radiochange": function(node){
                alert(node.layer.name + " is now the the active layer.");
            }
        },
        rootVisible: false,
        lines: false,
        bbar: [{
            text: "Show/Edit Tree Config",
            handler: function() {
                treeConfigWin.show();
                Ext.getCmp("treeconfig").setValue(treeConfig);
            }
        }]
    });

    // dialog for editing the tree configuration
    var treeConfigWin = new Ext.Window({
        layout: "fit",
        hideBorders: true,
        closeAction: "hide",
        width: 300,
        height: 400,
        title: "Tree Configuration",
        items: [{
            xtype: "form",
            layout: "fit",
            items: [{
                id: "treeconfig",
                xtype: "textarea"
            }],
            buttons: [{
                text: "Save",
                handler: function() {
                    var value = Ext.getCmp("treeconfig").getValue()
                    try {
                        var root = tree.getRootNode();
                        root.attributes.children = Ext.decode(value);
                        tree.getLoader().load(root);
                    } catch(e) {
                        alert("Invalid JSON");
                        return;
                    }
                    treeConfig = value;
                    treeConfigWin.hide();
                }
            }, {
                text: "Cancel",
                handler: function() {
                    treeConfigWin.hide();
                }
            }]
        }]
    });
    
    new Ext.Viewport({
        layout: "fit",
        hideBorders: true,
        items: {
            layout: "border",
            deferredRender: false,
            items: [mapPanel, tree, {
                contentEl: "desc",
                region: "east",
                bodyStyle: {"padding": "5px"},
                collapsible: true,
                collapseMode: "mini",
                split: true,
                width: 200,
                title: "Информация"
            }]
        }
    });
});
