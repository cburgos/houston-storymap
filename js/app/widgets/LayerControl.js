﻿define([
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
    "dojo/text!application/widgets/templates/LayerControl.html",
    "esri/layers/FeatureLayer"
],
function (config, declare, array, lang, domConstruct, domClass, on, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, FeatureLayer) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        map: null,
        webmap: null,
        layers: null,
        constructor: function () {
            this.inherited(arguments);
            this.layers = [];
        },
        startup: function () {
            this._createInputs();
        },
        _createInputs: function () {
            //foreach reference layer create layer, add to map, and add input
            domConstruct.empty(this.layerListContainer);

            array.forEach(this.webmap.referenceLayers, lang.hitch(this, function (refLayer, i) {
                //Create layer and add to map
                var layer = new FeatureLayer(refLayer.url, {
                    visible: refLayer.visible
                });
                if (refLayer.minScale) {
                    layer.setMinScale(refLayer.minScale);
                }
                if (refLayer.maxScale) {
                    layer.setMinScale(refLayer.maxScale);
                }
                this.map.addLayer(layer, i);
                this.layers.push(layer);

                if (refLayer.showInLayerControl === true) {
                    var li = domConstruct.create("li", {
                        "class": "list-group-item"
                    }, this.layerListContainer, "last");
                    var label = domConstruct.create("label", {
                        "class": "btn btn-primary",
                        innerHTML: "&nbsp;" + refLayer.label
                    }, li, "last");
                    var input = domConstruct.create("input", {
                        "type": "checkbox",
                        "autocomplete": "off",
                        "checked": refLayer.visible,

                    }, label, "first");

                    // Handle click
                    on(input, "click", function () {
                        layer.setVisibility(!layer.visible);
                    });
                }                        
            }));
        },
        destroy: function () {
            array.forEach(this.layers, lang.hitch(this, function (layer) {
                this.map.removeLayer(layer);
            }));
            this.inherited(arguments);
        }
    });// return
}); //define