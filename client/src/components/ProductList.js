import React from "react";
import Product from "./Product";

export default function ProductList() {
  const productsData = [
    {
      name: "Red Tshirt",
      price: 10.99,
      id: 1,
    },
    {
      name: "Blue Tshirt",
      price: 24.99,
      id: 2,
    },
    {
      name: "Yellow Tshirt",
      price: 18.99,
      id: 3,
    },
  ];

  return (
    <div>
      {productsData.map((item) => (
        <Product
          name={item.name}
          price={item.price}
          id={item.id}
          key={item.id}
        ></Product>
      ))}
    </div>
  );
}
