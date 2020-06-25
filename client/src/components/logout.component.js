import React, { Component } from "react";
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
    /*User will be logged out*/
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
