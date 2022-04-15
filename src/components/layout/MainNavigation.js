import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css"
import React from 'react';

function MainNavigation() {
  return (
    <header className ={classes.header}>
      <p className={classes.logo} >React Meetups</p>
      <nav>
        <ul>
          <li><Link to="/">All Meetups</Link></li>
          <li><Link to="/new-meetup">New Meetup</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
