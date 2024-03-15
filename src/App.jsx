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
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <>
      <Provider store={Store}>
        <GoogleOAuthProvider clientId="925698554656-5c5kvh7tktm67270gcpkmeffuione6d9.apps.googleusercontent.com">
          <AppContainer />
        </GoogleOAuthProvider>
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
