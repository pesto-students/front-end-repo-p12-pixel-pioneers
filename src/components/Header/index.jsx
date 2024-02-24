import React from "react";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "../../utils";
import { Button } from "@mui/base";

const Header = (props) => {
  return (
    <header className="flex flex-row">
      <Link
        className="font-normal flex items-center   text-black w-1/6 text-start"
        to={APP_ROUTES.HOME}
      >
        Quizzify
      </Link>
      {/* <p className="font-normal text-black mr-auto"></p> */}
      <nav className="grid grid-cols-6 w-5/6">
        <Link
          className="font-normal flex items-center   text-black  justify-end"
          to={APP_ROUTES.HOME}
        >
          Features
        </Link>
        <Link
          className="font-normal  flex items-center text-black  justify-end"
          to={APP_ROUTES.HOME}
        >
          Features
        </Link>
        <Link
          className="font-normal  flex items-center text-black  justify-end"
          to={APP_ROUTES.HOME}
        >
          Features
        </Link>
        <Link
          className="font-normal  flex items-center text-black  justify-end"
          to={APP_ROUTES.HOME}
        >
          Features
        </Link>
        <Link
          className="font-normal  flex items-center text-black  justify-end"
          to={APP_ROUTES.HOME}
        >
          Features
        </Link>
        <Link
          className="font-normal  flex items-center text-black  justify-end"
          to={APP_ROUTES.HOME}
        >
          <Button className="py-1 px-4 border rounded-sm border-black border-1">
            Login/Signup
          </Button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
