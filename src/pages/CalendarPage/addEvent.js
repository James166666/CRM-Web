import React from "react";
import moment from "moment";

function AddEvent({ newEvent, setNewEvent, handleAddEvent }) {

  function handleAddTitle(e) {
    setNewEvent({ ...newEvent, title: e.target.value });
  }

  function handleAddStartDate(e) {
    setNewEvent({ ...newEvent, startDate: e.target.value });
  }

  function handleAddStartTime(e) {
    setNewEvent({ ...newEvent, startTime: e.target.value });
  }

  function handleAddEndDate(e) {
    setNewEvent({ ...newEvent, endDate: e.target.value });
  }

  function handleAddEndTime(e) {
    setNewEvent({ ...newEvent, endTime: e.target.value });
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary change-color-btn calendar-header-create-event"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Create Event
      </button>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Add Event
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    placeholder="Event Title"
                    id="floatingTitle"
                    className="form-control"
                    value={newEvent.title}
                    onChange={handleAddTitle}
                  />
                  <label htmlFor="floatingTitle">Event Title</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="date"
                    placeholder="dd/mm/yyyy"
                    id="startDatePicker"
                    className="form-control"
                    value={newEvent.startDate}
                    onChange={handleAddStartDate}
                  />
                  <label htmlFor="startDatePicker">Start Date</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="time"
                    id="startTimePicker"
                    className="form-control"
                    value={newEvent.startTime}
                    onChange={handleAddStartTime}
                  />
                  <label htmlFor="startTimePicker">Start Time</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="dd/mm/yyyy"
                    id="endDatePicker"
                    value={newEvent.endDate}
                    onChange={handleAddEndDate}
                  />
                  <label htmlFor="endDatePicker">End Date</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="time"
                    id="endTimePicker"
                    className="form-control"
                    value={newEvent.endTime}
                    onChange={handleAddEndTime}
                  />
                  <label htmlFor="endTimePicker">End Time</label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleAddEvent}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



export default AddEvent;
