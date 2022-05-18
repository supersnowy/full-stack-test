import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { useSelector } from "react-redux";
import store from './store';

import routes from './routes';

import { useRoutes, useNavigate, useLocation } from 'react-router-dom';

import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

const App = () => {
  const routing = useRoutes(routes);
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useSelector(state => state);

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/home', { replace: true });
    } else if (location.pathname === '/home') {
      navigate('/login', { replace: true });
    }
  }, [auth, navigate]);

  return (
    <div>
      {routing}
    </div>
  );
}
export default App;
