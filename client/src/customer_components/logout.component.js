import React, { Component } from "react";
import axios from "axios";
import { logout } from "../actions/cusActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CartReset from "../components/CartReset";


class LogoutCustomer extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };

  onClick = (e) => {
    e.preventDefault();
    this.props.logout();
    console.log(
      axios.get("http://localhost:5000/api/cus/logout").then((response) => {
        if (response.status === 200) {
          //
        } else {
          alert("Log Out Failed");
        }
      })
    );
  };

  render() {
    return (
      <div>

        <button
          className="btn btn-primary"
          onClick={(this.onClick, (<CartReset />))}
        >
          Logout
        </button>
      </div>
    );
  }
}

export default connect(null, { logout })(LogoutCustomer);
