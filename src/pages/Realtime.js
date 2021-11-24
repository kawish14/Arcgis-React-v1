import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Graphic from "@arcgis/core/Graphic";

const ENDPOINT = "http://45.249.11.5:5001";
const socket = socketIOClient(ENDPOINT);

class Realtime extends React.Component {

    componentDidMount(){
    
    let _this = this

    let loginRole = _this.props.loginRole.data.role

    socket.on("endpoint", data => {
  
      if(loginRole=== "SouthDEVuser"){

        let customerLayer = _this.props.item.customer;

        let real = customerLayer.createQuery();

        real.where = `alias = '${data.alias}'`

        customerLayer.queryFeatures(real)
        .then(function(response){
          response.features.map(e => {

            const attribute = {
                
              OBJECTID: e.attributes.OBJECTID,
              address:e.attributes.address,
              alarminfo:data.alarminfo,
              alarmstate:data.alarmstate,
              alias:e.attributes.alias,
              bandwidth:e.attributes.bandwidth,
              block_phase_sector:e.attributes.block_phase_sector,
              category:e.attributes.category,
              city:e.attributes.city,
              comments:e.attributes.comments,
              id:e.attributes.id,
              dc_id:e.attributes.dc_id,
              fat_id:e.attributes.fat_id,
              frame:data.frame,
              lastdowntime:data.lastdowntime,
              lastuptime:data.lastuptime,
              name:e.attributes.name,
              olt:e.attributes.olt,
              ontid:e.attributes.ontid,
              ontmodel:e.attributes.ontmodel,
              plot:e.attributes.plot,
              pop_id:e.attributes.pop_id,
              port:data.port,
              slot:data.slot,
              status:e.attributes.status,
              type:e.attributes.type

            } 
            
            const updateFeature =  new Graphic({
              geometry: e.geometry,
              attributes: attribute
            });

            const deleteFeature = new Graphic({
                geometry: e.geometry,
                attributes: e.attributes
            });

            customerLayer.applyEdits({
                deleteFeatures:[deleteFeature],
                addFeatures:[updateFeature],
              
            });

    
            })
          
        })
         
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

      }

      else if(loginRole=== "NorthDEVuser"){

      let northCustomerLayer = _this.props.item.northCustomer;

        let northReal = northCustomerLayer.createQuery();

        northReal.where = `alias = '${data.alias}'`

        northCustomerLayer.queryFeatures(northReal)
        .then(function(response){
          response.features.map(e => {

            const attribute = {
                
              OBJECTID: e.attributes.OBJECTID,
              address:e.attributes.address,
              alarminfo:data.alarminfo,
              alarmstate:data.alarmstate,
              alias:e.attributes.alias,
              bandwidth:e.attributes.bandwidth,
              block_phase_sector:e.attributes.block_phase_sector,
              category:e.attributes.category,
              city:e.attributes.city,
              comments:e.attributes.comments,
              id:e.attributes.id,
              dc_id:e.attributes.dc_id,
              fat_id:e.attributes.fat_id,
              frame:data.frame,
              lastdowntime:data.lastdowntime,
              lastuptime:data.lastuptime,
              name:e.attributes.name,
              olt:e.attributes.olt,
              ontid:e.attributes.ontid,
              ontmodel:e.attributes.ontmodel,
              plot:e.attributes.plot,
              pop_id:e.attributes.pop_id,
              port:data.port,
              slot:data.slot,
              status:e.attributes.status,
              type:e.attributes.type

            } 
            
            const updateFeature =  new Graphic({
              geometry: e.geometry,
              attributes: attribute
            });

            const deleteFeature = new Graphic({
                geometry: e.geometry,
                attributes: e.attributes
            });

            northCustomerLayer.applyEdits({
                deleteFeatures:[deleteFeature],
                addFeatures:[updateFeature],
              
            });

    
            })
          
        })

        let northLOS = northCustomerLayer.createQuery();
        let northOnline = northCustomerLayer.createQuery();
        let northDyingGasp = northCustomerLayer.createQuery();
        let northGEMPack = northCustomerLayer.createQuery();
        let northLOP = northCustomerLayer.createQuery();

        // LOS
        northLOS.where = "alarmstate = 2 AND status = 'Active'"
        northCustomerLayer.queryFeatures(northLOS)
            .then(function(response){
                _this.setState({
                    LOS:response.features.length
                })
                _this.props.northCPEstatus(_this.state)
            });

        // Online
        northOnline.where = "alarmstate = 0 AND status = 'Active'"
        northCustomerLayer.queryFeatures(northOnline)
        .then(function(response){
            _this.setState({
                Online:response.features.length
            })
            _this.props.northCPEstatus(_this.state)
        });

            // Gying Gasp
            northDyingGasp.where = "alarmstate = 1 AND status = 'Active'"
            northCustomerLayer.queryFeatures(northDyingGasp)
            .then(function(response){
                _this.setState({
                DyingGasp:response.features.length
                })
                _this.props.northCPEstatus(_this.state)
            });

        // GEMPack
        northGEMPack.where = "alarmstate = 3 AND status = 'Active'"
        northCustomerLayer.queryFeatures(northGEMPack)
        .then(function(response){
            _this.setState({
                GEMPack:response.features.length
            })
            _this.props.northCPEstatus(_this.state)
        });

            // LOP
            northLOP.where = "alarmstate = 4 AND status = 'Active'"
            northCustomerLayer.queryFeatures(northLOP)
            .then(function(response){
                _this.setState({

                LOP:response.features.length
                })

            _this.props.northCPEstatus(_this.state)
                
            });

      }
      
    })

}

componentWillUnmount(){

    return socket.disconnect();
}

render(){

        return null
    }
  
};

export default Realtime