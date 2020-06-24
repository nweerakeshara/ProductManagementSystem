import React, { Component } from "react";
//To keep backend and front end connectivity, we import axios
import axios from "axios";
import ProductTableRow from "./tableRow.component";
import { Link } from "react-router-dom";

export default class FullTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    //type of request is 'get'
    axios.get("http://localhost:5000/api/product")
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  tabRow() {
    return this.state.products.map(function (object, i) {
      return <ProductTableRow obj={object} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <Link to={"/addProduct"} className="btn btn-primary">
          {" "}
          Add Product{" "}
        </Link>
        <h3 align="center"> Products List </h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Product Discount</th>
              <th>Product Category</th>
              <th colSpan="2">Change Discount</th>
            </tr>
          </thead>

          <tbody>{this.tabRow()}</tbody>
        </table>
      </div>
    );
  }
}
