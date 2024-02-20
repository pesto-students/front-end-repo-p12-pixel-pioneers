import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "./redux/actions";

function Child(props) {
  const loginSelector = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginAction("data"));
  }, []);
  console.log(loginSelector, "loginSelector");
  return (
    <div>
      <h3>Child</h3>
    </div>
  );
}

export default Child;
