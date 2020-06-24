import React, {Component} from "react";
import swal from "sweetalert";

export default class AdminLogin extends Component{
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            admin_username : '',
            admin_password : ''
        }
    }

    onChangeUsername(e){
        this.setState({
            admin_username: e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            admin_password: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        if(this.state.admin_username == 'admin' && this.state.admin_password == 'admin'){
            swal("Successful", "Login Granted", "success");
            this.props.history.push('/admin2');
        }else{
            swal("Unsuccessful", "Incorrect username or password", "error");
        }

        this.setState({
            admin_username : '',
            admin_password : ''
        })
    }

    render() {
        return(
            <div style={{marginTop: 10}}>
                <h3>Sign In</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username :</label>
                        <input type="text" className="form-control"
                               value={this.state.admin_username}
                               onChange={this.onChangeUsername}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password :</label>
                        <input type="password" className="form-control"
                               value={this.state.admin_password}
                               onChange={this.onChangePassword}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Login" className= "btn btn-primary"/>
                    </div>
                </form>
                <br/><br/><br/>
            </div>
        )
    }
}
