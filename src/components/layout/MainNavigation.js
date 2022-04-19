import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import React, {} from "react";
import { auth } from "../../firebase";
function MainNavigation() {
  const currentUser = auth.currentUser;
  
  let loggedInStuff;
  let content = {
    pathTo: "/sign-in",
    text: "Sign In",
  };
  if (currentUser === null) {
    content.pathTo = "/sign-in";
    content.text = "Sign In";
    loggedInStuff = null;
  } else {
    content.pathTo = "/profile";
    content.text = "Profile";
    loggedInStuff = (
      <li>
        <Link to="/favorites">
          Favorites
        </Link>
      </li>
    );
    console.log(currentUser?.uid);
    console.log(currentUser?.email);
  }

  return (
    <header className={classes.header}>
      <p className={classes.logo}>React Meetups</p>
      <nav>
        <ul>
          <li>
            <Link to="/">All Meetups</Link>
          </li>
          <li>
            <Link to="/new-meetup">New Meetup</Link>
          </li>
          {loggedInStuff}
          <li>
            <Link to={content.pathTo}>{content.text}</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
  }

export default MainNavigation;
