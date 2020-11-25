import React, { useEffect } from 'react';
import { addToCart } from '../Actions/CartActions';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';

const CartScreen = (props) => {
  const { cartItems } = useSelector((state) => state.cart);

  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCart = (cartItemId) => {
    //delete action
  };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };

  return (
    <div className="row top">
      <div className="col-2">
        <h3>Shopping Cart</h3>
        {cartItems.length === 0 ? (
          <MessageBox>
            Empty Cart <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((cartItem) => (
              <li key={cartItem.id}>
                <div className="row">
                  <div>
                    <img
                      className="small"
                      src={cartItem.image}
                      alt={cartItem.name}
                    />
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${cartItem.id}`}>{cartItem.name}</Link>
                  </div>
                  <div className="cart-select">
                    <select
                      value={cartItem.qty}
                      onChange={(e) =>
                        dispatch(addToCart(cartItem.id, Number(e.target.value)))
                      }
                    >
                      {[...Array(cartItem.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>${cartItem.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(cartItem.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="cart cart-body">
          <ul>
            <li>
              <h2>
                SubTotal: {cartItems.reduce((a, c) => a + parseInt(c.qty), 0)}{' '}
                items: $
                {cartItems.reduce((a, c) => a + parseInt(c.qty * c.price), 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
