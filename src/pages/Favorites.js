import { wait } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { auth } from "../firebase";
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
    setIsLoading(true);
    wait(500000); //dodan wait jer je deletanje prebrzo za reloadanje
    fetch(
      "https://dummy-app-96a38-default-rtdb.europe-west1.firebasedatabase.app/" +
        currentUser?.uid +
        "/.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const meetups = [];

        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key],
          };
          meetups.push(meetup);
        }

        setIsLoading(false);
        setLoadingMeetups(meetups);
        doRefresh(false);
      });
  }, [refresher, currentUser]);
  if (isLoading || refresher) {
    return <div>Loading....</div>;
  }
  return (
    <section>
      <h1>My Meetups</h1>
      <MeetupList meetups={loadedMeetups} onRemoveMeetup={deleteHandler} />
    </section>
  );
}

export default FavoritesPage;
