import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { APP_ROUTES, AuthHelpers } from "../../utils";
import { Button, Popper } from "@mui/base";
import { FaUserCircle } from "react-icons/fa";
const linksDef = [
  {
    text: "Features",
    link: `${APP_ROUTES.HOME}#features_section`,
  },
  {
    text: "Manual Mode",
    link: APP_ROUTES.HOME,
  },
  {
    text: "Testimonials",
    link: APP_ROUTES.HOME,
  },
  {
    text: "FAQs",
    link: APP_ROUTES.HOME,
  },
];
const Header = ({ links = linksDef }) => {
  const [open, setOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const navigate = useNavigate();
  const anchorEl = useRef();
  const location = useLocation();
  const handleClick = () => {
    // e.preventDefault();
    setOpen(!open);
  };
  useEffect(() => {
    setIsAuth(AuthHelpers.isAuthenticated());
  }, [trigger]);

  // const open = Boolean(anchorEl);
  // const id = open ? "simple-popper" : undefined;
  return (
    <header className="flex mb-10 w-full">
      <Link
        className=" text-4xl flex items-center  text-black w-1/6 text-start"
        to={isAuth ? APP_ROUTES.QUIZZES : APP_ROUTES.HOME}
      >
        Quizzify.in
      </Link>
      {/* <p className="font-normal text-black mr-auto"></p> */}
      <nav className="flex items-center w-5/6 justify-between">
        <span className="flex items-end gap-8 ml-auto mr-10 justify-between">
          {links.map((link, index) => (
            <Link
              className={`font-normal text-xl flex items-center ${
                location.pathname === link.link ? "text-green" : ""
              } text-black  justify-end`}
              to={link.link}
            >
              {link.text}
            </Link>
          ))}
        </span>
        {!isAuth ? (
          <Link
            className="font-normal  flex items-center text-black  justify-end"
            to={APP_ROUTES.LOGIN}
          >
            <Button className="py-1 px-4 border rounded-sm border-black border-1">
              Login/Signup
            </Button>
          </Link>
        ) : (
          <span ref={anchorEl}>
            <Button
              onMouseEnter={handleClick}
              onMouseLeave={
                () => handleClick()
                // setTimeout(() => {
                // }, 2000)
              }
              className="py-2 rounded-lg  px-4 border  border-black border-1"
            >
              User Profile
            </Button>
            {/* <FaUserCircle
              className="cursor-pointer h-8 w-8 transition border text-black text-sm font-sans font-semibold leading-normal   rounded-lg"
              // aria-describedby={id}
              type="button"
              // onClick={handleClick}
              onMouseEnter={handleClick}
              onMouseLeave={
                () => handleClick()
                // setTimeout(() => {
                // }, 2000)
              }
            /> */}
          </span>
        )}
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
              setTrigger(!trigger);
              navigate(APP_ROUTES.HOME);
            }}
            className=" z-50 rounded-lg cursor-pointer font-medium font-sans text-sm m-1 p-3 border border-solid border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md text-slate-900 dark:text-slate-100"
          >
            Logout
          </div>
        </Popper>
      </nav>
    </header>
  );
};

export default Header;
