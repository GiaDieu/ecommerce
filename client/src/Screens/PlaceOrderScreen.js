import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../Actions/orderAction';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const PlaceOrderScreen = (props) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;

  if (!paymentMethod) {
    props.history.push('/payment');
  }

  const toPrice = (num) => Number(num.toFixed(2)); //5.123 => '5.12' => 5.12

  //create new key in object cart reducer
  cart.itemsPrice = toPrice(cartItems.reduce((a, c) => a + c.qty * c.price, 0));
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    //TODO: dispatch place order action
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    //reason for creating new key orderitems, because the server backend is requiring orderItems
  };

  const ordersCreate = useSelector((state) => state.ordersCreate);
  const { loading, success, order, error } = ordersCreate;

  //when Rendering Component, useEffect is going to run 1 time, nothing updated, and when we clicking placeholder button,
  //Component will be rerendered, and this time useEffect is going to run again and get dependency from the success is true or not from reducer store,
  //if it is true,which means it is updating then the callback function in useEffect is going to run including dispatch({type: ORDER_CREATE_RESET}),
  //then component will be rendered third time, and the useEffect is going to run the last time, but there is no success dependency, it stops

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, props.history, dispatch, loading, error, order]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong> {shippingAddress.fullName} <br />
                  <strong>Address: </strong> {shippingAddress.address} ,{' '}
                  {shippingAddress.city} , {shippingAddress.postalCode},{' '}
                  {shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method: </strong> {paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Ordered Items</h2>
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
                          <Link to={`/product/${cartItem.id}`}>
                            {cartItem.name}
                          </Link>
                        </div>

                        <div>
                          {cartItem.qty} x ${cartItem.price} = $
                          {cartItem.qty * cartItem.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>items</div>
                  <div>${cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={cartItems.length === 0}
                >
                  Place Order
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
