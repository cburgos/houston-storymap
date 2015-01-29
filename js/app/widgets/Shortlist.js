define([
    "application/config",
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojo/on",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!application/widgets/templates/Shortlist.html"
],
function (config, declare, array, lang, domConstruct, domClass, on, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        map: null,
        operationalLayers: null,
        tabListItems: null,
        activeLayer: null,
        _streetViewHandler : null, //listen for click of image
        streetViewHandler : null, //Listen for show of map infowindow
        constructor : function() {
            this.inherited(arguments);

            this.operationalLayers = [];
            this.tabListItems = [];
        },
        startup: function () {
            this._createTabs();
            this.updateList();
        },
        _createTabs: function () {
            //Foreach operational  layer, create a tab
            var tabContainer = this.tabs;
            var listItems = [];
            array.forEach(this.operationalLayers, lang.hitch(this, function (operationalLayer) {
                var title = operationalLayer.title;
                
                var li = domConstruct.create("li", {
                    "role": "presentation"
                });
                var aTag = domConstruct.create("a", {
                    innerHTML: title,
                    "role": "tab",
                    "data-toggle": "tab",
                    "style": "font-size:12px;"

                }, li);

                if (operationalLayer.visibility) {
                    this.activeLayer = operationalLayer.layerObject;
                    $(li).tab('show');
                } else {
                    $(li).tab();
                }
                domConstruct.place(li, tabContainer, "last");
                
                //TODO: Handle Click of tab
                $(aTag).on('shown.bs.tab', lang.hitch(this, function (e) {
                    this.activeLayer = operationalLayer.layerObject;
                    array.forEach(this.operationalLayers, function (opLayer) {
                        opLayer.layerObject.setVisibility(!opLayer.layerObject.visible);
                    });                    
                    this.updateList();
                }));
                //Add widgetNode property to operationalLayer
                operationalLayer.widgetNode = li;
            }));
        },
        updateList: function () {
            this.activeLayer.on("update-end", lang.hitch(this, function (event) {
                var row = domConstruct.create("div", {
                    "class": "row"
                });
                $(".thumbContainer").empty();
                array.forEach(this.activeLayer.graphics, lang.hitch(this, function (graphic) {
                    //Create thumbnails
                    var col = domConstruct.create("div", {
                        "class": "col-xs-12 col-lg-4 thumbnail"
                    }, row, "last");
                    var aTag = domConstruct.create("a", {
                    }, col, "last");
                    var img = domConstruct.create("img", {
                        alt: graphic.attributes[config.shortlistDisplayField],
                        src: graphic.attributes[config.imageField]
                    }, aTag, "last");
                    var label = domConstruct.create("label", {
                        innerHTML: graphic.attributes[config.shortlistDisplayField],
                        "style": "font-size:10px;"
                    }, img, "after");
                    //Col click
                    on(col, "click", lang.partial(lang.hitch(this, "selectGraphic"), graphic));
                }));
                $(".thumbContainer").html(row);

                //Update streetViewhandler
                if (this.streetViewHandler) {
                    this.streetViewHandler.remove();
                    this.streetViewHandler = null;
                }
                if (this._streetViewHandler) {
                    this._streetViewHandler.remove();
                    this._streetViewHandler = null;
                }
                if (this.activeLayer.name.toUpperCase().indexOf("FUTURE") >=0) {
                    this.streetViewHandler == on(this.map.infoWindow, "show", lang.hitch(this, function () {
                        var graphic = this.map.infoWindow.getSelectedFeature();
                        var x = graphic.attributes.POINT_X;
                        var y = graphic.attributes.POINT_Y;
                        var gStreeUrl = "//maps.google.com/maps?q=" + y + ", " + x + "&z=17&t=k&hl=en";
                        //this._streetViewHandler = on($(".esriPopupMediaImage"), "click", function () {
                            //window.open(gStreeUrl);
                        //});
                    }));
                }
            }));            
        },
        selectGraphic: function (graphic, evt) {
            var title = graphic.attributes[config.shortlistDisplayField];
            
            //Open infowindow
            this.map.infoWindow.setContent(graphic.getContent());
            this.map.infoWindow.show(graphic.geometry);
            //Zoom to graphic
            this.map.centerAndZoom(graphic.geometry, 15); // Will only work for points
        }

    });// return
}); //define