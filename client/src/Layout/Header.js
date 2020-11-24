import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  return (
    <header className="row">
      <div>
        <Link className="brand" to="/">
          giadieu
        </Link>
      </div>
      <div>
        <Link to="/cart">Cart</Link>
        {cartItems.length > 0 && (
          <span className="badge">{cartItems.length}</span>
        )}
        <Link to="/signin">Sign In</Link>
      </div>
    </header>
  );
};

export default Header;
