import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

import AddEvent from "./addEvent";
import EventDetail from "./eventDetails";

// const DnDCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

function MyCalendarComponent({
  allEvents,
  handleDeleteEvent,
  newEvent,
  setNewEvent,
  handleAddEvent,
  handleUpdateEvent,
  
}) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  function handleShowModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <div className="container-calender">
      <div className="calendar-header-row header-container-blur">
        <h1 className="calendar-header-title">My Calendar</h1>
        <div>
          <AddEvent
            newEvent={newEvent}
            setNewEvent={setNewEvent}
            handleAddEvent={handleAddEvent}
          />
        </div>
      </div>

      <div className="calendar-content">
        <Calendar
          localizer={localizer}
          events={allEvents}
          //key={allEvents.length}
          defaultDate={new Date()}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          style={{ height: 500, margin: "50px" }}
          selectable={true}
          onSelectEvent={(event) => {
            setSelectedEvent(event);
            handleShowModal();
          }}
          components={{
            toolbar: CustomToolbar
        }}
          // delete an event on selection.
          // onSelectEvent={handleDeleteEvent}
        />
      </div>

      <EventDetail
        selectedEvent={selectedEvent}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleDeleteEvent={handleDeleteEvent}
        handleUpdateEvent={handleUpdateEvent}
      />
    </div>
  );
}

class CustomToolbar extends React.Component {
  render() {
      const { label } = this.props;

      return (
          <div className="rbc-toolbar">
              <span className="rbc-btn-group">
                  <button type="button" onClick={() => this.navigate('TODAY')}>Today</button>
                  <button type="button" onClick={() => this.navigate('PREV')}>Back</button>
                  <button type="button" onClick={() => this.navigate('NEXT')}>Next</button>
              </span>
              <span className="rbc-toolbar-label">{label}</span>
              <span className="rbc-btn-group">
                  <button type="button" onClick={this.view.bind(null, 'month')}>Month</button>
                  <button type="button" onClick={this.view.bind(null, 'agenda')}>Agenda</button>
              </span>
          </div>
      );
  }

  navigate = action => {
      this.props.onNavigate(action);
  };

  view = view => {
      this.props.onView(view);
  };
}

export default MyCalendarComponent;