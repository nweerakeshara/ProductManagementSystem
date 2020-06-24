import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-notifications/lib/notifications.css";
import ModalPrompt from "../components/UI/ModalPrompt";
import { Link } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import { Spinner } from "reactstrap";

export default function WishList({ name, price, id, usr_id, img_id }) {
  //add wishlist items to DB
  const addToWishList = (e) => {
    const product = {
      product_name: name,
      product_price: price,

      product_id: id + usr_id,
      user_ID: usr_id,
      img_ID: img_id,
      item_ID: id,
    };

    axios
      .post("http://localhost:5000/api/wishlist/add", product)
      .then((res) => {
        if (res.data.success == true) {
          NotificationManager.success(
            "Click Here to view the Wish List",
            "Item Added to the Wish List",
            3000,
            () => {
              toggle(); // calling the toggle function
            }
          );
        } else {
          NotificationManager.error(
            "Click Here to view the Wish List",
            "Item is already in the Wish List",
            3000,
            () => {
              toggle();
            }
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [wishlist, setWishList] = useState([]);

  //fires everytime when the component is mounted
  useEffect(() => {
    axios

      .get(`http://localhost:5000/api/wishlist/get/${usr_id}`) //get data from userID
      .then((res) => {
        setWishList(res.data); //save retrieved data to the hook
      });
  });

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  //deleting an item from the wish list
  const deleteItem = (e) => {
    axios
      .delete(
        `http://localhost:5000/api/wishlist/delete/${e.target.value}/${usr_id}`
      )
      .then((res) => {
        NotificationManager.info("Item is Successfully deleted", "", 3000);

        console.log(res.data);
      })
      .catch((err) => console.log("Error"));
  };

  return (
    //used a react strap component (modal) in order to have a popup windows to show the data
    //inside a table
    <div>
      <button
        onClick={addToWishList}
        type="button"
        className="btn btn-info btn-block "
      >
        Add to Wish List
      </button>
      <NotificationContainer />
      <Modal size="lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Your Wish List</ModalHeader>
        {wishlist.length === 0 ? (
          <ModalBody>
            <p>You haven’t added any items to your Wish List yet</p>
            <Spinner color="success" />
          </ModalBody>
        ) : (
          <ModalBody>
            <Table dark striped bordered hover>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Item</th>
                  <th>Price</th>
                  <th style={{ textAlign: "center" }}>View The Item</th>
                  <th style={{ textAlign: "center" }}>Add to Cart</th>
                  <th>Action</th>
                </tr>
              </thead>
              {wishlist.map((item) => (
                <tbody key={item.product_id}>
                  <tr>
                    <th scope="row">
                      <img
                        height="110px"
                        width="130px"
                        src={`/uploads/${item.img_ID}`}
                      />
                    </th>

                    <td>{item.product_name}</td>
                    <td>{item.product_price}</td>
                    <td>
                      <Link
                        style={{ margin: "0", padding: "0" }}
                        to={"/view/" + id}
                        className="nav-link"
                      >
                        <button className="btn btn-success btn-block">                         
                          View This Item{" "}
                        </button>
                        <br></br>
                      </Link>
                    </td>
                    <td>
                      <ModalPrompt
                        id={item._id}
                        name={item.product_name}
                        price={item.product_price}
                      ></ModalPrompt>
                    </td>
                    <td>
                      <button
                        value={item.product_id}
                        onClick={deleteItem}
                        type="button"
                        className="btn btn-primary btn-block"
                      >
                        Delete this Item
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </ModalBody>
        )}

        <ModalFooter>
          <Button color="warning" onClick={toggle}>
            Shop Now
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
