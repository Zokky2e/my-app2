import React from 'react';
import MeetupList from '../components/meetups/MeetupList';

import { DUMMY_DATA } from "../store/DummyData";

function AllMeetupsPage() {
  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={DUMMY_DATA}/>
    </section>
  );
}

export default AllMeetupsPage;
