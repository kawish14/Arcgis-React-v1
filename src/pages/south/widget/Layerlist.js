import React from 'react';
import LayerList from "@arcgis/core/widgets/LayerList";
import Expand from "@arcgis/core/widgets/Expand";
import GroupLayer from "@arcgis/core/layers/GroupLayer";

import './css/layerlist.css'

let south_Layer = {}

export default class Layerlist extends React.Component{

    componentDidMount() {

        let view = this.props.view
        let map = this.props.map

        let southCPE =this.props.customerLabel.customer
        let southDC = this.props.dc_odb.dc
        const southZone = this.props.southZone.southZone;
        let southPOP = this.props.southPOP.southPOP

        let southFAT = this.props.southFAT.fat
        let southFeeder = this.props.southFeeder.southFeeder
       let southDistribution = this.props.southDistribution.southDistribution
        let southJoint = this.props.southJoint.southJoint

                let layerlist = new Expand({
                    content: new LayerList({
                        view: view,
                        style: "classic",
                        statusIndicatorsVisible: false,
                        listItemCreatedFunction: function (event) {
                            let item = event.item

                            if (item.title === "South Zone") {
                                item.actionsSections = [
                                    [
                                        {
                                            title: "Label Zone",
                                            className: "esri-icon-labels",
                                            id: "label-Zone"
                                        }
                                    ]
                                ]
                            }

                            if (item.title === "FAT") {
                                item.actionsSections = [
                                    [
                                        {
                                            title: "Label FAT",
                                            className: "esri-icon-labels",
                                            id: "label-FAT"
                                        }
                                    ]
                                ]
                            }
                            if (item.title === "POP") {
                                item.actionsSections = [
                                    [
                                        {
                                            title: "Label POP",
                                            className: "esri-icon-labels",
                                            id: "label-south-pop"
                                        }
                                    ]
                                ]
                            }
                            if (item.title === "South ODB/DC") {
                                item.actionsSections = [
                                    [
                                        {
                                            title: "Label DC",
                                            className: "esri-icon-labels",
                                            id: "label-south-DC"
                                        }
                                    ]
                                ]
                            }

                        }
                    }),
                    view: view,
                    group: "bottom-right",
                    expanded: false,
                })

                view.ui.add(layerlist, 'top-right')

                layerlist.content.on("trigger-action", function (event) {
                 
                    var id = event.action.id;

                if (id === "label-Zone") {

                        if (southZone.labelsVisible === false) {

                            southZone.labelsVisible = true

                        }
                        else {

                            southZone.labelsVisible = false
                        }
                      
                    }
                    
                    if (id === "label-south-pop") {

                        if (southPOP.labelsVisible === false) {

                            southPOP.labelsVisible = true

                        }
                        else {

                            southPOP.labelsVisible = false
                        }
                    } 

                    if (id === "label-south-DC") {

                        if (southDC.labelsVisible === false) {

                            southDC.labelsVisible = true

                        }
                        else {

                            southDC.labelsVisible = false
                        }
                      
                    }
                }) 

                var FiberLayer = new GroupLayer({
                    title:"OFC",
                    layers:[southFeeder,southDistribution]
                }) 

                var KHI_Layers = new GroupLayer({
                    title: "KHI Layers",
                    layers: [southZone,FiberLayer,southCPE,southDC,southFAT,southJoint,southPOP],
                  });

                  south_Layer =  new GroupLayer({
                    title: "South Layer",
                    layers: [KHI_Layers],
                  });

                map.add(south_Layer)
            

}

/* componentWillUnmount(){

        this.props.map.remove(south_Layer)
} */

render(){

        return null
    }
}