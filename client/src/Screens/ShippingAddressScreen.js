import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../Actions/CartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingAddressScreen = (props) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!userInfo) {
    props.history.push('/signin');
  }

  //TODO: by doing this, when user click button Continue, the dispatch(saveShippingAddress is going to run)
  // then when we come back all the filled information have been saved to localstorage
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    //TODO:dispatch saving Shipping address Action
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country }),
    );

    //TODO: continue proceeding
    props.history.push('/payment');
  };

  return (
    <div>
      <CheckoutSteps step1 step2 />
      <form className="form" onSubmit={onSubmitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            value={fullName}
            placeholder="Enter Full Name..."
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            value={address}
            placeholder="Enter Your Address..."
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            value={city}
            placeholder="Enter Your City..."
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="postalcode">Postal Code</label>
          <input
            type="text"
            name="postalcode"
            id="postalcode"
            value={postalCode}
            placeholder="Enter Your Postal Code..."
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            value={country}
            placeholder="Enter Your Country..."
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingAddressScreen;
