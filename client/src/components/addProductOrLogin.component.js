import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoginUser from "./login.component";
import AddProductComponent from "./addProducts.component";


class addProductOrLoginComponent extends Component {


    static propTypes = {
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object.isRequired,
    };

/////////////////////////////////////////////////////////////
    render() {
        const { isAuthenticated, user } = this.props.user;

        return (
            <div>

                <br/>


                {isAuthenticated ? (
                    <AddProductComponent  uid={user._id}/>
                ) : <LoginUser/>}
            </div>

        );
    }
}

const mapStateToProps = (state) => ({

    isAuthenticated: state.user.isAuthenticated,
    user: state.user,
});

export default connect(mapStateToProps, null)(addProductOrLoginComponent);