import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Layout/Header";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import Footer from "./Layout/Footer";

const App = () => {
  return (
    <Router>
      <div className="grid-container">
        <Header />
        <main>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/product/:id" component={ProductScreen} />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
