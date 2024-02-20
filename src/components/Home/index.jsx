import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/actions";
// import { loginAction } from "./redux/actions";

function Home(props) {
  const loginSelector = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginAction("data"));
  }, []);
  console.log(loginSelector, "loginSelector");
  return (
    <div>
      <h3>Home</h3>
    </div>
  );
}

export default Home;
