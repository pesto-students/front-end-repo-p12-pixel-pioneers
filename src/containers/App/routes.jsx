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
import Login from "../../components/Auth/Login";
import ForgotPassword from "../../components/Auth/ForgotPassword";
import ResetPassword from "../../components/Auth/ResetPassword";
import Signup from "../../components/Auth/Signup";
import { toast } from "react-toastify";

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
    component: Login,
  },
  {
    path: APP_ROUTES.FORGOT_PASSWORD,
    isProtected: false,
    properties: { ketan: 2 },
    component: ForgotPassword,
  },
  {
    path: APP_ROUTES.RESET_PASSWORD,
    isProtected: false,
    component: ResetPassword,
  },
  {
    path: APP_ROUTES.REGISTER,
    isProtected: false,
    component: Signup,
  },
  {
    path: APP_ROUTES.MANUAL_MODE,
    isProtected: true,
    properties: { mode: "manual" },
    component: CreateFlow,
  },
  {
    path: APP_ROUTES.AI_MODE,
    isProtected: true,
    properties: { renderPath: APP_ROUTES.AI_MODE },
    component: Analytics,
  },
  {
    path: APP_ROUTES.EDIT_QUIZ,
    isProtected: true,
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
    isProtected: true,
    properties: { renderPath: APP_ROUTES.VIEW_QUIZ_ANALYTICS },
    component: Analytics,
  },
  {
    path: APP_ROUTES.VIEW_USER_ANALYTICS_FOR_QUIZ,
    isProtected: true,
    properties: { renderPath: APP_ROUTES.VIEW_USER_ANALYTICS_FOR_QUIZ },
    component: Analytics,
  },
  {
    path: APP_ROUTES.QUIZZES,
    isProtected: true,
    properties: { renderPath: APP_ROUTES.QUIZZES },
    component: Analytics,
  },
];
const PrivateRoutes = (props) => {
  console.log(props, "PrivateRoutes");
  //   let auth = { token: false };
  const isAuthenticated = AuthHelpers.isAuthenticated();
  if (!isAuthenticated) {
    toast.error("Please Login");
  }
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
