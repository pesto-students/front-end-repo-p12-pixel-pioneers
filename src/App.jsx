import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "@mui/base/Button";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-3xl text-red-700 font-bold underline">
        Hello world!
      </h1>
      <Button className="bg-red-700 text-white px-4">button</Button>
    </>
  );
}

export default App;
