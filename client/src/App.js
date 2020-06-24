import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import RegisterUser from "./customer_components/register.component";
import LoginUser from "./customer_components/login.component";
import NavbarComponent from "./customer_components/navbar.component";
import ProductList from "./customer_components/productsList.component";
import ProductViewComponent from "./customer_components/productsView.component";
import SearchProductListComponent from "./customer_components/searchProductsList.component";
import AddProductComponent from "./customer_components/addProducts.component";

import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from "./actions/userActions";
import disableBrowserBackButton from 'disable-browser-back-navigation';




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
                                 <Route exact path='/' component={ProductList}/>
                                 <Route exact path='/registerUser' component={RegisterUser}/>
                                 <Route exact path='/loginUser' component={LoginUser}/>
                                 <Route exact path="/addProduct" component={AddProductComponent}/>
                                 <Route exact path="/view/:id" component={ProductViewComponent}/>
                                 <Route exact path='/search' component={SearchProductListComponent}/>

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
