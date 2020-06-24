import React, { Component } from "react";
import ProductList from "../ProductList";
import Cart from "../Cart";
import Carousel from "../UI/Carousel";
import WishListView from "../WishList.view";

export default class User extends Component {
  render() {
    return (
      <div>
        <h3 align="center"> This is User page </h3>
        <Cart buttonLabel="Items in Cart" /> <br />
        <WishListView buttonLabel="Wish List" />
        <Carousel></Carousel>
        <ProductList />
      </div>
    );
  }
}
