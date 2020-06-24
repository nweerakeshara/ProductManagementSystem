import React, {Component} from "react";
import swal from "sweetalert";
import axios from "axios";


import {logout} from '../../actions/cusActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";


class StoreManagerLogin extends Component{
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            sm_email : '',
            sm_password : ''
        }
    }

    onChangeUsername(e){
        this.setState({
            sm_email: e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            sm_password: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const obj = {
            sm_email : this.state.sm_email,
            sm_password : this.state.sm_password
        };

        axios.post('http://localhost:5000/api/storemanager/login', obj)
            .then((res) => {
                // console.log(res.data)
                if(res.data.length != 0){
                    swal("Successful", "Login Granted", "success");
                    this.props.history.push('/storemanager2');
                }
                else{
                    swal("Unsuccessful", "Incorrect username or password", "error");
                }
            })

        this.setState({
            sm_email : '',
            sm_password : ''
        })
    }

    /////////////////////////////////////////////////////////////////

    static propTypes = {
        logout : PropTypes.func.isRequired
    }


    componentDidMount() {
        this.props.logout();
        console.log(axios.get('http://localhost:5000/api/cus/logout').then(response => {
            if (response.status === 200) {
                //
            } else {

            }
        }));

    }

    //////////////////////////////////////////////////////////////////////


    render() {
        return(
            <div style={{marginTop: 10}}>
                <Link to={"/admin"} className="nav-link"><button className="btn btn-danger float-right">Admin Login</button></Link>
                <br/><br/>
                <h3>Sign In</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username :</label>
                        <input type="text" className="form-control"
                               value={this.state.sm_email}
                               onChange={this.onChangeUsername}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password :</label>
                        <input type="password" className="form-control"
                               value={this.state.sm_password}
                               onChange={this.onChangePassword}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Login" className= "btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(null, {logout})(StoreManagerLogin);