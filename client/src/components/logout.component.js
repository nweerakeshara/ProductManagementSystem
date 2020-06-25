import React, { Component } from "react";
import axios from "axios";
import { logout } from "../actions/userActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";



class LogoutUser extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };

  onClick = (e) => {
    e.preventDefault();
    this.props.logout();
    console.log(
      axios.get("http://localhost:5000/api/user/logout").then((response) => {
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
          onClick={(this.onClick    )}
        >
          Logout
        </button>
      </div>
    );
  }
}

export default connect(null, { logout })(LogoutUser);
