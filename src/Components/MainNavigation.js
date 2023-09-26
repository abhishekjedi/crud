import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <nav className={classes.navigation}>
        <p className={classes.heading}>Contacts</p>
        <ul className={classes.list}>
          <li>
            <NavLink to="/" className={classes.active} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/addUser" className={classes.active}>
              ADD USER
            </NavLink>
          </li>
        </ul>
      </nav>
      <ToastContainer position="top-center" limit={1}></ToastContainer>
    </header>
  );
};

export default MainNavigation;
