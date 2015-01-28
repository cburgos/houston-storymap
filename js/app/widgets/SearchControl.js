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
    "esri/tasks/QueryTask",
    "esri/tasks/query"
],
function (config, declare, array, lang, domConstruct, domClass, on, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, Point, SpatialReference, Locator, QueryTask, Query) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        layers: null,
        locator: null,
        map: null,
        searchDropdown: null,
        inputFocusHandler : null,
        searchInput : null,
        searchTypeLabel: null,
        superNeighborhoods: null,
        cityCouncilDistricts: null,
        searchTypes: {
            "ADDRESS": "ADDRESS",
            "PROJECT": "PROJECT",
            "SUPER_NEIGHBORHOOD": "SUPER_NEIGHBORHOOD",
            "CITY_COUNCIL_DISTRICTS": "CITY_COUNCIL_DISTRICTS",
        },
        searchType: "",
        searchButton: null,
        constructor: function () {
            this.inherited(arguments);
            this.layers = [];
            this.superNeighborhoods = [];
            this.cityCouncilDistricts = [];
            if (config.locatorUrl) {
                this.locator = new Locator(config.locatorUrl);
            } else {
                console.warn("No locator url supplied.")
            }            

            //Set address as default searchType
            this.searchType = this.searchTypes.ADDRESS;
        },
        _getSuperNeighborhoods : function () {
            //Get list of all possible entries from service
            //To be used for type ahead
            //SNBNAME
            var self = this;
            var qt = new QueryTask(config.superNeighborhoodService);
            var query = new Query();
            query.returnGeometry = false;
            query.where = "1=1";
            qt.execute(query, function (featureSet) {
                var suggestions = [];
                array.forEach(featureSet.features, function (feature) {
                    var suggestion = {
                        text: feature.attributes[featureSet.displayFieldName],
                        val: feature.attributes[featureSet.displayFieldName],
                        displayFieldName : featureSet.displayFieldName
                    };
                    suggestions.push(suggestion);
                });
                self.superNeighborhoods = suggestions;
            });
        },
        _getCityCouncilDistricts: function () {
            //Get list of all possible entries from service
            //To be used for type ahead
            //DISTRICT
            var self = this;
            var qt = new QueryTask(config.cityCouncilDistrictsService);
            var query = new Query();
            query.returnGeometry = false;
            query.where = "1=1";
            qt.execute(query, function (featureSet) {
                var suggestions = [];
                array.forEach(featureSet.features, function (feature) {
                    var suggestion = {
                        text: feature.attributes[featureSet.displayFieldName],
                        val: feature.attributes[featureSet.displayFieldName],
                        displayFieldName : featureSet.displayFieldName
                    };
                    suggestions.push(suggestion);
                });
                self.cityCouncilDistricts = suggestions;
            });
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

            this._getSuperNeighborhoods();
            this._getCityCouncilDistricts();

            //Init typeahead
            this.updateTypeahead();
        },
        _updateSearchType: function (searchType) {
            if (searchType.indexOf(" " > -1)) {
                var regex = new RegExp(' ', 'g');
                searchType = searchType.replace(regex, "_");
            }
            this.searchType = this.searchTypes[searchType];
            //Update type ahead
            this.updateTypeahead();
        },
        updateTypeahead: function () {
            //TODO: Is there a better way to destroy tpeahead without getting rid of whole input?
            domConstruct.destroy(this.searchInput);
            this.searchInput = domConstruct.create("input", {
                type: "text",
                "class": "form-control",
                "aria-label": "..."
            }, this.searchDropdownContainer, "after");

            if (this.searchType === this.searchTypes.ADDRESS) {
                this._addressTypeAhead();
            } else if (this.searchType === this.searchTypes.PROJECT) {
                this._projectTypeAhead();
            } else if (this.searchType === this.searchTypes.CITY_COUNCIL_DISTRICTS) {
                this._cityCouncilDistrictsTypeAhead();
            } else if (this.searchType === this.searchTypes.SUPER_NEIGHBORHOOD) {
                this._superNeighborhoodsTypeAhead();
            }
        },
        _addressTypeAhead: function () {
            var self = this;
            $(this.searchInput).typeahead({
                ajax: {
                    url:"//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest",
                    method: "GET",
                    triggerLength: 1,
                    displayField:"text",
                    preDispatch: function (query) {
                        return {
                            text: query,
                            f: "json",
                            dataType: "json",
                            maxLocations: 6
                        };                            
                    },
                    preProcess: function (data) {
                        return data.suggestions;
                    },
                    dataType: "json"
                },
                display: "text",
                val: "magicKey",
                items: 6,
                itemSelected: function (fn, magicKey, text) {
                    self._findAddress(fn, magicKey, text);
                }
            });
        },
        _projectTypeAhead: function () {
            var self = this;
            var url = window.app.shortlist.activeLayer.url + "/query";
            $(this.searchInput).typeahead({
                ajax: {
                    url: url,
                    method: "GET",
                    triggerLength: 1,
                    displayField: "text",
                    preDispatch: function (query) {
                        var whereClause = "upper(" + config.shortlistDisplayField + ") LIKE '%" + query.toUpperCase() + "%'";
                        return {
                            "where": whereClause,
                            "outFields":"*",
                            f: "json"
                        };
                    },
                    preProcess: function (data) {
                        var suggestions = [];
                        array.forEach(data.features, function (feat) {
                            var suggestion = {
                                text: feat.attributes[config.shortlistDisplayField],
                                val: feat.attributes[config.shortlistDisplayField]
                            };
                            suggestions.push(suggestion);
                        });
                        return suggestions;
                    },
                    dataType: "json"
                },
                display: "text",
                val: "val",
                items: 6,
                itemSelected: lang.hitch(self, self._projectSearch)
            });
        },
        _cityCouncilDistrictsTypeAhead: function () {
            var self = this;
            $(this.searchInput).typeahead({
                source: self.cityCouncilDistricts,
                display: "text",
                val: "text",
                items: 6,
                itemSelected: lang.hitch(self, self._cityCouncilDistrictSearch)
            });
        },
        _superNeighborhoodsTypeAhead: function () {
            var self = this;
            $(this.searchInput).typeahead({
                source : self.superNeighborhoods,
                display: "text",
                val: "text",
                items: 6,
                itemSelected: lang.hitch(self, self._superNeighborhoodsSearch)
            });
        },
        _goToLocation: function (featureSet) {
            if (featureSet.features.length > 0) {
                var feat = featureSet.features[0];
                var center;
                if (feat.geometry.type === "polygon") {
                    center = feat.geometry.getCentroid();
                } else if (feat.geometry.type === "point") {
                    center = feat.geometry;
                }
                this._zoomToPoint(center);
            }
        },
        _zoomToPoint: function (pt) {
            //Zoom and center map at a given pt
            if (this.map.getLevel() !== 15) {
                this.map.centerAndZoom(pt, 15);
            } else {
                this.map.centerAt(pt);
            }
        },
        search: function () {
            if (this.searchType === this.searchTypes.ADDRESS) {
                this._findAddress(null, null, this.searchInput.value);
            } else if (this.searchType === this.searchTypes.PROJECT) {
                this._projectSearch(null, null, this.searchInput.value);
            } else if (this.searchType === this.searchTypes.CITY_COUNCIL_DISTRICTS) {
                this._cityCouncilDistrictSearch(null, null, this.searchInput.value);
            } else if (this.searchType === this.searchTypes.SUPER_NEIGHBORHOOD) {
                this._superNeighborhoodsSearch(null, null, this.searchInput.value);
            } else {
                console.warn("Invalid search type.", this.searchType);
            }
        },
        _cityCouncilDistrictSearch: function (fn, val, text) {
            var qt = new QueryTask(config.cityCouncilDistrictsService);
            var q = new Query();
            q.where = "DISTRICT ='" + val + "'";
            q.returnGeometry = true;
            q.outSpatialReference = this.map.spatialReference;
            qt.execute(q, lang.hitch(this, this._goToLocation));
        },
        _superNeighborhoodsSearch: function (fn, val, text) {
            var qt = new QueryTask(config.superNeighborhoodService);
            var q = new Query();
            q.where = "SNBNAME ='" + val + "'";
            q.returnGeometry = true;
            q.outSpatialReference = this.map.spatialReference;
            qt.execute(q, lang.hitch(this, this._goToLocation));
        },
        _projectSearch: function (fn, val, text) {
            var url = window.app.shortlist.activeLayer.url + "/query";
            var qt = new QueryTask(url);
            var q = new Query();
            q.where = config.shortlistDisplayField + "='" + val + "'";
            q.returnGeometry = true;
            q.outSpatialReference = this.map.spatialReference;
            qt.execute(q, lang.hitch(this, this._goToLocation));
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
            this._zoomToPoint(pt);
        }
    });// return
}); //define