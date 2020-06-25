import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "react-notifications/lib/notifications.css";
import axios from "axios";
import swal from "sweetalert";



class addProductsComponent extends Component {
    state = {
        name: "",
        des: "",
        qty: "",
        userId: ""
    };




    static propTypes = {
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object.isRequired,
    };
///////////////////////////////////////////////
    onChangeName = (e) => {
        this.setState({
            name: e.target.value,
        });
    };

    onChangeDes = (e) => {
        this.setState({
            des: e.target.value,
        });
    };

    onChangeQty = (e) => {
        this.setState({
            qty: e.target.value,
        });
    };
    onChangeUserId = (e) => {
        this.setState({
            userId: e.target.value,
        });
    };

    onSubmitProduct = (e) => {
        e.preventDefault();
        const userId = this.props.uid;
        const { name, des, qty } = this.state;
        const product = {
            name,
            des,
            qty,
            userId
        };

        axios
            .post("http://localhost:5000/api/products/add", product)
            .then((res) => {
                if (res.data.success == true) {
                    swal("Successful", "Product Added", "success");
                } else {
                    swal("Unsuccessful", "Product Failed", "error");
                }
            })
            .catch((error) => {
                console.log(error);
            });

        this.setState({
            name: "",
            des: "",
            qty: "",
            userId: ""

        });
    };
/////////////////////////////////////////////////////////////
    render() {


        return (
            <div>

                <br/>



                            <div>
                                <h5>Add Product :</h5>
                                <form onSubmit={this.onSubmitProduct}>



                                    <div className="form-group">
                                        <label>Name :</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.name}
                                            onChange={this.onChangeName}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Description :</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.des}
                                            onChange={this.onChangeDes}

                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Qty :</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.qty}
                                            onChange={this.onChangeQty}

                                        />
                                    </div>

                                    <div className="form-group">
                                        <input type="submit" value="Add Product" className="btn btn-primary" />
                                    </div>
                                </form>
                            </div>

             </div>

        );
    }
}

const mapStateToProps = (state) => ({

    isAuthenticated: state.user.isAuthenticated,
    user: state.user,
});

export default connect(mapStateToProps, null)(addProductsComponent);