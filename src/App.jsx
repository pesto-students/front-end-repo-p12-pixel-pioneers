import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "@mui/base/Button";
// import "./App.scss";
import { Provider } from "react-redux";
import Store from "./redux/store";
import "./App.css";
import Child from "./Child";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Provider store={Store}>
        {/* <AppContainer /> */}
        <h1 className="text-3xl text-red-700 font-bold underline">
          Hello world!
        </h1>
        <Button className="bg-red-700 text-white px-4">button</Button>
        <Child />
      </Provider>
    </>
  );
}

export default App;
