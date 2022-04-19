import { waitFor } from "@testing-library/react";
import {  get, ref } from "firebase/database";
import React, {  useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { auth, db } from "../firebase";
function FavoritesPage() {
  const currentUser = auth.currentUser;
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadingMeetups] = useState([]);
  const [refresher, doRefresh] = useState(false);
  function deleteHandler() {
    setLoadingMeetups([]);
    doRefresh(true);
  }
  useEffect(() => {
    let meetups=[];
    setIsLoading(true);
    waitFor(500000); //dodan wait jer je deletanje prebrzo za reloadanje
    get(ref(db,"/"+currentUser?.uid+"/")).then((snapshot) => {
      if (snapshot.exists()) {
        meetups = [];
        for(const key in snapshot){
          const meetup = {
            id: key,
            ...snapshot[key],
          };
          meetups.push(meetup);
        }
      } else {
        meetups = [];
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

        setIsLoading(false);
        setLoadingMeetups(meetups);
        doRefresh(false);
        console.log("refreshed");
      }, [refresher, currentUser]);
  if (isLoading || refresher) {
    return <div>Loading....</div>;
  }
  return (
    <section>
      <h1>My Meetups</h1>
      <MeetupList
        meetups={loadedMeetups}
        onRemoveMeetup={deleteHandler}
      />
    </section>
  );
}

export default FavoritesPage;
