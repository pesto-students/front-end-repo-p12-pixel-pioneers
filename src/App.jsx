import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "@mui/base/Button";
// import "./App.scss";
import { Provider } from "react-redux";
import Store from "./redux/store";
import "./App.css";
import Child from "./Child";
import AppContainer from "./containers/App";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <>
      <Provider store={Store}>
        <AppContainer />
        {/* <h1 className="text-3xl text-red-700 font-bold underline">
          Hello world!
        </h1>
        <Button className="bg-red-700 text-white px-4">button</Button>
        <Child /> */}
      </Provider>
    </>
  );
}

export default App;
