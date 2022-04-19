import classes from "./MeetupItem.module.css";
import React, { useContext } from "react";
import Card from "../ui/Card";
import FavoritesContext from "../../store/favorites-context";
import { auth, db } from "../../firebase";
import { ref, remove } from "firebase/database";

function MeetupItem(props) {
  const favoritesCtx = useContext(FavoritesContext);
  const currentUser = auth.currentUser;
  const itemIsFavorite = favoritesCtx.itemIsFavorite(props);
  function toggleFavoriteStatusHandler() {
    if (itemIsFavorite) {
      favoritesCtx.removeFavorite(props.id);
    } else {
      favoritesCtx.addFavorite({
        id: props.id,
        title: props.title,
        image: props.image,
        address: props.address,
        description: props.description,
      });
    }
  }

  function removeMeetupHandler() {
    remove(ref(db, "/"+currentUser?.uid+"/" + props.id)).then(props.onRemove());
  }

  let content;
  if (currentUser !== null) {
    content = (
      <div>
        <button onClick={toggleFavoriteStatusHandler}>
          {itemIsFavorite ? "Remove from Favorites" : "Add To Favorites"}
        </button>
        <button onClick={removeMeetupHandler}>Remove Meetup</button>
      </div>
    );
  } else {
    content = <div></div>;
  }
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>{content}</div>
      </Card>
    </li>
  );
}

export default MeetupItem;
