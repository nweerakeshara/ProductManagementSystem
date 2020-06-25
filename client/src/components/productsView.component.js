import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "react-notifications/lib/notifications.css";
import axios from "axios";
import {Link} from "react-router-dom";


class ProductsViewComponent extends Component {
  state = {
    name: "",
    des: "",
    qty: "",
    userId: ""

  };

  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/api/products/getProduct/" + this.props.match.params.id
      )
      .then((response) => {
        this.setState({
          name: response.data.name,
          des: response.data.des,
          qty: response.data.qty,
          userId: response.data.userId,

        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    axios
        .get(
            "http://localhost:5000/api/products/getProduct/" + this.props.match.params.id
        )
        .then((response) => {
          this.setState({
            name: response.data.name,
            des: response.data.des,
            qty: response.data.qty,
            userId: response.data.userId,

          });
        })
        .catch(function (error) {
          console.log(error);
        });

  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object.isRequired,
  };


/////////////////////////////////////////////////////////////
  render() {



    return (
      <div>
        
        <br/>
        <div className="container ">
          <div className="row">
            <div className="col-sm">
              <br />
              <h4 className="font-weight-bold text-left">
                Name : {this.state.name}
              </h4>
              <br />
            </div>
            <div className="col-sm">

              <br />
              <h4 className="font-weight-bold text-center">
                Qty : {this.state.qty}
              </h4>
              <br />

            </div>

            <div className="col-sm">

              <br />
              <h6 className="font-weight-bold text-right">
                Added By : {this.state.userId}
              </h6>
              <br />

            </div>
          </div>
          <br/>
          <div className="row">
            <h6>Description : </h6>
            <textarea  style={{fontSize : '25px'}}   rows="5" cols="80" readOnly value={this.state.des}>{this.state.des}</textarea>

            <br/><br/>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

  isAuthenticated: state.user.isAuthenticated,
  user: state.user,
});

export default connect(mapStateToProps, null)(ProductsViewComponent);
