import React from 'react';
//import socketIOClient from "socket.io-client";
import { loadModules, setDefaultOptions } from 'esri-loader';
import { authenticationService } from '../../_services/authentication';


export default class Customer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id: [],
            Online:null,
            DyingGasp:null,
            LOS:null,
            GEMPack:null,
            LOP:null,
            intervalId:null,


        }
       
    }
    
componentDidMount(){

        let _this = this
        
        let customerLayer = this.props.item.customer;
        

        let view = this.props.view
        let map = this.props.map

    
        let dates = new Date()
        let rangeTime = dates.getHours() - 1

        const name = "$feature.alarmstate"
        const cat = "$feature.category"
        const bandwidth = "feature.bandwidth"
        const lastDowntime = "feature.lastdowntime"

        const valueExpression = `When( ${name} == 0 && ${cat} == 'VIP', 'zero', ${name} == 1 && ${cat} == 'VIP', 'one',
            ${name} == 2 && ${cat} == 'VIP', 'two', ${name} == 3 && ${cat} == 'VIP', 'three', 
            ${name} == 4 && ${cat} == 'VIP', 'four', 
            ${name} == 0 && ${cat} != 'VIP', 0, ${name} == 1 && ${cat} != 'VIP', 1,
            ${name} == 2 && ${cat} != 'VIP', 2, ${name} == 3 && ${cat} != 'VIP', 3,
            ${name} == 4 && ${cat} != 'VIP', 4,5)`

        var rendererCheck = {
            type: "unique-value", 
            //field: "alarminfo",
            valueExpression:valueExpression,
            uniqueValueInfos: [
                {
                    value: "zero",
                    symbol: {
                        type: "picture-marker", 
                        url: "images/zero.png",
                        color: "red",
                        width: "29px",
                        height: "29px"
                    }
                },  {
                    value: "one",
                    symbol: {
                        type: "picture-marker", 
                        url: "images/one.png",
                        color: "red",
                        width: "34px",
                        height: "34px"
                    }
                },  {
                    value: "two",
                    symbol: {
                        type: "picture-marker", 
                        url: "images/two.png",
                        color: "red",
                        width: "34px",
                        height: "34px"
                    }
                },  {
                    value: "three",
                    symbol: {
                        type: "picture-marker", 
                        url: "images/three.png",
                        color: "red",
                        width: "30px",
                        height: "30px"
                    }
                },  {
                    value: "four",
                    symbol: {
                        type: "picture-marker", 
                        url: "images/four.png",
                        color: "red",
                        width: "30px",
                        height: "30px"
                    }
                }, {

                    value: "0",
                    symbol: {
                        type: "simple-marker", 
                        style: "circle",
                        color: "green",
                        size: "8px",
                        outline: { 
                            color: [ 255, 255, 255, 1 ],
                            width: 0.4
                          }
                    }
                }, {

                    value: "1",
                    symbol: {
                        type: "simple-marker", 
                        style: "circle",
                        color: "blue",
                        size: "8px",
                        outline: { 
                            color: [ 255, 255, 255, 1 ],
                            width: 0.4
                          }
                    }
                }, {

                    value: "2",
                    symbol: {
                        type: "simple-marker", 
                        style: "circle",
                        color: "red",
                        size: "8px",
                        outline: { 
                            color: [ 255, 255, 255, 1 ],
                            width: 0.4
                          }
                    }
                }, {

                    value: "3",
                    symbol: {
                        type: "simple-marker", 
                        style: "circle",
                        color: "black",
                        size: "8px",
                        outline: { 
                            color: [ 255, 255, 255, 1 ],
                            width: 0.4
                          }
                    }
                }, {

                    value: "4",
                    symbol: {
                        type: "simple-marker", 
                        style: "circle",
                        color: "yellow",
                        size: "8px",
                        outline: { 
                            color: [ 255, 255, 255, 1 ],
                            width: 0.4
                          }
                    }
                }, {

                    value: "5",
                    symbol: {
                        type: "simple-marker", 
                        style: "circle",
                        color: "white",
                        size: "8px",
                        outline: { 
                            color: [ 255, 255, 255, 1 ],
                            width: 0.4
                          }
                    }
                }
            ]
        };
        
       
            var queryExpression = "alarmstate = 2 AND status = 'Active'"
           customerLayer.definitionExpression = queryExpression

           
          view.when(function(){

                let southLOS = customerLayer.createQuery();
                let southOnline = customerLayer.createQuery();
                let southDyingGasp = customerLayer.createQuery();
                let southGEMPack = customerLayer.createQuery();
                let southLOP = customerLayer.createQuery();

                // LOS
                southLOS.where = "alarmstate = 2 AND status = 'Active'"
                customerLayer.queryFeatures(southLOS)
                    .then(function(response){
                        _this.setState({
                            LOS:response.features.length
                        })
                        _this.props.southCPEstatus(_this.state)
                    });

                // Online
                southOnline.where = "alarmstate = 0 AND status = 'Active'"
                customerLayer.queryFeatures(southOnline)
                .then(function(response){
                    _this.setState({
                        Online:response.features.length
                    })
                    _this.props.southCPEstatus(_this.state)
                });

                 // Gying Gasp
                 southDyingGasp.where = "alarmstate = 1 AND status = 'Active'"
                 customerLayer.queryFeatures(southDyingGasp)
                 .then(function(response){
                     _this.setState({
                        DyingGasp:response.features.length
                     })
                     _this.props.southCPEstatus(_this.state)
                 });

                // GEMPack
                southGEMPack.where = "alarmstate = 3 AND status = 'Active'"
                customerLayer.queryFeatures(southGEMPack)
                .then(function(response){
                    _this.setState({
                        GEMPack:response.features.length
                    })
                    _this.props.southCPEstatus(_this.state)
                });

                 // LOP
                 southLOP.where = "alarmstate = 4 AND status = 'Active'"
                 customerLayer.queryFeatures(southLOP)
                 .then(function(response){
                     _this.setState({

                        LOP:response.features.length
                     })

                    _this.props.southCPEstatus(_this.state)
                     
                 });

            })
            

            customerLayer.visible = true;
            //customerLayer.listMode = "hide";
            customerLayer.legendEnabled = false
            customerLayer.renderer =rendererCheck

}


render(){
        return null
    }
}