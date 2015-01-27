define({
    title: "",
    subtitle: "",
    referenceLayers: [

    ],
    pageTitle: "",
    shortlistDisplayField: "PRO_SCOPE",
    imageField: "PROJ_IMAGE",
    locatorUrl : "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
    webmaps : [
        {
            label: "Streets & Drainage",
            webmapId: "a44443cefef84817a83fb2b8b208cd77",
            referenceLayers: [
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/DRAINAGE_REF/FeatureServer/0",
                label: "CIP Drainage Projects",
                LegendURL: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/STREET_AND_DRAINAGE_COMPLETED_PT/MapServer/0/images/00f51468174bfc7ff1e07575e09b35ca"
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/STREET_REF/FeatureServer/0",
                label: "CIP Streets Projects",
                LegendURL: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/STREET_AND_DRAINAGE_COMPLETED_PT/MapServer/0/images/00f51468174bfc7ff1e07575e09b35ca"
            },
            {
                 url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/WATER_REF/FeatureServer/0",
                 label: "CIP Water Projects",
                 LegendURL: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/STREET_AND_DRAINAGE_COMPLETED_PT/MapServer/0/images/00f51468174bfc7ff1e07575e09b35ca"
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/WASTEWATER_REF/FeatureServer/0",
                label: "CIP Wastewater Projects",
                LegendURL: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/STREET_AND_DRAINAGE_COMPLETED_PT/MapServer/0/images/00f51468174bfc7ff1e07575e09b35ca"
            },            
            {
                url: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/1",
                label: "Zip Codes",
                LegendURL: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/STREET_AND_DRAINAGE_COMPLETED_PT/MapServer/0/images/00f51468174bfc7ff1e07575e09b35ca"
            },
            {
                url: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/2",
                label: "Super Neighborhood",
                LegendURL: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/STREET_AND_DRAINAGE_COMPLETED_PT/MapServer/0/images/00f51468174bfc7ff1e07575e09b35ca"
            },
            {
                url: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/3",
                label: "City Council Districts",
                LegendURL: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/STREET_AND_DRAINAGE_COMPLETED_PT/MapServer/0/images/00f51468174bfc7ff1e07575e09b35ca"
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
                label: "CIP Drainage Projects",
                LegendURL: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/STREET_AND_DRAINAGE_COMPLETED_PT/MapServer/0/images/00f51468174bfc7ff1e07575e09b35ca"
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/STREET_REF/FeatureServer/0",
                label: "CIP Streets Projects",
                LegendURL: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/STREET_AND_DRAINAGE_COMPLETED_PT/MapServer/0/images/00f51468174bfc7ff1e07575e09b35ca"
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/WATER_REF/FeatureServer/0",
                label: "CIP Water Projects",
                LegendURL: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/STREET_AND_DRAINAGE_COMPLETED_PT/MapServer/0/images/00f51468174bfc7ff1e07575e09b35ca"
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/WASTEWATER_REF/FeatureServer/0",
                label: "CIP Wastewater Projects",
                LegendURL: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/STREET_AND_DRAINAGE_COMPLETED_PT/MapServer/0/images/00f51468174bfc7ff1e07575e09b35ca"
            },
            {
                url: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/1",
                label: "Zip Codes",
                LegendURL: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/STREET_AND_DRAINAGE_COMPLETED_PT/MapServer/0/images/00f51468174bfc7ff1e07575e09b35ca"
            },
            {
                url: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/2",
                label: "Super Neighborhood",
                LegendURL: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/STREET_AND_DRAINAGE_COMPLETED_PT/MapServer/0/images/00f51468174bfc7ff1e07575e09b35ca"
            },
            {
                url: "http://www.gims.houstontx.gov/ArcGIS/rest/services/Reference/MapServer/3",
                label: "City Council Districts",
                LegendURL: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/STREET_AND_DRAINAGE_COMPLETED_PT/MapServer/0/images/00f51468174bfc7ff1e07575e09b35ca"
            }
            ],
            checked : false
        }
    ]
});