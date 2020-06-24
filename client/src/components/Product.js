import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import WishList from "./WishList";
import Ratings, { UserRating } from "../components/UI/Ratings";

export default function Product(props) {
  const [cart, setCart] = useContext(CartContext);

  //Handle add to cart click
  const addToCart = () => {
    const product = {
      name: props.name,
      price: props.price,
      id: props.id,
    };
    setCart((currentCart) => [...currentCart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div>
      <h2>{props.name}</h2>
      <h4>{props.price}</h4>
      <Ratings></Ratings>
      <UserRating cusId="4" id={props.id}></UserRating>
      <button onClick={addToCart}>Add To Cart</button> <br /> <br />
      <WishList
        name={props.name}
        price={props.price}
        id={props.id}
        key={props.key}
      />
      <br />
      <hr></hr>
    </div>
  );
}
