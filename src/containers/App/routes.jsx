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
import CreateFlow from "../CreateFlow";
import Analytics from "../Analytics";

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
  {
    path: APP_ROUTES.MANUAL_MODE,
    isProtected: false,
    properties: { mode: "manual" },
    component: CreateFlow,
  },
  {
    path: APP_ROUTES.AI_MODE,
    isProtected: false,
    properties: { renderPath: APP_ROUTES.AI_MODE },
    component: Analytics,
  },
  {
    path: APP_ROUTES.EDIT_QUIZ,
    isProtected: false,
    properties: { mode: "edit" },
    component: CreateFlow,
  },
  {
    path: APP_ROUTES.ATTEMPT_QUIZ,
    isProtected: false,
    properties: { mode: "attempt" },
    component: CreateFlow,
  },
  {
    path: APP_ROUTES.VIEW_QUIZ_ANALYTICS,
    isProtected: false,
    properties: { renderPath: APP_ROUTES.VIEW_QUIZ_ANALYTICS },
    component: Analytics,
  },
  {
    path: APP_ROUTES.VIEW_USER_ANALYTICS_FOR_QUIZ,
    isProtected: false,
    properties: { renderPath: APP_ROUTES.VIEW_USER_ANALYTICS_FOR_QUIZ },
    component: Analytics,
  },
  {
    path: APP_ROUTES.QUIZZES,
    isProtected: false,
    properties: { renderPath: APP_ROUTES.QUIZZES },
    component: Analytics,
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
                (
                  { component: Component, path, isProtected, properties },
                  index
                ) => (
                  <Route
                    element={<Component {...properties} />}
                    path={path}
                    key={index}
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
                (
                  { component: Component, path, isProtected, properties },
                  index
                ) => (
                  <Route
                    element={<Component {...properties} />}
                    path={path}
                    key={index}
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
