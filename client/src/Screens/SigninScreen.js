import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SigninScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    //TODO: signin action
  };

  return (
    <>
      <form className="form" onSubmit={onSubmitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            name="email"
            id="email"
            placeholder="Enter email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            name="password"
            id="password"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword('')}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New Customer ? <Link to="/register">Create an Account</Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default SigninScreen;
