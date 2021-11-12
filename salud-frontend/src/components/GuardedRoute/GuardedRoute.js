import React from "react";
import { Route, Redirect } from "react-router-dom";
const jwt = require("jsonwebtoken");

export default function GuardedRoute({ component: Component, ...rest }) {
  const user = JSON.parse(localStorage.getItem("user"));

  console.log(user.data);
  console.log(user);

  function isExpired() {
    const { exp } = jwt.decode(user.data);

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
