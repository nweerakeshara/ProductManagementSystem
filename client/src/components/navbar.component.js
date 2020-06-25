import React, {Component, Fragment} from 'react';
import { Nav, Navbar,  NavbarBrand, NavItem,  Container} from 'reactstrap';
import LogoutUser from "./logout.component";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";

class NavbarComponent extends Component {
    state = {
        isExtend : false
    }


    static propTypes = {
        user: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isExtend : !this.state.isExtend
        });
    }
    render() {

        const {isAuthenticated, user} =  this.props.user;
        const userLinks = (
            <Fragment>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavItem>
                            <Link to={'/'}  className="nav-link"> <button className="btn btn-warning" >

                                  <strong> {user ? `Hi ${user.fName}` : null} </strong>

                            </button>
                            </Link>
                        </NavItem>
                    </li>
                    <li className="nav-item">
                        <NavItem>
                            <Link to={'/addProduct'}  className="nav-link"> <button className="btn btn-danger" >Add Product</button></Link>
                        </NavItem>
                    </li>
                    <li className="nav-item">
                        <NavItem>
                            <Link  className="nav-link"> <LogoutUser/> </Link>

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
                                <Link to={'/registerUser'}  className="nav-link"> <button className="btn btn-primary" >Register</button></Link>
                         </NavItem>
                    </li>
                    <li className="nav-item">
                         <NavItem>
                                <Link to={'/loginUser'}  className="nav-link"> <button className="btn btn-primary">Login</button></Link>
                         </NavItem>
                    </li>
                </ul>
            </Fragment>
        );

        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <Link to={'/'}  className="nav-link"><NavbarBrand >Product Management System</NavbarBrand></Link>


                            <Nav className="ml-auto" navbar>
                                <ul className="navbar-nav ">

                                    {/*If Authenticated userLinks will be loaded, If not guest links*/}
                                    <li className="nav-item">
                                        {isAuthenticated ? userLinks : guestLinks}
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
    user: state.user
});

export default connect(mapsStateToProps, null) (NavbarComponent);