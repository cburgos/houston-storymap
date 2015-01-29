define({
    title: "",
    subtitle: "",
    referenceLayers: [

    ],
    pageTitle: "",
    shortlistDisplayField: "PRO_SCOPE",
    imageField: "PROJ_IMAGE",
    locatorUrl: "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
    cityCouncilDistrictsService: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/3",
    superNeighborhoodService: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/2",
    webmaps : [
        {
            label: "Streets & Drainage", 
            webmapId: "a44443cefef84817a83fb2b8b208cd77",
            referenceLayers: [
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/DRAINAGE_REF/FeatureServer/0",
                label: "CIP Drainage Projects"
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/STREET_REF/FeatureServer/0",
                label: "CIP Streets Projects"
            },
            {
                 url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/WATER_REF/FeatureServer/0",
                 label: "CIP Water Projects"
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/WASTEWATER_REF/FeatureServer/0",
                label: "CIP Wastewater Projects"
            },            
            {
                url: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/1",
                label: "Zip Codes"
            },
            {
                url: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/2",
                label: "Super Neighborhood"
            },
            {
                url: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/3",
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
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/DRAINAGE_REF/FeatureServer/0",
                label: "CIP Drainage Projects"
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/STREET_REF/FeatureServer/0",
                label: "CIP Streets Projects"
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/WATER_REF/FeatureServer/0",
                label: "CIP Water Projects"
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/WASTEWATER_REF/FeatureServer/0",
                label: "CIP Wastewater Projects"
            },
            {
                url: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/1",
                label: "Zip Codes"
            },
            {
                url: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/2",
                label: "Super Neighborhood"
            },
            {
                url: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/3",
                label: "City Council Districts"
            }
            ],
            checked : false
        },
        {
            label: "Both",
            webmapId: "9e41c704aae1454c803a3ebf236f692f",
            referenceLayers: [
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/DRAINAGE_REF/FeatureServer/0",
                label: "CIP Drainage Projects"
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/STREET_REF/FeatureServer/0",
                label: "CIP Streets Projects"
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/WATER_REF/FeatureServer/0",
                label: "CIP Water Projects"
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/WASTEWATER_REF/FeatureServer/0",
                label: "CIP Wastewater Projects"
            },
            {
                url: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/1",
                label: "Zip Codes"
            },
            {
                url: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/2",
                label: "Super Neighborhood"
            },
            {
                url: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/3",
                label: "City Council Districts"
            }
            ],
            checked: false
        }
    ]
});