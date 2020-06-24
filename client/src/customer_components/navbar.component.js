import React, {Component, Fragment} from 'react';
import {Collapse, Nav, Navbar, NavbarToggler, NavbarBrand, NavItem, NavLink, Container} from 'reactstrap';
import LogoutCustomer from "./logout.component";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";

class NavbarComponent extends Component {
    state = {
        isExtend : false
    }


    static propTypes = {
        cus: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isExtend : !this.state.isExtend
        });
    }
    render() {

        const {isAuthenticated, user} =  this.props.cus;
        const cusLinks = (
            <Fragment>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavItem>
                            <Link to={'/'}  className="nav-link"> <button className="btn btn-warning" >

                                  <strong> {user ? `Hi ${user.cusUn}` : null} </strong>

                            </button>
                            </Link>
                        </NavItem>
                    </li>
                    <li className="nav-item">
                        <NavItem>
                            <Link  className="nav-link"> <LogoutCustomer/> </Link>

                        </NavItem>
                    </li>
                </ul>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                         <NavItem>
                                <Link to={'/registerCus'}  className="nav-link"> <button className="btn btn-primary" >Register</button></Link>
                         </NavItem>
                    </li>
                    <li className="nav-item">
                         <NavItem>
                                <Link to={'/loginCus'}  className="nav-link"> <button className="btn btn-primary">Login</button></Link>
                         </NavItem>
                    </li>
                </ul>
            </Fragment>
        );

        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <Link to={'/'}  className="nav-link"><NavbarBrand >HINT Fashion</NavbarBrand></Link>


                            <Nav className="ml-auto" navbar>
                                <ul className="navbar-nav ">


                                    <li className="nav-item">
                                        {isAuthenticated ? cusLinks : guestLinks}
                                    </li>

                                    <li className="nav-item">
                                        <Link to={"/storemanager"} className="nav-link"><button  className="btn btn-secondary ">Employee</button></Link>
                                    </li>

                                </ul>
                            </Nav>

                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapsStateToProps = state => ({
    cus: state.cus
});

export default connect(mapsStateToProps, null) (NavbarComponent);