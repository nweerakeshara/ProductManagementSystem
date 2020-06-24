import React, {Component} from 'react';
import axios from 'axios';
import swal from "sweetalert";

export default class AddStoreManager extends Component{
    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            sm_fname : '',
            sm_lname : '',
            sm_address : '',
            sm_email : '',
            sm_password : '',
            sm_pnumber : ''
        }
    }

    onChangeFirstName(e){
        this.setState({
            sm_fname: e.target.value
        });
    }

    onChangeLastName(e){
        this.setState({
            sm_lname: e.target.value
        });
    }

    onChangeAddress(e){
        this.setState({
            sm_address: e.target.value
        });
    }

    onChangeEmail(e){
        this.setState({
            sm_email: e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            sm_password: e.target.value
        });
    }

    onChangePhoneNumber(e){
        this.setState({
            sm_pnumber: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const obj = {
            sm_fname : this.state.sm_fname,
            sm_lname : this.state.sm_lname,
            sm_address : this.state.sm_address,
            sm_email : this.state.sm_email,
            sm_password : this.state.sm_password,
            sm_pnumber : this.state.sm_pnumber
        };

        axios.post('http://localhost:5000/api/storemanager/add', obj)
            .then(res => {
                if(res.data.success){
                    swal("Good job!", "Store manager details successfully added to the database", "success");
                }
            })
            .catch((err) => {
                swal("Unsuccessful", "Error while adding store manager details to the database", "error");
            });

        this.setState({
            sm_fname : '',
            sm_lname : '',
            sm_address : '',
            sm_email : '',
            sm_password : '',
            sm_pnumber : ''
        })

        //this.props.history.push('/guest');
    }

    render() {
        return(
            <div style={{marginTop: 10}}>
                <h3>Add Store Manager Details : </h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>First Name :</label>
                        <input type="text" className="form-control"
                               value={this.state.sm_fname}
                               onChange={this.onChangeFirstName}
                        />
                    </div>

                    <div className="form-group">
                        <label>Last Name :</label>
                        <input type="text" className="form-control"
                               value={this.state.sm_lname}
                               onChange={this.onChangeLastName}
                        />
                    </div>

                    <div className="form-group">
                        <label>Address :</label>
                        <input type="text" className="form-control"
                               value={this.state.sm_address}
                               onChange={this.onChangeAddress}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email :</label>
                        <input type="text" className="form-control"
                               value={this.state.sm_email}
                               onChange={this.onChangeEmail}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password :</label>
                        <input type="text" className="form-control"
                               value={this.state.sm_password}
                               onChange={this.onChangePassword}
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number :</label>
                        <input type="text" className="form-control"
                               value={this.state.sm_pnumber}
                               onChange={this.onChangePhoneNumber}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Add Store Manager Details" className= "btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
