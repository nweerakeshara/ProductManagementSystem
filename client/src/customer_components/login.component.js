import React, {Component} from "react";
import axios from "axios";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from "../actions/cusActions";
import {clearErrors} from "../actions/errorActions";
import {Alert} from 'reactstrap';
import swal from "sweetalert";

class  LoginCustomer  extends  Component{

    state={
        cusUn: "",
        cusPw: "",
        msg :null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error : PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors : PropTypes.func.isRequired

    }

    loginClose = () => {
        this.props.clearErrors();
        this.setState({
            cusUn: "",
            cusPw: "",
            msg :null
        });

        this.props.history.push('/');
    }

    componentDidUpdate =(prevProps) => {
        const {error, isAuthenticated} = this.props;
        if(error !== prevProps.error){
            if(error.id === 'LOGIN_FAIL'){
                this.setState({msg : error.msg.msg});


            }else{
                this.setState({msg: null });
            }
        }


        if(this.state.msg){
            swal("Unsuccessful", this.state.msg, "error");
            this.setState({msg: null });
        }

        if(isAuthenticated){
            this.loginClose();
        }
    }

    onChangeCusUn = (e) => {
        this.setState({
            cusUn: e.target.value
        });
    }


    onChangeCusPw = (e) => {
        this.setState({
            cusPw: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {cusUn, cusPw } = this.state;
        const existUser = {
            cusUn,
            cusPw
        }

        this.props.login(existUser);

        this.setState({
            cusUn: "",
            cusPw: "",
            msg :null
        });
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Customer Sign In</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Username :</label>
                        <input type="text" className="form-control" value={this.state.cusUn} onChange={this.onChangeCusUn}/>

                    </div>


                    <div className="form-group">
                        <label>Password :</label>
                        <input type="password" className="form-control" value={this.state.cusPw} onChange={this.onChangeCusPw}/>

                    </div>

                    <div className="form-group">

                        <input type="submit" value="Login" className="btn btn-primary"/>

                    </div>
                </form>
                <br/><br/><br/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.cus.isAuthenticated,
    error : state.error
});

export  default connect(mapStateToProps,{login, clearErrors})(LoginCustomer);