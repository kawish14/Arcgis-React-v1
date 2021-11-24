import React, { Component } from 'react';

import South from './south/SouthComponent';
 
import { Switch, Route, Redirect, withRouter,Router } from 'react-router-dom';
import { connect } from 'react-redux';

import { south_fetchFeeder, south_fetchDistribution,fetchCustomer, fetchDC, fetchFAT, fetchJOINT,
  fetchPOP,fetchZone} from '../redux/ActionCreatorSouth';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
/* import  LoginPage  from '../LoginPage/LoginPage';
import  {PrivateRoute}  from './PrivateRoute'; */

import history from "../history"

const mapStateToProps = state => {
  return {
    customer: state.customer,
    southZone:state.southZone,
    southPOP:state.southPOP,
    southFeeder: state.southFeeder,
    southDistribution:state.southDistribution,
    dc:state.dc,
    fat:state.fat,
    southJoint:state.southJoint,
    

  }
}

const mapDispatchToProps = dispatch => ({

  fetchCustomer: () => { dispatch(fetchCustomer())},
  fetchZone: () => { dispatch(fetchZone())},
  fetchPOP:() => {dispatch(fetchPOP())},
  south_fetchFeeder: () => { dispatch(south_fetchFeeder())},
  south_fetchDistribution:() =>{dispatch(south_fetchDistribution())},
  fetchDC: () => { dispatch(fetchDC())},
  fetchFAT: () => {dispatch(fetchFAT())},
  fetchJOINT:() => {dispatch(fetchJOINT())},


  
})

class Main extends Component {

  componentDidMount() {

    
    this.props.fetchCustomer();
    this.props.fetchZone();
    this.props.fetchPOP();
    this.props.south_fetchFeeder();
    this.props.south_fetchDistribution();
    this.props.fetchDC();
    this.props.fetchFAT();
    this.props.fetchJOINT();


  }

  render() {

     const appPage = () => {

         return (
            <South 
              customer={this.props.customer}
              customerLoading={this.props.customer.isLoading}
              customerErrMess={this.props.customer.errMess}

              dc={this.props.dc}
              dcLoading={this.props.dc.isLoading}
              dcErrMess={this.props.dc.errMess}

              southZone={this.props.southZone}
              southZoneLoading ={this.props.southZone.isLoading}
              southZoneErrMess = {this.props.southZone.errMess}

              southFeeder={this.props.southFeeder}
              southFeederLoading={this.props.southFeeder.isLoading}
              southFeederErrMess={this.props.southFeeder.errMess}

              southDistribution={this.props.southDistribution}
              southDistributionLoading={this.props.southDistribution.isLoading}
              southDistributionErrMess={this.props.southDistribution.errMess}

              fat={this.props.fat}
              fatLoading={this.props.fat.isLoading}
              fatErrMess={this.props.fat.errMess}

              southJoint={this.props.southJoint}
              southJointLoading={this.props.southJoint.isLoading}
              southJointErrMess={this.props.southJoint.errMess}

              southPOP={this.props.southPOP}
              southPOPLoading={this.props.southPOP.isLoading}
              southPOPErrMess={this.props.southPOP.errMess}
              
          />
         )
       

    
    }


    return (
      <div>
        <TransitionGroup history={history}>
            <Switch>
                  {/* <PrivateRoute exact path="/" component={appPage} /> */}
                  {/* <Route path='/login' component={LoginPage} /> */}
                  <Route exact path="/" component={appPage} />
              </Switch>

        </TransitionGroup>
       {/*  <Footer /> */}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));