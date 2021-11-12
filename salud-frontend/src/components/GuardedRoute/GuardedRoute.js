import React from "react";
import { Route, Redirect } from "react-router-dom";
const jwt = require("jsonwebtoken");

export default function GuardedRoute({ component: Component, ...rest }) {
  const user = JSON.parse(localStorage.getItem("user"));

  function isExpired() {
    const { exp } = jwt.decode(user.data.token);

    return Date.now() >= exp * 1000;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        user && !isExpired() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
