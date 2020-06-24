import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";

export default function Cart({ buttonLabel, history }) {
  const [cart, setCart] = useContext(CartContext);
  const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const saveOrder = () => {
    const order = {
      total_price: totalPrice.toPrecision(4),
      items: cart,
    };

    axios.post("http://localhost:5000/api/order/add", order).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        alert("Order Successful");

        setCart([]);

        toggle();
      }
    });
  };

  //Handle delete
  const handleDelete = (e) => {
    console.log(e.target.id);
    setCart(cart.filter((item) => item.id !== e.target.id));
  };

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        {`Items in Cart ${cart.length}`}
      </Button>
      <Modal size="lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Your Shopping Cart</ModalHeader>
        {cart.length === 0 ? (
          <ModalBody>
            <p>No Items in Cart</p>
          </ModalBody>
        ) : (
          <ModalBody>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Price</th>
                </tr>
              </thead>
              {cart.map((item) => (
                <tbody>
                  <tr>
                    <th scope="row">{item.id.toUpperCase().substring(0, 4)}</th>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                      <Button id={item.id} onClick={handleDelete}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
            <p>Total Price: {totalPrice.toPrecision(4)}</p>
          </ModalBody>
        )}

        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Continue Shopping
          </Button>
          {cart.length !== 0 ? (
            <Button color="primary" onClick={saveOrder}>
              Checkout
            </Button>
          ) : null}
        </ModalFooter>
      </Modal>
    </div>
  );
}
