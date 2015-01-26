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
    "dojo/text!application/widgets/templates/SearchControl.html",
    "esri/geometry/Point",
    "esri/SpatialReference",
    "esri/tasks/locator",
    "esri/tasks/query"
],
function (config, declare, array, lang, domConstruct, domClass, on, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, Point, SpatialReference, Locator, Query) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        layers: null,
        locator: null,
        map: null,
        searchDropdown: null,
        inputFocusHandler : null,
        searchInput : null,
        searchTypeLabel: null,
        searchTypes: {
            "ADDRESS": "ADDRESS",
            "PROJECT": "PROJECT"
        },
        searchType: "",
        searchButton: null,
        constructor: function () {
            this.inherited(arguments);
            this.layers = [];
            if (config.locatorUrl) {
                this.locator = new Locator(config.locatorUrl);
            } else {
                console.warn("No locator url supplied.")
            }            

            //Set address as default searchType
            this.searchType = this.searchTypes.ADDRESS;
        },
        startup: function () {
            //init dropdowns
            $('.dropdown-toggle').dropdown();

            var self = this;
            var searchTypeLabel = this.searchTypeLabel;

            //On click of li, update button text and searchType
            $(".searchType").on('click', function () {
                //Get text
                var text = $(this).text();
                //Update button text
                searchTypeLabel.innerHTML = text;
                //Update SearchType
                lang.hitch(self, self._updateSearchType(text.toUpperCase()));
            });

            //Handle click of search button
            $(this.searchButton).on("click", lang.hitch(this, "search"));

            $(this.searchInput).typeahead({
                ajax: {
                    url: (self.searchType === self.searchTypes.ADDRESS) ? "//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest" : "TODO, attribute url" ,
                    method: "GET",
                    triggerLength: 3,
                    displayField: (self.searchType === self.searchTypes.ADDRESS) ? "text" : config.shortlistDisplayField,
                    preDispatch: function (query) {
                        if(self.searchType === self.searchTypes.ADDRESS) {
                            return {
                                text: query,
                                f: "json",
                                dataType: "json",
                                maxLocations: 6
                            };
                        }                    
                    },
                    preProcess: function (data) {
                        if(self.searchType === self.searchTypes.ADDRESS) {
                            return data.suggestions;
                        }                        
                    },
                    dataType: "json"
                },
                display: (self.searchType === self.searchTypes.ADDRESS) ? "text" : config.shortlistDisplayField,
                val: "magicKey",
                items: 6,
                itemSelected: function (fn, magicKey, text) {
                    self._findAddress(fn, magicKey, text);
                }
            });
        },
        _updateSearchType: function (searchType) {
            this.searchType = this.searchTypes[searchType];
        },
        search: function () {
            if (this.searchType === this.searchTypes.ADDRESS) {
                this._findAddress(null, null, this.searchInput.value);
            } else if (this.searchType === this.searchTypes.PROJECT) {
                this._searchProject();
            } else {
                console.warn("Invalid search type.", this.searchType);
            }
        },
        _findAddress: function (fn, magicKey, text) {
            $.get(
                   "//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find",
                   {
                       text: text,
                       //magicKey: magicKey,
                       outSR: this.map.spatialReference.wkid,
                       f: "json"
                   },
                   lang.hitch(this, function (result) {                       
                       this._goToAddress(result);
                   }),
                   "json"
                   );
        },
        _goToAddress: function (result) {
            //Create a pt from result and zoom + center map on that point
            var loc = result.locations.length ? result.locations[0] : null;
            if (!loc) { return; }
            var pt = new Point(loc.feature.geometry.x, loc.feature.geometry.y, new SpatialReference(result.spatialReference.latestWkid));
            if (this.map.getLevel() !== 15) {
                this.map.centerAndZoom(pt, 15);
            } else {
                this.map.centerAt(pt);
            }
        },
        _searchProject: function () {
            //TODO: Clean up
            var layer = window.app.shortlist.activeLayer;
            var url = layer.url +"/query";
            console.log(url);
            console.log($(this.searchInput));
            var t = $(this.searchInput).context.value;
            var q = new Query();
            q.outFields = ["*"];
            q.returnGeometry = true;
            q.where = config.shortlistDisplayField + " LIKE '%" + t + "%'";
            console.log(t);
            layer.queryFeatures(q, function (featureSet) {
                var result;
                if (featureSet.features.length > 0) {
                    result = featureSet.features[0];
                    window.app.shortlist.selectGraphic(result);
                }
            });
        }
    });// return
}); //define