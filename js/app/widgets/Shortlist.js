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
        activeLayer : null,
        constructor : function() {
            this.inherited(arguments);

            this.operationalLayers = [];
            this.tabListItems = [];
        },
        startup: function () {
            this._createTabs();
            this.updateList();

            this.map.on("extent-change", lang.hitch(this, function () {
                this.updateList();
            }));
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
                if (operationalLayer.visibility) {
                    this.activeLayer = operationalLayer.layerObject;
                    domClass.add(li, "active");
                }
                var aTag = domConstruct.create("a", {
                    innerHTML : title
                }, li);
               
                //TODO: Handle Click of tab
                domConstruct.place(li, tabContainer, "last");
                on(li, "click", lang.hitch(this, function (event) {
                    if (domClass.contains(li, "active")) {
                        return;
                    } else {
                        array.forEach(this.operationalLayers, function (opLayer) {
                            domClass.remove(opLayer.widgetNode, "active");
                            opLayer.layerObject.hide();
                        });
                        domClass.add(li, "active");
                        operationalLayer.layerObject.show();
                        this.activeLayer = operationalLayer.layerObject;
                        this.updateList();
                    }
                }));
                //Add widgetNode property to operationalLayer
                operationalLayer.widgetNode = li;
            }));
        },
        updateList: function () {
            var row = domConstruct.create("div", {
            });
            this.activeLayer.on("update-end", lang.hitch(this, function (event) {
                array.forEach(this.activeLayer.graphics, lang.hitch(this, function (graphic) {
                    //Create thumbnails
                    var col = domConstruct.create("div", {
                        "class": "col-xs-12 col-md-4 thumbnail"
                    }, row, "last");
                    var aTag = domConstruct.create("a", {
                    }, col, "last");
                    var img = domConstruct.create("img", {
                        alt: graphic.attributes[config.shortlistDisplayField],
                        src: graphic.attributes[config.imageField]
                    }, aTag, "last");
                    var label = domConstruct.create("label", {
                        innerHTML : graphic.attributes[config.shortlistDisplayField]
                    }, img, "after");
                    //Col click
                    on(col, "click", lang.partial(lang.hitch(this, "selectGraphic"), graphic));
                }));
                domConstruct.empty(this.thumbContainer);
                domConstruct.place(row, this.thumbContainer, "last");
            }));            
        },
        selectGraphic: function (graphic, evt) {
            console.log("selecting graphic...", graphic);
            var title = graphic.attributes[config.shortlistDisplayField];
            
            //Open infowindow
            this.map.infoWindow.setTitle(title);
            //TODO: Change to use popup info from webmap
            this.map.infoWindow.setContent(graphic.getContent());
            this.map.infoWindow.show(graphic.geometry);
            //Zoom to graphic
            this.map.centerAndZoom(graphic.geometry, 15); // Will only work for points
        }

    });// return
}); //define