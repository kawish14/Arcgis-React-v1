import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,Dropdown,DropdownToggle,
    DropdownMenu,DropdownItem,UncontrolledDropdown,Modal, ModalHeader, ModalBody} from 'reactstrap';
import { NavLink } from 'react-router-dom';
//import { authenticationService } from '../_services/authentication';
import './css/header.css'


class Header extends Component {
    
  constructor(props) {
    super(props);

    this.state = {
        checked:true,
        isNavOpen: false,
        isModalOpen: false,
        vehicleName:null,
        pointerEvent:'none'

      };

    this.toggleNav = this.toggleNav.bind(this);
    this.toggleDrop = this.toggleDrop.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
   
  }
 

/* logout = () => {
    authenticationService.logout();
    console.log(authenticationService.currentUserValue)
    
} */
  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen // true
    });
}
toggleDrop() {
    this.setState({
      isNavOpen: !this.state.isNavOpen // true
    });
}
toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }


getSelected = () => {


        let southCPEQuery = this.props.item.customer
        var southQuery = southCPEQuery.createQuery();
   
        let values = [];
        const checkboxes = document.querySelectorAll("input[name='status']:checked");
    
        checkboxes.forEach((checkbox) => {
        
        values.push(parseInt(checkbox.value));
    
        var queryExpression = `alarmstate in (${values}) AND status = 'Active'`
    
        southCPEQuery.definitionExpression = queryExpression
        southQuery.where = queryExpression
    
        });
        
       return values

}


componentDidMount(){

    window.$(".checkbox-dropdown").click(function () {
        window.$(this).toggleClass("is-active");
    });
    
    window.$(".checkbox-dropdown ul").click(function(e) {
        e.stopPropagation();
    });
}

selectAll = () => {

    const cbs = document.querySelectorAll('input[name="status"]');
    cbs.forEach((cb) => {
    
        cb.checked = this.state.checked;
    });

    this.setState({
        checked: !this.state.checked
    })

    if(!this.state.checked){

        let queryExpression =  `alarmstate in (2) AND status = 'Active'`

        let southCPEQuery = this.props.item.customer
        southCPEQuery.definitionExpression = queryExpression
        
    }
}
 
selectLOSbyDateFun = (e) => {

    this.props.selectLOSbyDate(e)
}

 inputData = (e) => {
     this.setState({
        vehicleName:e.target.value,
        pointerEvent:'auto'

     })

  }
  
 showState = () => {
    
    this.props.search.forEach(e => {
  
     if(e.reg_no === this.state.vehicleName){
  
        this.props.view.goTo({
          center:[e.Longitude, e.Latitude],
          zoom:18
        })
  
      }
  
    })
  }

  render() {
    return(
        <div>
            <Navbar color="dark" dark expand="md">
                    <NavbarToggler onClick={this.toggleNav} />
                    <NavbarBrand style={{color:'#1f91f3'}}>Transworld</NavbarBrand>

                   
                    <Collapse isOpen={this.state.isNavOpen} navbar>


                    <Nav  className="ml-auto" navbar>
                        
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle style={styles.dropToggle} nav caret>
                                Customer Status
                            </DropdownToggle>
                            
                            <DropdownMenu onClick={this.getSelected}  style={styles.dropdown} center>
                            <NavItem>
                                <label>
                                    <input style={styles.input} onClick={this.selectAll} type="checkbox" /> All
                                </label>
                            </NavItem>
                            <NavItem>
                                <label>
                                    <input style={styles.input} type="checkbox" id="online" value='0' name="status" />  Online
                                </label>
                            </NavItem>
                            <NavItem>
                                <label>
                                    <input style={styles.input} type="checkbox" id="poweredOff" value='1' name="status" />  Powered Off
                                </label>
                            </NavItem>
                            <NavItem>
                                <label>
                                    <input style={styles.input} type="checkbox" id="linkDown" value='2' name="status" />  Link Down
                                </label>
                            </NavItem>
                            <NavItem>
                                <label>
                                    <input style={styles.input} type="checkbox" id="gemPacketLoss" value='3' name="status" />  GEM Packet Loss
                                </label>
                            </NavItem>
                            <NavItem>
                                <label>
                                    <input style={styles.input} type="checkbox" id="lowOpticalPower" value='4' name="status" />  Low Optical Power
                                </label>
                            </NavItem>
                                    
                            </DropdownMenu>
                        </UncontrolledDropdown>
     
                        <NavItem>
                        <div className="nav-link"><span className="fa fa-sign-in fa-lg"></span> Logout</div>
                            {/* <NavLink className="nav-link"  to='/login' onClick={this.logout}><span className="fa fa-sign-in fa-lg"></span> Logout</NavLink> */}
                        </NavItem> 
                    </Nav>
                    </Collapse>
             
            </Navbar>

        </div>
    );
  }
}

const styles = {
    dropToggle:{
        background:"#343a40",
        color:"#1f91f3",
    },
    dropItem:{
        color:"#1f91f3",
    },
    filterItem:{
        padding: '10px'
    },
    dropDown:{
        marginRight:'15px'
    },
    dropdown:{
        background: 'rgb(52, 58, 64)',
        color: '#1f91f3',
        fontSize: '14px',
        padding: '9px',
    },
    input:{
        marginRight: '5px'
    }

}

export default Header;

