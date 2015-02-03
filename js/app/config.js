define({
    title: "",
    subtitle: "",
    referenceLayers: [

    ],
    allConstructionLayer: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/CIPprojects/MapServer",
    pageTitle: "",
    shortlistDisplayField: "PRO_SCOPE",
    infoTemplateTitleField: "${PRO_SCOPE}",
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
                label: "CIP Drainage Projects",
                minScale: 37000,
                visible: true,
                showInLayerControl : false
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/STREET_REF/FeatureServer/0",
                label: "CIP Streets Projects",
                minScale: 37000,
                visible: true,
                showInLayerControl: false
            },        
            {
                url: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/1",
                label: "Zip Codes",
                visible: false,
                showInLayerControl: true
            },
            {
                url: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/2",
                label: "Super Neighborhood",
                visible: false,
                showInLayerControl: true
            },
            {
                url: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/3",
                label: "City Council Districts",
                visible: false,
                showInLayerControl: true
            },
            {
                url: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/4",
                label: "City Limit",
                visible: false,
                showInLayerControl: true
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
                label: "CIP Water Projects",
                minScale: 37000,
                visible: true,
                showInLayerControl: false
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/WASTEWATER_REF/FeatureServer/0",
                label: "CIP Wastewater Projects",
                minScale: 37000,
                visible: true,
                showInLayerControl: false
            },
            {
                url: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/1",
                label: "Zip Codes",
                visible: false,
                showInLayerControl: true
            },
            {
                url: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/2",
                label: "Super Neighborhood",
                visible: false,
                showInLayerControl: true
            },
            {
                url: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/3",
                label: "City Council Districts",
                visible: false,
                showInLayerControl: true
            },
            {
                url: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/4",
                label: "City Limit",
                visible: false,
                showInLayerControl: true
            }
            ],
            checked : false
        },
        {
            label: "All",
            webmapId: "9e41c704aae1454c803a3ebf236f692f",
            referenceLayers: [
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/DRAINAGE_REF/FeatureServer/0",
                label: "CIP Drainage Projects",
                minScale: 37000,
                visible: true,
                showInLayerControl: false
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/STREET_REF/FeatureServer/0",
                label: "CIP Streets Projects",
                minScale: 37000,
                visible: true,
                showInLayerControl: false
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/WATER_REF/FeatureServer/0",
                label: "CIP Water Projects",
                minScale: 37000,
                visible: true,
                showInLayerControl: false
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/WASTEWATER_REF/FeatureServer/0",
                label: "CIP Wastewater Projects",
                minScale: 37000,
                visible: true,
                showInLayerControl: false
            },
            {
                url: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/1",
                label: "Zip Codes",
                visible: false,
                showInLayerControl: true
            },
            {
                url: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/2",
                label: "Super Neighborhood",
                visible: false,
                showInLayerControl: true
            },
            {
                url: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/3",
                label: "City Council Districts",
                visible: false,
                showInLayerControl: true
            },
            {
                url: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/4",
                label: "City Limit",
                visible: false,
                showInLayerControl: true
            }
            ],
            checked: false
        }
    ]
});