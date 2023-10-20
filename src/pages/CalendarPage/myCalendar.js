import React, { useState, useEffect } from "react";
import MyCalendarComponent from "./calendar";
import moment from "moment";
import SideBar from '../../components/Bar.js'
import "./calendarStyles.css"
import { addEvent,getEvent,updateEvent,deleteEvent } from '../Interface.js'

function MyCalendar() {
  const [allEvents, setAllEvents] = useState();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getEvent();
        if (fetchedEvents) {
          setAllEvents(fetchedEvents);
        } else {
          console.error("Failed to fetch events");
          // Optionally, handle the error in your UI.
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        // Handle the error, maybe set some state to show an error message to the user.
      }
    };

    fetchEvents();
  }, []);


  const [newEvent, setNewEvent] = useState({
    title: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    id: "",
  });


  const handleDeleteEvent = async (e) => {
    const response = await deleteEvent(e.id);
    if (response) {
        const updatedEvents = allEvents.filter(event => event.id !== e.id);
        setAllEvents(updatedEvents);
    } else {
        alert("Failed to delete the event. Please try again later.");
    }
  };


  const handleUpdateEvent = async (updatedEvent) => {
    const response = await updateEvent(updatedEvent, updatedEvent.id);
    if (response) {
        const updatedEvents = allEvents.map(event => 
            event.id === updatedEvent.id ? updatedEvent : event
        );
        setAllEvents(updatedEvents);
    } else {
        alert("Failed to update the event. Please try again later.");
    }
  };

  const handleAddEvent = async () => {
    if (
      !newEvent.startDate ||
      !newEvent.startTime ||
      !newEvent.endDate ||
      !newEvent.endTime
    ) {
      alert("Please fill in all date and time fields.");
      return;
    }

    const formatDateTimeISO = (date) => {
      let iso = date.toISOString();
      return iso.replace("Z", "+00:00");
    }

    const formattedEvent = {
      title: newEvent.title,
      start: moment(`${newEvent.startDate} ${newEvent.startTime}`).toDate(),
      end: moment(`${newEvent.endDate} ${newEvent.endTime}`).toDate(),
      id: allEvents.length.toString()

    };

    const secondFormat = (event) => {
      return {
          title: event.title,
          start: formatDateTimeISO(event.start),
          end: formatDateTimeISO(event.end),
          id: event.id
      };
     }

    const response = await addEvent(secondFormat(formattedEvent));

    if (response) {
        setAllEvents([...allEvents, formattedEvent]);
        setNewEvent({
            title: "",
            startDate: "",
            startTime: "",
            endDate: "",
            endTime: "",
            id: ""
        });
    } else {
        alert("Failed to add the event. Please try again later.");
    }
  };
  // console.log(eventBeingEdited);
  return (
    <div className="parent">
      <div className="div1">
        <SideBar />
      </div>
      <div className="div2 right--side-bg">
        {/* <AddEvent newEvent={newEvent} setNewEvent={setNewEvent} handleAddEvent={handleAddEvent} /> */}
        <MyCalendarComponent
          allEvents={allEvents}
          handleDeleteEvent={handleDeleteEvent}
          handleUpdateEvent={handleUpdateEvent}
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          handleAddEvent={handleAddEvent}
        />
      </div>
    </div>
  );
}

export default MyCalendar;

