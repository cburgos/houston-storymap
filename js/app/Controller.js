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
    "esri/symbols/PictureMarkerSymbol"
],
function (declare, lang, array, domClass, domConstruct, dom, on, Map, BootstrapMap, Shortlist, LayerControl, SearchControl, config, BasemapToggle, Point, webMercatorUtils, Graphic, GraphicsLayer, PictureMarkerSymbol) {
    return declare(null, {
        map: null,
        shortlist : null,
        startup: function () {
            this.init();
        },
        init: function () {
            //Init splash
            $("#splash").modal("show");

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
            if (this.layerControl) {
                this.layerControl.destroy();
            }
            if (this.searchControl) {
                this.searchControl.destroy();
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

                    //Basemap Toggle
                    var basemapToggle = new BasemapToggle({
                        theme: "basemapToggle",
                        map: this.map,
                        visible: true,
                        basemap: "hybrid"
                    }, domConstruct.create("div", {}, locateBtn, "after"));
                    basemapToggle.startup();
                    this.basemapToggle = basemapToggle;

                    //Fix for basemaps so that togglebasemaps dijit will work
                    //TODO: Add all ESRI basemap strings

                    var basemapHash = {
                        "National Geographic": "national-geographic",
                        "Streets": "streets"
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