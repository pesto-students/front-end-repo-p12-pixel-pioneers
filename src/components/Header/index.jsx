import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { APP_ROUTES, AuthHelpers } from "../../utils";
import { Button, Popper } from "@mui/base";
import { FaUserCircle } from "react-icons/fa";
const linksDef = [
  {
    text: "Features",
    link: APP_ROUTES.HOME,
  },
  {
    text: "Features",
    link: APP_ROUTES.HOME,
  },
  {
    text: "Features",
    link: APP_ROUTES.HOME,
  },
  {
    text: "Features",
    link: APP_ROUTES.HOME,
  },
];
const Header = ({ links = linksDef }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const anchorEl = useRef();
  const handleClick = () => {
    // e.preventDefault();
    setOpen(!open);
  };

  // const open = Boolean(anchorEl);
  // const id = open ? "simple-popper" : undefined;
  return (
    <header className="flex mb-10 w-full">
      <Link
        className="font-semibold text-3xl flex items-center  text-black w-1/6 text-start"
        to={APP_ROUTES.HOME}
      >
        Quizzify
      </Link>
      {/* <p className="font-normal text-black mr-auto"></p> */}
      <nav className="flex items-center w-5/6 justify-between">
        <span className="flex items-end gap-8 ml-auto mr-10 justify-between">
          {links.map((link, index) => (
            <Link
              className="font-normal flex items-center   text-black  justify-end"
              to={link.link}
            >
              {link.text}
            </Link>
          ))}
        </span>
        <Link
          className="font-normal  flex items-center text-black  justify-end"
          to={APP_ROUTES.HOME}
        >
          <Button className="py-1 px-4 border rounded-sm border-black border-1">
            Login/Signup
          </Button>
        </Link>
        {/* <span ref={anchorEl}>
          <FaUserCircle
            className="cursor-pointer h-8 w-8 transition text-green text-sm font-sans font-semibold leading-normal  text-white rounded-lg"
            // aria-describedby={id}
            type="button"
            // onClick={handleClick}
            onMouseEnter={handleClick}
            onMouseLeave={
              () => handleClick()
              // setTimeout(() => {
              // }, 2000)
            }
          />
        </span> */}
        {/* <button
        >
          Toggle Popper
        </button> */}
        <Popper
          // id={id}

          onMouseEnter={() => setOpen(true)}
          onMouseLeave={
            () => handleClick()
            // setTimeout(() => {
            // }, 2000)
          }
          open={open}
          anchorEl={anchorEl.current}
          // className={`${isDarkMode ? "dark" : ""}`}
        >
          <div
            onClick={() => {
              AuthHelpers.logout();
              navigate(APP_ROUTES.HOME);
            }}
            className=" z-50 rounded-lg font-medium font-sans text-sm m-1 p-3 border border-solid border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md text-slate-900 dark:text-slate-100"
          >
            Logout
          </div>
        </Popper>
      </nav>
    </header>
  );
};

export default Header;
