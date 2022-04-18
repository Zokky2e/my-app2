import React from "react";
import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";
function MeetupList(props) {
  function onMeetupRemoveHandler(){
    props.onRemoveMeetup();
  }
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <MeetupItem
          
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
          description={meetup.description}
          onRemove = {onMeetupRemoveHandler}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
