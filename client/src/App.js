import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Layout/Header';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import Footer from './Layout/Footer';
import CartScreen from './Screens/CartScreen';
import SigninScreen from './Screens/SigninScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ShippingAddressScreen from './Screens/ShippingAddressScreen';

const App = () => {
  return (
    <Router>
      <div className="grid-container">
        <Header />
        <main>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/shipping" component={ShippingAddressScreen} />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
