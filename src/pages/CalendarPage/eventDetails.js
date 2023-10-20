import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import moment from "moment";

function EventDetail({
  selectedEvent,
  showModal,
  handleCloseModal,
  handleDeleteEvent,
  handleUpdateEvent
}) {
  /* set editing event */
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(selectedEvent);

  useEffect(() => {
    setEditedEvent(selectedEvent);
  }, [selectedEvent]);

  const handleEventChange = (key, value) => {
    console.log(`Editing ${key}: ${value}`);

    if (key.endsWith("Time")) {
        const dateKey = key === "startTime" ? "start" : "end";
        const newDate = new Date(editedEvent[dateKey]);
        const [hours, minutes] = value.split(":");
        newDate.setHours(hours, minutes);
        value = newDate;
        key = dateKey;
    } else if (key === "start" || key === "end") {
        const newDate = new Date(value);
        const oldDate = new Date(editedEvent[key]);
        newDate.setHours(oldDate.getHours(), oldDate.getMinutes());
        value = newDate;
    }

    setEditedEvent((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveChanges = () => {
    if (!editedEvent.title || !editedEvent.start || !editedEvent.end) {
      alert("Event details are incomplete. Please make sure all fields are filled.");
      return;
    }
    handleUpdateEvent(editedEvent);
    setIsEditing(false);
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Event Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-floating mb-3">
          <input
            type="text"
            placeholder="Event Title"
            id="floatingTitle"
            className="form-control"
            value={editedEvent ? editedEvent.title : ""}
            disabled={!isEditing}
            onChange={(e) => handleEventChange("title", e.target.value)}
          />
          <label htmlFor="floatingTitle">Title</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="date"
            placeholder="dd/mm/yyyy"
            id="startDatePicker"
            className="form-control"
            value={
              editedEvent && editedEvent.start
                ? moment(editedEvent.start).format("YYYY-MM-DD")
                : ""
            }
            disabled={!isEditing}
            onChange={(e) => handleEventChange("start", e.target.value)}
          />
          <label htmlFor="startDatePicker">Start Date</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="time"
            id="startTimePicker"
            className="form-control"
            value={
              editedEvent && editedEvent.start
                ? moment(editedEvent.start).format("HH:mm")
                : ""
            }
            disabled={!isEditing}
            onChange={(e) => handleEventChange("startTime", e.target.value)}
          />
          <label htmlFor="startTimePicker">Start Time</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="date"
            placeholder="dd/mm/yyyy"
            id="endDatePicker"
            className="form-control"
            value={
              editedEvent && editedEvent.end
                ? moment(editedEvent.end).format("YYYY-MM-DD")
                : ""
            }
            disabled={!isEditing}
            onChange={(e) => handleEventChange("end", e.target.value)}
          />
          <label htmlFor="endDatePicker">End Date</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="time"
            id="endTimePicker"
            className="form-control"
            value={
              editedEvent && editedEvent.end
                ? moment(editedEvent.end).format("HH:mm")
                : ""
            }
            disabled={!isEditing}
            onChange={(e) => handleEventChange("endTime", e.target.value)}
          />
          <label htmlFor="endTimePicker">End Time</label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {isEditing ? (
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        ) : (
          <Button variant="outline-primary" onClick={() => setIsEditing(true)}>
            Edit Event
          </Button>
        )}

        <Button
          variant="outline-danger"
          onClick={() => {
            handleDeleteEvent(selectedEvent);
            handleCloseModal();
          }}
          style={{
            position: "absolute",
            bottom: "12px",
            left: "20px",
          }}
        >
          Delete Event
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EventDetail;
