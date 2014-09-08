var mapPanel, tree;
var altaimap = "http://localhost/cgi-bin/mapserv?MAP=/home/diver/geoserver/maps/wmsmap.map&";
Ext.onReady(function() {
    // create a map panel with some layers that we will show in our layer tree
    // below.
    var options = {
    	controls: [
           	new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.PanZoomBar(),
            new OpenLayers.Control.LayerSwitcher({'ascending':false}),
			new OpenLayers.Control.ScaleLine(),
			new OpenLayers.Control.MousePosition(),
            new OpenLayers.Control.OverviewMap(),
            new OpenLayers.Control.KeyboardDefaults(),
			new OpenLayers.Control.Graticule () ],
           	scales: [4000000, 3000000, 2000000, 1000000, 500000, 100000],
          numZoomLevels: 8,
          	 units: 'degrees',
           	projection: new OpenLayers.Projection('EPSG:4326'),
           	maxExtent: new OpenLayers.Bounds(77.2289530630876442, 49.9969740071353286, 88.0024212413648002, 55.9999999949999889),
           	restrictedExtent: new OpenLayers.Bounds(77.2289530630876442, 49.9969740071353286, 88.0024212413648002, 55.9999999949999889),
           	
           	
    };
    
    mapPanel = new GeoExt.MapPanel({
        border: true,
        region: "center",
        // we do not want all overlays, to try the OverlayLayerContainer
        map: new OpenLayers.Map(options),
        //center: [52.5000, 82.7833, 52.5000, 82.7833],
        
        layers: [
        
 			new OpenLayers.Layer.WMS("Ban367",
   			 	'http://localhost/cgi-bin/mapserv?MAP=/home/diver/geoserver/maps/bands367.map&',
   			   	 	{
                    layers: [
                        "modis"
 					],
                    transparent: true,
                    format: "image/png"
                }, {
                    isBaseLayer: true,
                    buffer: 0
                }
   			   	 	
   			   	 	
   			   	 	
   			   	 	),
 
 new OpenLayers.Layer.WMS("Altai Region (полигоны)",
    		 'http://localhost/cgi-bin/mapserv?MAP=/home/diver/geoserver/maps/wmsmap.map&',
			{
                    layers: [
                        "boundary-polygon",
                        "vegetation-polygon",
                        "landuse-polygon",
                        "settlement-polygon",
                        "water-polygon",
                        "water-line",
                        "railway-line",
                        "highway-line4",
                        "highway-line",
                        "building-polygon",
                        "settlement-point",
                        "village-point"
                       
                         ],
                    transparent: true,
                    format: "image/png"
                }, {
                    isBaseLayer: false,
                    buffer: 0,
                    // exclude this layer from layer container nodes
                    displayInLayerSwitcher: false,
                    visibility: false
                }),
      new OpenLayers.Layer.WMS("MODIS",
    		 'http://localhost/cgi-bin/mapserv?MAP=/home/diver/geoserver/maps/bands367.map&',
			{
                    layers: [
                        "modis",
                        //""
                        
                         ],
                    transparent: true,
                    format: "image/png"
                }, {
                    isBaseLayer: false,
                    buffer: 0,
                    // exclude this layer from layer container nodes
                    displayInLayerSwitcher: false,
                    visibility: false
                })        ]
    });
    
    // map.zoomToExtent(new OpenLayers.Bounds(60.2289530630876442, 48.9969740071353286, 110.0024212413648002, 57.9999999949999889));
    // map.addControl(new OpenLayers.Control.LayerSwitcher());
    // map.addControl(new OpenLayers.Control.Permalink());
    // map.addControl(new OpenLayers.Control.MousePosition());
//     
    // if (!map.getCenter()) {map.zoomToMaxExtent()}

    // create our own layer node UI class, using the TreeNodeUIEventMixin
    var LayerNodeUI = Ext.extend(GeoExt.tree.LayerNodeUI, new GeoExt.tree.TreeNodeUIEventMixin());
        
    // using OpenLayers.Format.JSON to create a nice formatted string of the
    // configuration for editing it in the UI
    var treeConfig = [{
        nodeType: "gx_baselayercontainer"
    }, /*{
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
    }, **/ {
        nodeType: "gx_layer",
        layer: "Altai Region (полигоны)",
        isLeaf: false,
        expanded: true,
        // create subnodes for the layers in the LAYERS param. If we assign
        // a loader to a LayerNode and do not provide a loader class, a
        // LayerParamLoader will be assumed.
        loader: {
            param: "LAYERS"
        }
    },
    {
        nodeType: "gx_layer",
        layer: "MODIS",
        isLeaf: false,
        expanded: true,
        // create subnodes for the layers in the LAYERS param. If we assign
        // a loader to a LayerNode and do not provide a loader class, a
        // LayerParamLoader will be assumed.
        loader: {
            param: "LAYERS"
        }
    }
    ];
    // The line below is only needed for this example, because we want to allow
    // interactive modifications of the tree configuration using the
    // "Show/Edit Tree Config" button. Don't use this line in your code.
    treeConfig = new OpenLayers.Format.JSON().write(treeConfig, true);

    // create the tree with the configuration from above
    tree = new Ext.tree.TreePanel({
        border: true,
        region: "west",
        title: "Layers",
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
            //children: treeConfig
            
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
                // bodyStyle: {"padding": "5px"},
                collapsible: true,
                collapseMode: "mini",
                split: true,
                width: 200,
                title: "Description"
            }]
        }
    });
});
