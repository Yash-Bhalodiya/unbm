import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'; // Make sure style.css is in the same folder or adjust the path

const Login = () => {
  return (
    <div className="background-blur">
      <div className="login-card">
        {/* Left panel */}
        <div className="left-panel">
          <h1>Urban Nexus:</h1>
          <p>Business Mapper</p>
        </div>

        {/* Right panel */}
        <div className="right-panel">
          <Link to="/" className="back-link">&larr; Back</Link>
          <h2>Login</h2>
          <p className="subtext">
            If you are already an Admin, you can login with your email address and password.
          </p>

          <form>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Enter your username" required />

            <label htmlFor="email">Email address</label>
            <input type="email" id="email" placeholder="Enter your email" required />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required />

            <div className="remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>

            <button type="submit" className="register-btn">Register Account</button>

            <p className="signup">
              Don't have an account? <a href="#">Sign up here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
