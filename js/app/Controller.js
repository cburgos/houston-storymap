define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/aspect",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dojo/dom",
    "dojo/on",
    "esri/map",
    "application/widgets/bootstrapmap",
    "application/widgets/Shortlist",
    "application/widgets/LayerControl",
    "application/widgets/SearchControl",
    "application/config",
    "esri/dijit/BasemapGallery",
    "esri/geometry/Point",
    "esri/geometry/webMercatorUtils",
    "esri/config",
    "esri/graphic",
    "esri/InfoTemplate",
    "esri/layers/GraphicsLayer",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/symbols/PictureMarkerSymbol"
],
function (declare, lang, array, aspect, domClass, domConstruct, dom, on, Map, BootstrapMap, Shortlist, LayerControl, SearchControl, config, BasemapGallery, Point, webMercatorUtils, esriConfig, Graphic, InfoTemplate, GraphicsLayer, ArcGISDynamicMapServiceLayer, PictureMarkerSymbol) {
    return declare(null, {
        map: null,
        shortlist: null,
        layerControl: null,
        searchControl: null,
        allConstructionLayer : null,
        startup: function () {
            this.init();
        },
        init: function () {
            //Init splash
            $("#splash").modal("show");

            $('#LegendModal').modal({ "show": false, backdrop: false });
            $("#LegendModal").draggable({ handle: ".modal-header" });

            $('#basemapModal').modal({ "show": false, backdrop: false });
            $("#basemapModal").draggable({ handle: ".modal-header" });

            $('#layerControlModal').modal({ "show" : false, backdrop : false });
            $("#layerControlModal").draggable({ handle: ".modal-header" });
                       

            //Load webmap Toggle
            this.initWebmapToggle();
        },
        _cleanup: function () {
            if (this.map) {
                this.map.destroy();
            }
            if (this.shortlist) {
                this.shortlist.destroy();
            }
            if (this.basemapButton) {
                domConstruct.destroy(this.basemapButton);
            }
            if (this.basemapGallery) {
                this.basemapGallery.destroy();
            }
            if (this.locateBtn) {
                domConstruct.destroy(this.locateBtn.id);
            }
            if (this.homeBtn) {
                domConstruct.destroy(this.homeBtn.id);
            }
            if (this.dataLayerButton) {
                domConstruct.destroy(this.dataLayerButton);
            }
            if (this.toggleProjectsButton) {
                domConstruct.destroy(this.toggleProjectsButton);
            }
            if (this.allConstructionButton) {
                domConstruct.destroy(this.allConstructionButton);
            }
            if (this.infoButton) {
                domConstruct.destroy(this.infoButton);
            }
            if (this.layerControl) {
                this.layerControl.destroy();
            }
            if (this.searchControl) {
                this.searchControl.destroy();
            }             
            if (this.allConstructionLayer) {
                 this.allConstructionLayer = null;
            }
            if (this.LegendControl) {
                 this.LegendControl.destroy();
            }
        },
        _init: function (selectedWebmap) {
            this._cleanup();

            //Update Project Category Button
            //TODO : Better way to add span?
            $("#projectTypeButton").html(selectedWebmap.label +"<span class='caret'></span>");

            //Init Map
            
            var mapReq = BootstrapMap.createWebMap(selectedWebmap.webmapId, "mapDiv", {
                mapOptions: {
                    slider: true,
                    wrapAround180: true
                }
            });
            mapReq.then(lang.hitch(this, function (result) {
                if (result.map) {
                    this.map = result.map;
                    this.map.enableScrollWheelZoom();
                    this.map.hideZoomSlider();

                    //customize infowindow
                    this.map.infoWindow.titleInBody = false;
                    this.map.infoWindow.anchor = "left";
					
                    aspect.before(this.map.infoWindow, "select", lang.hitch(this, function () {
                        this.map.infoWindow.hide();
                        array.forEach(this.map.infoWindow.features, function (g) {
                            var infoTemplate = new InfoTemplate();
                            var titleString = config.infoTemplateTitleField;
                            var contentString = "";

                            if (g.attributes.DEPARTMENT) {
                                contentString = contentString + " Project Type : " + g.attributes.DEPARTMENT.replace("_", "");
                            }
                            if (g.attributes.CIP_NO) {
                                contentString = contentString + " <br> WBS # : " + g.attributes.CIP_NO;
                            }
                            if (g.attributes.COST) {
                                contentString = contentString + " <br> Cost Estimate : " + g.attributes.COST;
                            }
                            if (g.attributes.FCON_START) {
                                contentString = contentString + " <br> Construction Start : " + g.attributes.FCON_START;
                            }
                            if (g.attributes.COMPLETED) {
                                contentString = contentString + " <br> Construction End : " + g.attributes.COMPLETED;
                            }
                            if (g.attributes.PROJ_DOC) {
                                contentString = contentString + " <br> <a target='_blank' href='" + g.attributes.PROJ_DOC + "'>Project Details</a>";
                            }
							
							//Street View Link for all - C, FC, UC
							var LatLong = esri.geometry.xyToLngLat(g.geometry.x, g.geometry.y);
                            var x = LatLong[0];
                            var y = LatLong[1];

                            var gStreetUrl = "//pwecip.houstontx.gov/cipprod/StreetView.html?Y=" + y + "&X=" + x;
                            contentString = contentString + " <br> <a href='" + gStreetUrl + "' target='_blank'>Street View</a>";
                            
                            //Image
                            if (g.attributes.PROJ_IMAGE) {
                                contentString = contentString + " <br> <img class='esriPopupMediaImage' src='" + g.attributes.PROJ_IMAGE + "' />";
                            }
                            infoTemplate.setTitle(titleString);
                            infoTemplate.setContent(contentString);

                            g.setInfoTemplate(infoTemplate);
                        });
                        this.map.infoWindow.show(this.map.infoWindow.features[0]);
                    }));

                    this._createShortlist(result);

                    //Zoom In
                    var zoomInBtn = domConstruct.create("div", {
                        "class": "mapButton",
                        "title": "Zoom In"
                    }, dom.byId("mapDiv_zoom_slider"), "after");
                    var zoomInImg = domConstruct.create("span", {
                        innerHTML : "+"
                    }, zoomInBtn, "last");
                    on(zoomInBtn, "click", lang.hitch(this, function () {
                        this.map.setLevel(this.map.getLevel() + 1);
                    }));

                    //Zoom Out
                    var zoomOutBtn = domConstruct.create("div", {
                        "class": "mapButton",
                        "title": "Zoom Out"
                    }, zoomInBtn, "after");
                    var zoomOutImg = domConstruct.create("span", {
                        innerHTML: "-"
                    }, zoomOutBtn, "last");
                    on(zoomOutBtn, "click", lang.hitch(this, function () {
                        this.map.setLevel(this.map.getLevel() - 1);
                    }));
                  
                    //Home Button
                    var homeExtent = result.map.extent;
                    var homeBtn = domConstruct.create("div", {
                        "class": "mapButton",
                        "title": "Default Extent"
                    }, zoomOutBtn, "after");
                    var homeImg = domConstruct.create("img", {
                        src: "images/ZoomHome.png"
                    }, homeBtn, "last");

                    on(homeBtn, "click", lang.hitch(this, function (event) {
                        this.map.setExtent(homeExtent);
                    }));
                    this.homeBtn = homeBtn;

                    //Locate Button
                    var locateBtn = domConstruct.create("div", {
                        "class": "mapButton",
                        "title" : "My Location"
                    }, homeBtn, "after");
                    var locateImg = domConstruct.create("img", {
                        src: "images/locateButton.png"
                    }, locateBtn, "last");

                    var locateLayer = new GraphicsLayer({
                        id: "locateLayer"
                    });
                    this.map.addLayer(locateLayer);

                    var locateSymbol = new PictureMarkerSymbol('images/mapcommand-location-marker.png', 21, 21);

                    on(locateBtn, "click", lang.hitch(this, function (event) {
                        navigator.geolocation.getCurrentPosition(lang.hitch(this, function (e) {
                            var pt = new Point(e.coords.longitude, e.coords.latitude);
                            var locationPoint = webMercatorUtils.geographicToWebMercator(pt);

                            this.map.centerAt(locationPoint);

		                    locateLayer.clear();
		                    locateLayer.add(new Graphic(locationPoint, locateSymbol));

		                    setTimeout(function () {
                                //TODO: Is this needed?
		                        $('#locateLayer_layer image').hide();
		                    }, 10000);
                        }));
                    }));

                    this.locateBtn = locateBtn;

                    //Data Layer Button
                    var dataLayerButton = domConstruct.create("div", {
                        "class": "mapButton",
                        "title": "Reference Data Layers"
                    }, locateBtn, "after");
                    domConstruct.create("span", {
                        "class": "glyphicon glyphicon-list",
                        "aria-hidden": true
                    }, dataLayerButton, "last");

                    on(dataLayerButton, "click", lang.hitch(this, function (event) {
                        $('#layerControlModal').modal('toggle');                        
                        
                    }));
                    this.dataLayerButton = dataLayerButton;

                    //Toggle Projects button
                    var toggleProjectsButton = domConstruct.create("div", {
                        "class": "mapButton",
                        "title": "Show / Hide Projects"
                    }, dataLayerButton, "after");
                    domConstruct.create("span", {
                        "class": "glyphicon glyphicon-resize-horizontal",
                        "aria-hidden":true
                    }, toggleProjectsButton, "last");

                    on(toggleProjectsButton, "click", lang.hitch(this, function (event) {
                        //$('#layerControlModal').modal('show');
                        if ($(".main-side-container").css("visibility") !== "hidden") {
                            //Full size map
                            $(".main-side-container").css("visibility", "hidden");
                            $(".main-side-container").css("position", "absolute");
                            $(".main-side-container").removeClass("col-xs-4");

                            $(".main-map-container").css("position", "absolute");
                            $(".main-map-container").removeClass("col-xs-8");
                            $(".main-map-container").addClass("col-xs-12");
                        } else {
                            //non full size map
                            $(".main-side-container").css("visibility", "visible");
                            $(".main-side-container").css("position", "");
                            $(".main-side-container").addClass("col-xs-4");

                            $(".main-map-container").css("position", "");
                            $(".main-map-container").removeClass("col-xs-12");
                            $(".main-map-container").addClass("col-xs-8");
                        }
                        this.map.resize();
                        this.map.reposition();                        

                    }));
                    this.toggleProjectsButton = toggleProjectsButton;

                    //all construction Button
                    var allConstructionButton = domConstruct.create("div", {
                        "class": "mapButton",
                        "title": "All Construction: Look Back Look Forward"
                    }, toggleProjectsButton, "after");
                    domConstruct.create("span", {
                        "class": "glyphicon glyphicon-fullscreen",
                        "aria-hidden": true
                    }, allConstructionButton, "last");

                    on(allConstructionButton, "click", lang.hitch(this, function (event) {
                        //TODO: Toggle Layer
                        if (this.allConstructionLayer) {
                            this.allConstructionLayer.setVisibility(!this.allConstructionLayer.visible);
                        } else {
                            //create layer and add to map
                            this.allConstructionLayer = new ArcGISDynamicMapServiceLayer(config.allConstructionLayer, {
                            });
                            this.map.addLayer(this.allConstructionLayer, 1);                            
                        }
                    }));
                    this.allConstructionButton = allConstructionButton;

                    //InfoButton
                    var infoButton = domConstruct.create("div", {
                        "class": "mapButton",
                        "title": "More Information"
                    }, allConstructionButton, "after");
                    domConstruct.create("i", {
                        "class": "fa fa-question",
                        "style":"font-size:24px"
                    }, infoButton, "last");

                    on(infoButton, "click",  function (event) {
                        $("#splash").modal("toggle");
                    });
                    this.infoButton = infoButton;

                    //basemap toggle
                    var basemapButton = domConstruct.create("div", {
                        "class": "mapButton",
                        "title": "Toggle Basemaps"
                    }, infoButton, "after");
                    domConstruct.create("span", {
                        "class": "glyphicon glyphicon-th-large",
                        "aria-hidden": true
                    }, basemapButton, "last");

                    on(basemapButton, "click", function (event) {
                        $("#basemapModal").modal("toggle");
                    });
                    this.basemapButton = basemapButton;


                    this.basemapGallery = new BasemapGallery({
                        showArcGISBasemaps: true,
                        map: this.map
                    }, domConstruct.create("div", {}, dom.byId("basemapGallery"), "after"));

                    this.basemapGallery.startup();

                    //Fix for basemaps so that togglebasemaps dijit will work
                    var basemapHash = {
                        "National Geographic": "national-geographic",
                        "Streets": "streets",
                        "Topographic": "topo",
                        "Imagery": "satellite",
                        "Imagery with Labels": "hybrid",
                        "Dark Gray Canvas": "dark-gray",
                        "Light Gray Canvas": "gray",
                        "Oceans": "oceans",
                        "Terrain with Labels": "terrain",
                        "OpenStreetMap": "osm"
                    };
                    var basemapTitle = result.itemInfo.itemData.baseMap.title;

                    array.forEach(result.itemInfo.itemData.baseMap.baseMapLayers, lang.hitch(this, function (bm) {
                        this.map.removeLayer(bm.layerObject);
                    }));
                    this.map.setBasemap(basemapHash[basemapTitle]);

                    //Legend Button
                    var LegendButton = domConstruct.create("div", {
                        "class": "mapButton",
                        "title": "Legend"
                    }, basemapButton, "after");
                    domConstruct.create("span", {
                        "class": "glyphicon glyphicon-list-alt",
                        "aria-hidden": true
                    }, LegendButton, "last");

                    on(LegendButton, "click", lang.hitch(this, function (event) {
                        $('#LegendModal').modal('toggle');                         
                        //$("#LegendControl").load("Legend.html");
                        //$("#LegendControl").height(400);
                        //$("#LegendControl").scroll();
                    }));
                    this.LegendButton = LegendButton;

                    //Layer Control
                    this._initLayerControl(selectedWebmap);
                    
                    //Search Control
                    this.initSearchControl();

                }
            }));
        },
        initSearchControl : function() {
            var node = domConstruct.create("div", {}, dom.byId("SearchControl"), "last");
            var searchControl = new SearchControl({
                map: this.map
            }, node);

            searchControl.startup();
            this.searchControl = searchControl;
        },
        initWebmapToggle: function () {
            //Foreach webmap in config.webmaps create dropdown li and attach handler

            var dropdownNode = dom.byId("projectToggle");
            var selectedBtn = null;

            array.forEach(config.webmaps, lang.hitch(this, function (webmap, i) {
                
                var li = domConstruct.create("li", {
                }, dropdownNode, "last");

                var aTag = domConstruct.create("a", {
                    "href": "#",
                    innerHTML : webmap.label
                }, li, "first");

                //Handle Toggle
                on(li, "click", lang.hitch(this, lang.partial(this._init, config.webmaps[i])));
                if (webmap.checked === true) {
                    selectedBtn = li;
                }
            }));
            if (selectedBtn !== null) {
                selectedBtn.click();
            }

        },
        _createShortlist: function (obj) {
            var node = domConstruct.create("div", {}, dom.byId("shortlist"), "last");
            var operationalLayers = obj.itemInfo.itemData.operationalLayers || [];

            var shortlist = new Shortlist({
                map: obj.map,
                operationalLayers : operationalLayers
            }, node);
            shortlist.startup();
            this.shortlist = shortlist;
        },
        _initLayerControl: function (selectedWebmap) {
            var node = domConstruct.create("div", {}, dom.byId("layerControl"), "last");

            var layerControl = new LayerControl({
                webmap: selectedWebmap,
                map: this.map
            }, node);

            layerControl.startup();
            this.layerControl = layerControl;
        }

    });// return
}); //define