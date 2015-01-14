define([
    "dojo/_base/declare",
    "esri/map",
    "application/widgets/bootstrapmap"
],
function (declare, Map, BootstrapMap) {
    return declare(null, {
        startup: function () {
            console.log("app startup...");
        },
        initMap: function () {
            var map = BootstrapMap.create("mapDiv", {
                basemap: "national-geographic",
                center: [-122.45, 37.77],
                zoom: 12
            });
        }

    });// return
}); //define