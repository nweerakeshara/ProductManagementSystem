import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../actions/userActions";
import { clearErrors } from "../actions/errorActions";
import { Alert } from "reactstrap";
import swal from "sweetalert";

class RegisterUser extends Component {
  state = {
    email: "",
    fName: "",
    lName: "",
    userPw: "",
    userConfirmPw: "",
    phone: "",
    addr: "",
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  registerClose = () => {
    this.props.clearErrors();
    this.setState({
      email: "",
      fName: "",
      lName: "",
      userPw: "",
      userConfirmPw: "",
      phone: "",
      addr: "",
      msg: null
    });

    this.props.history.push("/");
  };

  componentDidUpdate = (prevProps) => {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (this.state.msg) {
      swal("Unsuccessful", this.state.msg, "error");
      this.setState({ msg: null });
    }

    if (isAuthenticated) {
      this.registerClose();
    }
  };

  onChangeFName = (e) => {
    this.setState({
      fName: e.target.value,
    });
  };

  onChangeLName = (e) => {
    this.setState({
      lName: e.target.value,
    });
  };

  onChangePhone = (e) => {
    this.setState({
      phone: e.target.value,
    });
  };

  onChangeAddr = (e) => {
    this.setState({
      addr: e.target.value,
    });
  };

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  onChangeUserPw = (e) => {
    this.setState({
      userPw: e.target.value,
    });
  };

  onChangeUserConfirmPw = (e) => {
    if (e.target.value !== this.state.userPw) {
      this.setState({
        userConfirmPw: e.target.value,
        msgtop: "Confirm Password Does Not Match",
      });
    }
    if (e.target.value === this.state.userPw) {
      this.setState({
        userConfirmPw: e.target.value,
        msgtop: "",
      });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { email, fName, lName, userPw, phone,  addr} = this.state;
    const newUser = {
      email,
      fName,
      lName,
      userPw,
      phone,
      addr
    };

    this.props.register(newUser);

    this.setState({
      email: "",
      fName: "",
      lName: "",
      userPw: "",
      userConfirmPw: "",
      phone: "",
      addr: "",
      msg: null
    });
  };

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>User Sign Up</h3>
        <form onSubmit={this.onSubmit}>
          {this.state.msgtop ? (
            <Alert color="danger">{this.state.msgtop}</Alert>
          ) : null}


          <div className="form-group">
            <label>Email Address :</label>
            <input
              type="email"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>

          <div className="form-group">
            <label>First Name :</label>
            <input
                type="text"
                className="form-control"
                value={this.state.fName}
                onChange={this.onChangeFName}

            />
          </div>

          <div className="form-group">
            <label>Last Name :</label>
            <input
                type="text"
                className="form-control"
                value={this.state.lName}
                onChange={this.onChangeLName}

            />
          </div>

          <div className="form-group">
            <label>Phone :</label>
            <input
                type="text"
                className="form-control"
                value={this.state.phone}
                onChange={this.onChangePhone}

            />
          </div>

          <div className="form-group">
            <label>Address :</label>
            <input
                type="text"
                className="form-control"
                value={this.state.addr}
                onChange={this.onChangeAddr}

            />
          </div>

          <div className="form-group">
            <label>Password :</label>
            <input
              type="password"
              className="form-control"
              value={this.state.userPw}
              onChange={this.onChangeUserPw}
              minLength="5"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password :</label>
            <input
              type="password"
              className="form-control"
              value={this.state.userConfirmPw}
              onChange={this.onChangeUserConfirmPw}
              minLength="5"
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Register" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterUser
);
