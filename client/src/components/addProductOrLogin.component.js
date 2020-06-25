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

                {/*Check whether user is logged in, Then determine AddProductComponent should be loaded or LoginUser Component should be loaded*/}
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