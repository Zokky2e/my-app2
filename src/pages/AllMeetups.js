import { wait } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { auth } from "../firebase";

function AllMeetupsPage() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [refresher, doRefresh] = useState(false);
  function deleteHandler() {
    setLoadingMeetups([]);
    doRefresh(true);
  }
  const [loadedMeetups, setLoadingMeetups] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    wait(500000); //dodan wait jer je deletanje prebrzo za reloadanje
    fetch(
      "https://dummy-app-96a38-default-rtdb.europe-west1.firebasedatabase.app/meetups.json"
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
        console.log("refreshed");
      });
  }, [refresher]);
  if (isLoading || refresher) {
    return <div>Loading....</div>;
  }


  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList
        meetups={loadedMeetups}
        onRemoveMeetup={deleteHandler}
      />
    </section>
  );
}

export default AllMeetupsPage;
