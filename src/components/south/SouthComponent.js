import React, { useState,useEffect } from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle} from 'reactstrap';
import { Loading } from '../LoadingComponent';


import SouthMap from './SouthMap'


//import Tracking from '../../pages/Tracking';

function South(props) {

    const [search, searchUpdate] = useState({})
    const searchUpdateFun = (e) => {searchUpdate(e)}

    if (props.customerLoading || props.southFeederLoading || props.southDistributionLoading
        || props.dcLoading || props.fatLoading || props.southJointLoading) {
        return(
          
            <Loading />
        );
    }
    else if (props.customerErrMess ||  props.southFeederErrMess || props.southDistributionErrMess
        || props.dcErrMess || props.fatErrMess || props.southJointErrMess) {
        return(
                <h4>{props.customerErrMess}</h4>
        );
    }
    else 
        {
         
        return(
            <div>
               
                 
                <SouthMap 
                   
                    item = {props.customer}
                    customerLoading={props.customerLoading}
                    dc_odb={props.dc}
                    zone = {props.southZone}
                    southFeeder = {props.southFeeder}
                    southDistribution = {props.southDistribution}
                    fat ={props.fat}
                    southJoint ={props.southJoint}
                    southPOP = {props.southPOP}

                    searchBar_Header={searchUpdateFun}

                >
                </SouthMap>
                

            </div>
          
        )
    }

}

export default South;