define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
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
    "esri/dijit/BasemapToggle",
    "esri/geometry/Point",
    "esri/geometry/webMercatorUtils",
    "esri/graphic",
    "esri/layers/GraphicsLayer",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/symbols/PictureMarkerSymbol"
],
function (declare, lang, array, domClass, domConstruct, dom, on, Map, BootstrapMap, Shortlist, LayerControl, SearchControl, config, BasemapToggle, Point, webMercatorUtils, Graphic, GraphicsLayer, ArcGISDynamicMapServiceLayer, PictureMarkerSymbol) {
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
            if (this.basemapToggle) {
                this.basemapToggle.destroy();
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
             if (this.layerControl) {
                this.layerControl.destroy();
             }
             if (this.allConstructionLayer) {
                 this.allConstructionLayer.destroy();
             }
        },
        _init: function (selectedWebmap) {
            this._cleanup();

            //Init Map
            
            var mapReq = BootstrapMap.createWebMap(selectedWebmap.webmapId, "mapDiv", {
                mapOptions: {
                    slider: true,
                    wrapAround180: false
                }
            });
            mapReq.then(lang.hitch(this, function (result) {
                if (result.map) {
                    this.map = result.map;
                    this.map.enableScrollWheelZoom();

                    //customize infowindow
                    this.map.infoWindow.titleInBody = false;

                    this._createShortlist(result);

                    //slider titles
                    $(".esriSimpleSliderIncrementButton").prop("title", "Zoom In");
                    $(".esriSimpleSliderDecrementButton").prop("title", "Zoom Out");

                  
                    //Home Button
                    var homeExtent = result.map.extent;
                    var homeBtn = domConstruct.create("div", {
                        "class": "homeButton",
                        "title": "Default Extent"
                    }, dom.byId("mapDiv_zoom_slider"), "after");
                    var homeImg = domConstruct.create("img", {
                        src: "images/ZoomHome.png"
                    }, homeBtn, "last");

                    on(homeBtn, "click", lang.hitch(this, function (event) {
                        this.map.setExtent(homeExtent);
                    }));
                    this.homeBtn = homeBtn;

                    //Locate Button
                    var locateBtn = domConstruct.create("div", {
                        "class": "locateButton",
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
                        "class": "dataLayer",
                        "title": "Data Layer"
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
                    //Data Layer Button
                    var toggleProjectsButton = domConstruct.create("div", {
                        "class": "toggleProjectsButton",
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
                        "class": "infoButton",
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
                        "class": "infoButton",
                        "title": "More Information"
                    }, allConstructionButton, "after");
                    domConstruct.create("span", {
                        "class": "glyphicon glyphicon-question-sign",
                        "aria-hidden": true
                    }, infoButton, "last");

                    on(infoButton, "click",  function (event) {
                        $("#splash").modal("toggle");
                    });
                    this.infoButton = infoButton;


                    //Basemap Toggle
                    var basemapToggle = new BasemapToggle({
                        theme: "basemapToggle",
                        map: this.map,
                        visible: true,
                        basemap: "hybrid"
                    }, domConstruct.create("div", {}, infoButton, "after"));
                    basemapToggle.startup();
                    this.basemapToggle = basemapToggle;

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
            //Foreach webmap in config.webmaps create radio button and attach handler
            var buttonGroupNode = dom.byId("projectToggle");
            var selectedBtn = null;

            array.forEach(config.webmaps, lang.hitch(this, function (webmap, i) {
                
                var label = domConstruct.create("label", {
                    "class": "btn btn-primary",
                    innerHTML: webmap.label
                }, buttonGroupNode, "last");

                var input = domConstruct.create("input", {
                    "type": "radio",
                    "name": "webmaps",
                    "autocomplete": "off"
                }, label, "first");

                //Handle Toggle
                on(label, "click", lang.hitch(this, lang.partial(this._init, config.webmaps[i])));
                if (webmap.checked === true) {
                    selectedBtn = label;
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