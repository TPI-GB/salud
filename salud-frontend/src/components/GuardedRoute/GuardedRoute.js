import React from "react";
import { Route, Redirect } from "react-router-dom";
const jwt = require("jsonwebtoken");

export default function GuardedRoute({ component: Component, ...rest }) {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const access = user
    ? user.data.roles.some((r) => rest.roles.includes(r))
    : null;

  function isExpired() {
    const { exp } = jwt.decode(user.data.token);

    return Date.now() >= exp * 1000;
  }

  //   return (
  //     <Route
  //       {...rest}
  //       render={(props) =>
  //         user && !isExpired() && access ? (
  //           <Component {...props} />
  //         ) : (
  //           <Redirect to="/login" />
  //         )
  //       }
  //     />
  //   );
  // }

  return (
    <Route
      {...rest}
      render={(props) =>
        user && !isExpired() ? (
          access ? (
            <Component {...props} />
          ) : (
            <Redirect to="/error401" />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
