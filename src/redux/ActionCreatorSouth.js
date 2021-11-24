import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";

/* setDefaultOptions({ version: '4.21' }) */

export const fetchCustomer = () => (dispatch) => {

    dispatch(customerLoading(true));
    
    return fetch(baseUrl + '/southCPE.geojson')
    .then(response => {
        if(response.ok){
            return response
        }
        else{
            var error = new Error('Error' + response.status + ':' + response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message)
        throw errmess
    })
    .then(response => response.json())
    .then(customer => dispatch(addCustomer(customer)))
    .catch(error => dispatch(customerFailed(error.message)))
    
}

export const customerLoading = () => ({
    type: ActionTypes.Customer_LOADING
});

export const customerFailed = (errmess) => ({
    type: ActionTypes.Customer_FAILED,
    payload: errmess
});

export const addCustomer = (customer) => {

    const blob = new Blob([JSON.stringify(customer)], {
        type: "application/json"
      });

    const url = URL.createObjectURL(blob);

        let customers = new GeoJSONLayer({
            url: url,
            title:"South Customer",
            //minScale: 20000,
            labelsVisible: false,
            outFields:["*"],
            popupTemplate: {
                title: "Customer",
                content: [{
                    type: "fields",
                    fieldInfos: [{
                        fieldName: "name",
                        visible: true,
                        label: "Name",
                        format: {
                            digitSeparator: false,
                            places: 0
                        }
                    }, {
                        fieldName: "id",
                        visible: true,
                        label: "ID",
                    },{
                        fieldName: "address",
                        visible: true,
                        label: "Address",
                    },{
                        fieldName: "type",
                        visible: true,
                        label: "Type",
                    },{
                        fieldName: "block_phase_sector",
                        visible: true,
                        label: "Block/Phase",
                    },{
                        fieldName: "area",
                        visible: true,
                        label: "Town/Area",
                    },{
                        fieldName: "city",
                        visible: true,
                        label: "City",
                    },/* {
                        fieldName: "fat",
                        visible: true,
                        label: "FAT",
                    }, {
                        fieldName: "dc_odb",
                        visible: true,
                        label: "DC/ODB",
                    }, {
                        fieldName: "pop_id",
                        visible: true,
                        label: "POP",
                    },*/ {
                        fieldName: "olt",
                        visible: true,
                        label: "OLT",
                    },{
                        fieldName: "frame",
                        visible: true,
                        label: "Frame",
                    },{
                        fieldName: "slot",
                        visible: true,
                        label: "Slot",
                    },{
                        fieldName: "port",
                        visible: true,
                        label: "Port",
                    },{
                        fieldName: "ontid",
                        visible: true,
                        label: "ONT ID",
                    }, {
                        fieldName: "ontmodel",
                        visible: true,
                        label: "ONT Model",
                    },{
                        fieldName: "alarminfo",
                        visible: true,
                        label: "Alarm Info",
                    },{
                        fieldName: "bandwidth",
                        visible: true,
                        label: "Bandwidth",
                    }, {
                        fieldName: "lastuptime",
                        visible: true,
                        label: "Last-UP-Time",

                    },{
                        fieldName: "lastdowntime",
                        visible: true,
                        label: "Last-Down-Time",
                        /*  format:{
                            dateFormat:"day-short-month-year-long-time"
                        } */

                    }]
                }]
            }
        })
        
        
    return {
        type: ActionTypes.ADD_Customer,
        payload: customers
    }
    
}

                /**************** ZONE LAYER**************** */

export const fetchZone = () => (dispatch) => {

    dispatch(zoneLoading(true));
    
    return fetch(baseUrl + '/southZone.geojson')
    .then(response => {
        if(response.ok){
            return response
        }
        else{
            var error = new Error('Error' + response.status + ':' + response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message)
        throw errmess
    })
    .then(response => response.json())
    .then(zone => dispatch(addZone(zone)))
    .catch(error => dispatch(zoneFailed(error.message)))
    
}

export const zoneLoading = () => ({
    type: ActionTypes.SOUTH_ZONE_LOADING
});

export const zoneFailed = (errmess) => ({
    type: ActionTypes.SOUTH_ZONE_FAILED,
    payload: errmess
});

export const addZone = (zone) => {

    const blob = new Blob([JSON.stringify(zone)], {
        type: "application/json"
      });

    const url = URL.createObjectURL(blob);

    let zoneData = new GeoJSONLayer({
        url: url,
        title:"South Zone",
        //minScale: 20000,
        labelsVisible: false,
        outFields:["*"]
    })
                
    return {
        type: ActionTypes.ADD_SOUTH_ZONE,
        payload: zoneData
    }
    
}

        /****************** POP LAYER *****************************/

export const fetchPOP = () => (dispatch) => {

    dispatch(POPLoading(true));

    return fetch(baseUrl + '/southPOP.geojson')
    .then(response => {
        if(response.ok){
            return response
        }
        else{
            var error = new Error('Error' + response.status + ':' + response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message)
        throw errmess
    })
    .then(response => response.json())
    .then(pop => dispatch(addPOP(pop)))
    .catch(error => dispatch(POPFailed(error.message)))
    
}

export const POPLoading = () => ({
    type: ActionTypes.South_POP_LOADING
});

export const POPFailed = (errmess) => ({
    type: ActionTypes.South_POP_FAILED,
    payload: errmess
});

export const addPOP = (pop) => {
    
    const blob = new Blob([JSON.stringify(pop)], {
        type: "application/json"
        });

    const url = URL.createObjectURL(blob);


    const popData = new GeoJSONLayer({
        url: url,
        title: "POP",
        labelsVisible: false,
        popupTemplate: {
            title: "POP",
            content: [{
                type: "fields",
                fieldInfos: [{
                    fieldName: "name",
                    visible: true,
                    label: "Name",
                    format: {
                        digitSeparator: false,
                        places: 0
                    }
                }, {
                    fieldName: "id",
                    visible: true,
                    label: "ID",
                },{
                    fieldName: "plot",
                    visible: true,
                    label: "Plot",
                },{
                    fieldName: "street",
                    visible: true,
                    label: "Street",
                },{
                    fieldName: "area",
                    visible: true,
                    label: "Area/Town",
                },{
                    fieldName: "block_phase_sector",
                    visible: true,
                    label: "block/Phase",
                }]
            }]
        }
    })

    return {
    type: ActionTypes.South_ADD_POP,
    payload: popData
    }

};


            /****************** FEEDER FIBER LAYER *****************************/

export const south_fetchFeeder = () => (dispatch) => {

    dispatch(south_feederLoading(true));

    return fetch(baseUrl + '/southOFCFeeder.geojson')
    .then(response => {
        if(response.ok){
            return response
        }
        else{
            var error = new Error('Error' + response.status + ':' + response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message)
        throw errmess
    })
    .then(response => response.json())
    .then(fiber => dispatch(south_addFeeder(fiber)))
    .catch(error => dispatch(south_feederFailed(error.message)))
    
}

export const south_feederLoading = () => ({
    type: ActionTypes.South_Feeder_LOADING
});

export const south_feederFailed = (errmess) => ({
    type: ActionTypes.South_Feeder_FAILED,
    payload: errmess
});

export const south_addFeeder = (fiber) => {
    const blob = new Blob([JSON.stringify(fiber)], {
        type: "application/json"
      });

    const url = URL.createObjectURL(blob);
            
    let fiberData = new GeoJSONLayer({
        url: url,
        title: "South Fiber OFC",
        //renderer: rendererCheck,
        //minScale: 20000,
        /* spatialReference: view.spatialReference, */
        popupTemplate: {
            title: "Feeder",
            content: [{
                type: "fields",
                fieldInfos: [{
                    fieldName: "cable_id",
                    visible: true,
                    label: "ID",
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                },{
                    fieldName: "capacity",
                    visible: true,
                    label: "Capacity"
                },{
                    fieldName: "pop_id",
                    visible: true,
                    label: "POP ID",
                    format: {
                        digitSeparator: false,
                        places: 0
                    }
                }, {
                    fieldName: "placement",
                    visible: true,
                    label: "Placement"
                },{
                    fieldName: "network",
                    visible: true,
                    label: "Network"
                },{
                    fieldName: "type",
                    visible: true,
                    label: "Type",
                },{
                    fieldName: "starting_point",
                    visible: true,
                    label: "Starting Point",
                },{
                    fieldName: "ending_point",
                    visible: true,
                    label: "Ending Point"
                },{
                    fieldName: "Town",
                    visible: true,
                    label: "Area"
                },{
                    fieldName: "city",
                    visible: true,
                    label: "City"
                }]
            }]
        }
    })

    return {
    type: ActionTypes.South_ADD_Feeder,
    payload: fiberData
    }
};

    /******************* SOUTH Distribution LAYER **********************/

export const south_fetchDistribution = () => (dispatch) => {

    dispatch(south_DistributionLoading(true));

    return fetch(baseUrl + '/southOFCDistribution.geojson')
    .then(response => {
        if(response.ok){
            return response
        }
        else{
            var error = new Error('Error' + response.status + ':' + response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message)
        throw errmess
    })
    .then(response => response.json())
    .then(distribution => dispatch(south_addDistribution(distribution)))
    .catch(error => dispatch(south_DistributionFailed(error.message)))
    
}

export const south_DistributionLoading = () => ({
    type: ActionTypes.South_Distribution_LOADING
});

export const south_DistributionFailed = (errmess) => ({
    type: ActionTypes.South_Distribution_FAILED,
    payload: errmess
});

export const south_addDistribution = (distribution) => {
    const blob = new Blob([JSON.stringify(distribution)], {
        type: "application/json"
        });

    const url = URL.createObjectURL(blob);
            
            let distributionData = new GeoJSONLayer({
                url: url,
                title: "South Distribution OFC",
                minScale: 9050,

                popupTemplate: {
                    title: "Feeder",
                    content: [{
                        type: "fields",
                        fieldInfos: [{
                            fieldName: "cable_id",
                            visible: true,
                            label: "ID",
                            format: {
                                digitSeparator: true,
                                places: 0
                            }
                        },{
                            fieldName: "capacity",
                            visible: true,
                            label: "Capacity"
                        },{
                            fieldName: "pop_id",
                            visible: true,
                            label: "POP ID",
                            format: {
                                digitSeparator: false,
                                places: 0
                            }
                        }, {
                            fieldName: "placement",
                            visible: true,
                            label: "Placement"
                        },{
                            fieldName: "network",
                            visible: true,
                            label: "Network"
                        },{
                            fieldName: "type",
                            visible: true,
                            label: "Type",
                        },{
                            fieldName: "starting_point",
                            visible: true,
                            label: "Starting Point",
                        },{
                            fieldName: "ending_point",
                            visible: true,
                            label: "Ending Point"
                        },{
                            fieldName: "Town",
                            visible: true,
                            label: "Area"
                        },{
                            fieldName: "city",
                            visible: true,
                            label: "City"
                        }]
                    }]
                }
            })


        return {
        type: ActionTypes.South_ADD_Distribution,
        payload: distributionData
        }
};

        /********************* DC LAYER *****************************/

export const fetchDC = () => (dispatch) => {

    dispatch(DCLoading(true));

    return fetch(baseUrl + '/southDC.geojson')
    .then(response => {
        if(response.ok){
            return response
        }
        else{
            var error = new Error('Error' + response.status + ':' + response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message)
        throw errmess
    })
    .then(response => response.json())
    .then(dc_odb => dispatch(addDC(dc_odb)))
    .catch(error => dispatch(DCFailed(error.message)))
    
}

export const DCLoading = () => ({
    type: ActionTypes.DC_LOADING
});

export const DCFailed = (errmess) => ({
    type: ActionTypes.DC_FAILED,
    payload: errmess
});

export const addDC = (dc_odb) => {

    const blob = new Blob([JSON.stringify(dc_odb)], {
        type: "application/json"
      });

    const url = URL.createObjectURL(blob);

    let dc = new GeoJSONLayer({
        url: url,
        title: "South ODB/DC",
        minScale: 36112,
        labelsVisible: false,
        //spatialReference: view.spatialReference,
        popupTemplate: {
            title: "ODB/DC",
            content: [{
                type: "fields",
                fieldInfos: [{
                    fieldName: "name",
                    visible: true,
                    label: "Name",
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                }, {
                    fieldName: "id",
                    visible: true,
                    label: "ID",
                    format: {
                        digitSeparator: false,
                        places: 0
                    }
                }, {
                    fieldName: "pop_id",
                    visible: true,
                    label: "POP ID",
                    format: {
                        digitSeparator: false,
                        places: 0
                    }
                }, {
                    fieldName: "placement",
                    visible: true,
                    label: "Placement"
                },{
                    fieldName: "plot",
                    visible: true,
                    label: "Plot"
                }, {
                    fieldName: "area",
                    visible: true,
                    label: "Area",
                },{
                    fieldName: "block_phase_sector",
                    visible: true,
                    label: "Sub Area",
                },{
                    fieldName: "city",
                    visible: true,
                    label: "City",
                },{
                    fieldName: "capacity",
                    visible: true,
                    label: "Capacity"
                },{
                    fieldName: "Splitter_Type",
                    visible: true,
                    label: "Splitter"
                },{
                    fieldName: "splitter_count",
                    visible: true,
                    label: "Splitter Count"
                }]
            }]
        }
    })

         
    return {
    type: ActionTypes.ADD_DC,
    payload: dc
    }

};


                /********************* FAT LAYER *****************************/
                
export const fetchFAT = () => (dispatch) => {

    dispatch(FATLoading(true));

    return fetch(baseUrl + '/southFAT.geojson')
    .then(response => {
        if(response.ok){
            return response
        }
        else{
            var error = new Error('Error' + response.status + ':' + response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message)
        throw errmess
    })
    .then(response => response.json())
    .then(fat => dispatch(addFAT(fat)))
    .catch(error => dispatch(FATFailed(error.message)))
    
}

export const FATLoading = () => ({
    type: ActionTypes.FAT_LOADING
});

export const FATFailed = (errmess) => ({
    type: ActionTypes.FAT_FAILED,
    payload: errmess
});

export const addFAT = (fat) => {

    const blob = new Blob([JSON.stringify(fat)], {
        type: "application/json"
      });

    const url = URL.createObjectURL(blob);

        let fatData = new GeoJSONLayer({
            url: url,
            title: "South FAT",
            minScale: 9050,
            labelsVisible: false,
            /* spatialReference: view.spatialReference, */
           popupTemplate: {
                title: "FAT",
                content: [{
                    type: "fields",
                    fieldInfos: [{
                        fieldName: "name",
                        visible: true,
                        label: "Name",
                        format: {
                            digitSeparator: false,
                            places: 0
                        }
                    }, {
                        fieldName: "id",
                        label: "ID",
                        visible: true,
                        format: {
                            digitSeparator: false,
                            places: 0
                        }
                    }, {
                        fieldName: "dc_id",
                        visible: true,
                        label: "DC ID",

                    }, {
                        fieldName: "pop_id",
                        label: "POP ID",
                        format: {
                            digitSeparator: false,
                            places: 0
                        }
                    },{
                        fieldName: "placement",
                        visible:true,
                        label: "Placement"
                    },{
                        fieldName: "splitter",
                        label: "Splitter Type",
                        format: {
                            digitSeparator: false,
                            places: 0
                        }
                    },{
                        fieldName: "plot",
                        label: "Plot",
                        format: {
                            digitSeparator: false,
                            places: 0
                        }
                    },{
                        fieldName: "area",
                        label: "Area",
                        format: {
                            digitSeparator: false,
                            places: 0
                        }
                    },{
                        fieldName: "block_phase_sector",
                        label: "Sub Area",
                        format: {
                            digitSeparator: false,
                            places: 0
                        }
                    },{
                        fieldName: "city",
                        label: "City",
                        format: {
                            digitSeparator: false,
                            places: 0
                        }
                    }]
                }]
            }
        })
        

    return {
    type: ActionTypes.ADD_FAT,
    payload: fatData
    }
};


        /******************* Joint Closure *********************/
        
export const fetchJOINT = () => (dispatch) => {

    dispatch(JOINTLoading(true));

    return fetch(baseUrl + '/southJoint.geojson')
    .then(response => {
        if(response.ok){
            return response
        }
        else{
            var error = new Error('Error' + response.status + ':' + response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message)
        throw errmess
    })
    .then(response => response.json())
    .then(joint => dispatch(addJOINT(joint)))
    .catch(error => dispatch(JOINTFailed(error.message)))
    
}

export const JOINTLoading = () => ({
    type: ActionTypes.JOINT_LOADING
});

export const JOINTFailed = (errmess) => ({
    type: ActionTypes.JOINT_FAILED,
    payload: errmess
});

export const addJOINT = (joint) => {
    const blob = new Blob([JSON.stringify(joint)], {
        type: "application/json"
      });

    const url = URL.createObjectURL(blob);

        const jointData = new GeoJSONLayer({
            url: url,
            title: "South JC",
            minScale: 36112,
            popupTemplate: {
                title: "JC",
                content: [{
                    type: "fields",
                    fieldInfos: [{
                        fieldName: "id",
                        label: "ID",
                        visible: true,
                        format: {
                            digitSeparator: false,
                            places: 0
                        }
                    },{
                        fieldName: "pop_id",
                        label: "POP ID",
                        format: {
                            digitSeparator: false,
                            places: 0
                        }
                    },{
                        fieldName: "placement",
                        visible:true,
                        label: "Placement"
                    },{
                        fieldName: "network",
                        label: "Network",
                        format: {
                            digitSeparator: false,
                            places: 0
                        }
                    },{
                        fieldName: "plot",
                        label: "Plot",
                        format: {
                            digitSeparator: false,
                            places: 0
                        }
                    },{
                        fieldName: "area",
                        label: "Area",
                        format: {
                            digitSeparator: false,
                            places: 0
                        }
                    },{
                        fieldName: "block_phase_sector",
                        label: "Sub Area",
                        format: {
                            digitSeparator: false,
                            places: 0
                        }
                    },{
                        fieldName: "city",
                        label: "City",
                        format: {
                            digitSeparator: false,
                            places: 0
                        }
                    }]
                }]
            }

        })

    return {
    type: ActionTypes.ADD_JOINT,
    payload: jointData
    }

};


