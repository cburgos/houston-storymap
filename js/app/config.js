define({
    title: "",
    subtitle: "",
    referenceLayers: [

    ],
    allConstructionLayer: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/CIPprojects/MapServer",
    pageTitle: "",
    ProjectNo: "CIP_NO",
    shortlistDisplayField: "PRO_SCOPE",
    infoTemplateTitleField: "${PRO_SCOPE}",
    imageField: "PROJ_IMAGE",
    locatorUrl: "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
    cityCouncilDistrictsService: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/DATA_LAYER_REF/MapServer/2",
    superNeighborhoodService: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/DATA_LAYER_REF/MapServer/1",
    webmaps : [
        {
            label: "STREETS & DRAINAGE ", 
            webmapId: "789810ac2998407d8cfc688173134200",
            referenceLayers: [
			{
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD_RBH/REF_NEED/MapServer/0",
                label: "Storm Need Areas",
                visible: false,
                showInLayerControl: true
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD_RBH/REF_NEED/MapServer/1",
                label: "Local Street Need Areas",
                visible: false,
                showInLayerControl: true
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD_RBH/REF_NEED/MapServer/2",
                label: "Major Thoroughfare Need Areas",
                visible: false,
                showInLayerControl: true
            },
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
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/DATA_LAYER_REF/MapServer/0",
                label: "Zip Codes",
                visible: false,
                showInLayerControl: true
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/DATA_LAYER_REF/MapServer/1",
                label: "Super Neighborhood",
                visible: false,
                showInLayerControl: true
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/DATA_LAYER_REF/MapServer/2",
                label: "City Council Districts",
                visible: false,
                showInLayerControl: true
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/DATA_LAYER_REF/MapServer/1",
                label: "City Limit",
                visible: false,
                showInLayerControl: true
            }
            ],
            checked : true

        },
        {
            label: "WATER & WASTEWATER ",
            webmapId: "3e44f69d92fb439aab58a84055f5b10c",
            referenceLayers: [
			{
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD_RBH/REF_NEED/MapServer/0",
                label: "Storm Need Areas",
                visible: false,
                showInLayerControl: true
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD_RBH/REF_NEED/MapServer/1",
                label: "Local Street Need Areas",
                visible: false,
                showInLayerControl: true
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD_RBH/REF_NEED/MapServer/2",
                label: "Major Thoroughfare Need Areas",
                visible: false,
                showInLayerControl: true
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
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/DATA_LAYER_REF/MapServer/0",
                label: "Zip Codes",
                visible: false,
                showInLayerControl: true
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/DATA_LAYER_REF/MapServer/1",
                label: "Super Neighborhood",
                visible: false,
                showInLayerControl: true
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/DATA_LAYER_REF/MapServer/2",
                label: "City Council Districts",
                visible: false,
                showInLayerControl: true
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/DATA_LAYER_REF/MapServer/1",
                label: "City Limit",
                visible: false,
                showInLayerControl: true
            }
            ],
            checked : false
        },
        {

            label: "ALL ",
            webmapId: "0c93ab9fc4be41f8889d87f79699dde4",
            referenceLayers: [            
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD_RBH/REF_NEED/MapServer/0",
                label: "Storm Need Areas",
                visible: false,
                showInLayerControl: true
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD_RBH/REF_NEED/MapServer/1",
                label: "Local Street Need Areas",
                visible: false,
                showInLayerControl: true
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD_RBH/REF_NEED/MapServer/2",
                label: "Major Thoroughfare Need Areas",
                visible: false,
                showInLayerControl: true
            },
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
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/DATA_LAYER_REF/MapServer/0",
                label: "Zip Codes",
                visible: false,
                showInLayerControl: true
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/DATA_LAYER_REF/MapServer/1",
                label: "Super Neighborhood",
                visible: false,
                showInLayerControl: true
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/DATA_LAYER_REF/MapServer/2",
                label: "City Council Districts",
                visible: false,
                showInLayerControl: true
            },
            {
                url: "http://pwegis.houstontx.gov/arcgis/rest/services/PROD/DATA_LAYER_REF/MapServer/1",
                label: "City Limit",
                visible: false,
                showInLayerControl: true
            }
            ],
            checked: false
        }
    ]
});