import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  //   Switch,
  Route,
  Routes,
  Navigate,
  //   Redirect,
} from "react-router-dom";
// import { getUserAction } from "../../redux/actions";
import { API_CONSTANTS, APP_ROUTES } from "../../utils";
import { AuthHelpers } from "../../helpers";
import Home from "../../components/Home";

const allRoutes = [
  //   {
  //     path: APP_ROUTES.LOGIN,
  //     protected: false,
  //     properties: { ketan: 1 },
  //     component: AuthContainer,
  //   },
  //   {
  //     path: APP_ROUTES.REGISTER,
  //     protected: false,
  //     component: AuthContainer,
  //   },
  //   {
  //     path: APP_ROUTES.FORGOT_PASSWORD,
  //     protected: false,
  //     component: AuthContainer,
  //   },
  {
    path: APP_ROUTES.HOME,
    protected: false,
    component: Home,
  },
];
const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  console.log(rest, "rest");
  //   const dispatch = useDispatch();
  //   const userSelector = useSelector((state) => state.UserReducer.user);
  //   if (!AuthHelpers.isAuthenticated()) {
  //     return <Navigate replace to={APP_ROUTES.LOGIN}  {...rest} />;
  //   }
  //   if (userSelector.data === API_CONSTANTS.init) {
  //     dispatch(getUserAction());
  //   }

  //   const { userData } = rest;
  //   const currentRoute = allRoutes.filter((items) => items.path === rest.path);
  return (
    <Route
      {...rest}
      render={(routeProps) => <RouteComponent {...routeProps} {...rest} />}
    />
  );
};

const PublicRoute = ({
  component: Component,
  properties,
  restricted,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => <Component properties={properties} {...props} />}
    />
  );
};

const RoutesFunc = (props) => {
  return (
    <>
      <Router>
        <Routes>
          <Route path={APP_ROUTES.HOME} element={<Home />} />
          {/* {
            // props.userData.data ?
            allRoutes.map((items, i) =>
              items.protected ? (
                <PrivateRoute
                  path={items.path}
                  component={items.component}
                  exact
                  key={i}
                  properties={items.properties}
                  {...props}
                />
              ) : (
                <PublicRoute
                  path={items.path}
                  key={i}
                  component={items.component}
                  properties={items.properties}
                  exact
                  {...props}
                />
              )
            )
          } */}
          <>
            {/* <Navigate replace to={"/login"} exact {...props} /> */}
            {/* <Route path="" component={<></>} /> */}
          </>
        </Routes>
      </Router>
    </>
  );
};

export default RoutesFunc;
