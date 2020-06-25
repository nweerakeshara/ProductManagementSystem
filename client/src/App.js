import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route,  Switch } from "react-router-dom";

import RegisterUser from "./components/register.component";
import LoginUser from "./components/login.component";
import NavbarComponent from "./components/navbar.component";
import ProductList from "./components/productsList.component";
import ProductViewComponent from "./components/productsView.component";
import SearchProductListComponent from "./components/searchProductsList.component";
import AddProductOrLoginComponent from "./components/addProductOrLogin.component";

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

                         <NavbarComponent/>
                         <div className="container">

                             <br/>

                             <Switch>
                                 <Route exact path='/' component={ProductList}/>
                                 <Route exact path='/registerUser' component={RegisterUser}/>
                                 <Route exact path='/loginUser' component={LoginUser}/>
                                 <Route exact path='/addProduct' component={AddProductOrLoginComponent}/>
                                 <Route exact path='/view/:id' component={ProductViewComponent}/>
                                 <Route exact path='/search' component={SearchProductListComponent}/>

                             </Switch>
                         </div>

                 </Provider>
             </Router>


         </div>

     );
 }
}

export default App;
