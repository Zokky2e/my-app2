import {get, ref, remove } from "firebase/database";
import React, { createContext} from "react";
import { auth, db } from "../firebase";

const FavoritesContext = createContext({
  addFavorite: (favoriteMeetup) => {},
  removeFavorite: (meetupId) => {},
  itemIsFavorite: (meetupId) => {},
});


export function FavoritesContextProvider(props) {
  const currentUser = auth.currentUser;
  function addFavoriteHandler(favoriteMeetup) {
    const meetupData = {
      id: favoriteMeetup.id,
      title: favoriteMeetup.title,
      image: favoriteMeetup.image,
      address: favoriteMeetup.address,
      description: favoriteMeetup.description,
    };
    //set(ref(db, "/"+currentUser?.uid+"/"))
    fetch(
      "https://dummy-app-96a38-default-rtdb.europe-west1.firebasedatabase.app/"+currentUser?.uid+"/.json",
      {
        method: "POST",
        body: JSON.stringify(meetupData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      FavoritesContext.totalFavorites++;
      
    });
  }

  function removeFavoriteHandler(meetupId) {
    remove(ref(db, "/"+currentUser?.uid+"/" + meetupId)).then(console.log("added to"+currentUser));
  }

  function itemIsFavoriteHandler(props) {
    get(ref(db,"/"+currentUser?.uid+"/")).then((snapshot) => {
      if (snapshot.exists()) {
        for(const key in snapshot){
          if(key.address === props.address)
          return true;
        }
        return false;
      } else {
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  const context = {
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}
export default FavoritesContext;
