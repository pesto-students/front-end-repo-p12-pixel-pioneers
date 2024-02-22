import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  //   Switch,
  Route,
  Routes,
  Navigate,
  Outlet,
  //   Redirect,
} from "react-router-dom";
// import { getUserAction } from "../../redux/actions";
import { API_CONSTANTS, APP_ROUTES } from "../../utils";
import { AuthHelpers } from "../../helpers";
import Home from "../../components/Home";

const allRoutes = [
  {
    path: APP_ROUTES.HOME,
    isProtected: true,
    properties: { ketan: 1 },
    component: Home,
  },
  {
    path: APP_ROUTES.LOGIN,
    isProtected: false,
    properties: { ketan: 2 },
    component: Home,
  },
];
const PrivateRoutes = (props) => {
  console.log(props, "PrivateRoutes");
  //   let auth = { token: false };
  const isAuthenticated = true;
  return isAuthenticated ? (
    <Outlet {...props} />
  ) : (
    <Navigate to={APP_ROUTES.LOGIN} />
  );
};
const PublicRoutes = (props) => {
  return <Outlet {...props} />;
};
const RoutesFunc = (props) => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            {allRoutes
              .filter((route) => route.isProtected)
              .map(
                ({ component: Component, path, isProtected, properties }) => (
                  <Route
                    element={<Component {...properties} />}
                    path={path}
                    exact
                  />
                )
              )}
            {/* <Route element={<Home />} path="/" exact /> */}
          </Route>
          <Route element={<PublicRoutes />}>
            {allRoutes
              .filter((route) => !route.isProtected)
              .map(
                ({ component: Component, path, isProtected, properties }) => (
                  <Route
                    element={<Component {...properties} />}
                    path={path}
                    exact
                  />
                )
              )}
            {/* <Route element={<Home />} path="/" exact /> */}
          </Route>
          <Route path="*" element={<Navigate to={APP_ROUTES.HOME} replace />} />
        </Routes>
      </Router>
    </>
  );
};

export default RoutesFunc;
