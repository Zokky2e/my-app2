import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import React, { useContext } from "react";
import FavoritesContext from "../../store/favorites-context";
import { auth } from "../../firebase";
function MainNavigation() {
  const favoritesCtx = useContext(FavoritesContext);
  const currentUser = auth.currentUser;
  let content = {
    pathTo: "/sign-in",
    text: "Sign In",
  };
  if (currentUser === null) {
    content.pathTo = "/sign-in";
    content.text = "Sign In";
  } else {
    content.pathTo = "/profile";
    content.text = "Profile";
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
          <li>
            <Link to="/favorites">
              Favorites
              <span className={classes.badge}>
                {favoritesCtx.totalFavorites}
              </span>
            </Link>
          </li>
          <li>
            <Link to={content.pathTo}>{content.text}</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
