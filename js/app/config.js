define({
    title: "",
    subtitle: "",
    referenceLayers: [

    ],
    pageTitle: "",
    shortlistDisplayField: "PRO_SCOPE",
    imageField: "PROJ_IMAGE",
    webmaps : [
        {
            label: "Streets & Drainage",
            webmapId: "a44443cefef84817a83fb2b8b208cd77",
            referenceLayers: [
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/DRAINAGE_REF/FeatureServer/0",
                label: "Drainage Reference"
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/STREET_REF/FeatureServer/0",
                label: "Streets Reference"
            },
            {
                url: "http://mycity.houstontx.gov/ArcGIS/rest/services/dd/COHData_dd/MapServer/3",
                label: "City Council Districts"
            },
            {
                url: "http://mycity.houstontx.gov/ArcGIS/rest/services/dd/COHData_dd/MapServer/2",
                label: "Zip Codes"
            },
            {
                url: "http://mycity.houstontx.gov/ArcGIS/rest/services/dd/COHData_dd/MapServer/3",
                label: "City Council Districts"
            }
            ],
            checked : true

        },
        {
            label: "Water & Wastewater",
            webmapId: "42483ddf05bc43f28aee27b449da0a9b",
            referenceLayers: [
                {
                    url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/WATER_REF/FeatureServer/0",
                label: "Water Reference"
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/WASTEWATER_REF/FeatureServer/0",
                label: "Wastewater Reference"
            },
            {
                url: "http://mycity.houstontx.gov/ArcGIS/rest/services/dd/COHData_dd/MapServer/7",
                label: "Super Neighborhoods"
            },
            {
                url: "http://mycity.houstontx.gov/ArcGIS/rest/services/dd/COHData_dd/MapServer/2",
                label: "Zip Codes"
            },
            {
                url: "http://mycity.houstontx.gov/ArcGIS/rest/services/dd/COHData_dd/MapServer/3",
                label: "City Council Districts"
            }
            ],
            checked : false
        }
    ]
});