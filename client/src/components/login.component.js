import React, {Component} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from "../actions/userActions";
import {clearErrors} from "../actions/errorActions";
import swal from "sweetalert";

class  LoginUser  extends  Component{

    state={
        email: "",
        userPw: "",
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
            email: "",
            userPw: "",
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

    onChangeUserEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    }


    onChangeUserPw = (e) => {
        this.setState({
            userPw: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {email, userPw } = this.state;
        const existUser = {
            email,
            userPw
        }

        this.props.login(existUser);

        this.setState({
            email: "",
            userPw: "",
            msg :null
        });
    }

    render() {
        return (
            /*User Login*/
            <div style={{marginTop: 10}}>
                <h3>User Sign In</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Email :</label>
                        <input type="text" className="form-control" value={this.state.email} onChange={this.onChangeUserEmail}/>

                    </div>


                    <div className="form-group">
                        <label>Password :</label>
                        <input type="password" className="form-control" value={this.state.userPw} onChange={this.onChangeUserPw}/>

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
    isAuthenticated: state.user.isAuthenticated,
    error : state.error
});

export  default connect(mapStateToProps,{login, clearErrors})(LoginUser);