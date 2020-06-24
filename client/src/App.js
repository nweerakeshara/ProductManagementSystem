import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import RegisterCustomer from "./customer_components/register.component";

import LoginCustomer from "./customer_components/login.component";
import { CartProvider } from "./components/CartContext";
import Guest from "./components/GuestPage/guest.component";
import User from "./components/UserPage/user.component";
import AddProduct from "./components/StoreManagerPage/addProduct.component";
import FullTable from "./components/StoreManagerPage/fullTable.component";
import Admin2 from "./components/AdminPage/admin2.component";
import EditProduct from "./components/StoreManagerPage/editProduct.component";
import AddStoreManager from "./components/AdminPage/addStoreManager.component";
import Carousel from "./components/UI/Carousel";
import NavbarComponent from "./customer_components/navbar.component";
import ItemList from "./customer_components/productsList.component";
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from "./actions/cusActions";
import StoreManager from "./components/StoreManagerPage/storemanager.component";
import ProductCategory from "./components/AdminPage/addProductCategory.component";
import disableBrowserBackButton from 'disable-browser-back-navigation';
import AdminLogin from "./components/AdminPage/adminLogin";
import ItemViewComponent from "./customer_components/productsView.component";
import StoreManagerLogin from "./components/StoreManagerPage/storeManagerLogin";
import SearchItemListComponent from "./customer_components/searchProductsList.component";


class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
    disableBrowserBackButton();
  }

  render() {
    return (
      <div>

             <Router>
                 <Provider store={store}>
                     <CartProvider>
                         <NavbarComponent/>
                         <div className="container">

                             <br/>

                             <Switch>
                                 <Route exact path='/' component={ItemList}/>
                                 <Route exact path='/registerCus' component={RegisterCustomer}/>
                                 <Route exact path='/loginCus' component={LoginCustomer}/>
                                 <Route exact path="/guest" component={Guest}/>
                                 <Route exact path="/user" component={User}/>
                                 <Route exact path="/storemanager" component={StoreManagerLogin}/>
                                 <Route exact path="/admin2" component={Admin2}/>
                                 <Route exact path="/addProduct" component={AddProduct}/>
                                 <Route exact path="/edit/:id" component={EditProduct}/>
                                 <Route exact path="/view/:id" component={ItemViewComponent}/>
                                 <Route exact path="/addDiscount" component={FullTable}/>
                                 <Route exact path="/addStoreManager" component={AddStoreManager}/>
                                 <Route exact path="/addProductCategory" component={ProductCategory}/>
                                 <Route exact path="/admin" component={AdminLogin}/>
                                 <Route exact path="/storemanager2" component={StoreManager}/>
                                 <Route exact path='/search' component={SearchItemListComponent}/>

                             </Switch>
                         </div>
                     </CartProvider>
                 </Provider>
             </Router>


         </div>

     );
 }
}

export default App;
