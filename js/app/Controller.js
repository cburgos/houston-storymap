define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/dom-construct",
    "dojo/dom",
    "dojo/on",
    "dojo/query",
    "esri/map",
    "application/widgets/bootstrapmap",
    "application/widgets/Shortlist",
    "application/config",
    "esri/dijit/BasemapToggle",
    "esri/geometry/Point",
    "esri/geometry/webMercatorUtils",
    "esri/graphic",
    "esri/layers/GraphicsLayer",
    "esri/symbols/PictureMarkerSymbol",
    "bootstrap/Modal"
],
function (declare, lang, array, domConstruct, dom, on, query, Map, BootstrapMap, Shortlist, config, BasemapToggle, Point, webMercatorUtils, Graphic, GraphicsLayer, PictureMarkerSymbol, Modal) {
    return declare(null, {
        startup: function () {
            this.init();
        },
        init: function () {
            //Init splash
            query("#splash").modal("show");

            //Init Map
            var mapReq = BootstrapMap.createWebMap(config.webmapId, "mapDiv", {
                mapOptions: {
                    slider: true,
                    wrapAround180: false
                }
            });
            mapReq.then(lang.hitch(this, function (result) {
                console.log(result);
                if (result.map) {
                    this.map = result.map;
                    this.map.enableScrollWheelZoom();

                    this._createShortlist(result);

                    //Home Button
                    var homeExtent = result.map.extent;
                    var homeBtn = domConstruct.create("div", {
                        "class": "homeButton"
                    }, dom.byId("mapDiv_zoom_slider"), "after");
                    var homeImg = domConstruct.create("img", {
                        src: "images/ZoomHome.png"
                    }, homeBtn, "last");

                    on(homeBtn, "click", lang.hitch(this, function (event) {
                        this.map.setExtent(homeExtent);
                    }));

                    //Locate Button
                    var locateBtn = domConstruct.create("div", {
                        "class": "locateButton"
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
		                        query('#locateLayer_layer image').hide();
		                    }, 10000);
                        }));
                    }));

                    //Basemap Toggle
                    var basemapToggle = new BasemapToggle({
                        theme: "basemapToggle",
                        map: this.map,
                        visible: true,
                        basemap: "satellite"
                    }, domConstruct.create("div", {}, dojo.byId("mapDiv_zoom_slider"), "after"));
                    basemapToggle.startup();

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
                }
                if (result.itemInfo.item.title) {
                    config.title = result.itemInfo.item.title;
                }
            }));
        },
        _createShortlist: function (obj) {
            console.log(obj);
            var operationalLayers = obj.itemInfo.itemData.operationalLayers || [];

            var shortlist = new Shortlist({
                map: obj.map,
                operationalLayers : operationalLayers
            }, "shortlist");
            shortlist.startup();
        }

    });// return
}); //define