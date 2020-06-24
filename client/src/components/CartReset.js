import React,{useContext} from 'react'
import { CartContext } from "./CartContext";

export default function CartReset({ buttonLabel, history }) {
    const [cart, setCart] = useContext(CartContext);
   
    return (
      <div>
       {setCart([])}
      </div>
    );
  }
  