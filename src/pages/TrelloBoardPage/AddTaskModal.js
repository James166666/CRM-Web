import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function AddTaskModal({ open, onClose, onSave, descriptionError, setDescriptionError, priorityError, setPriorityError }) {
  const [taskContent, setTaskContent] = useState("");
  /* dedault = medium */
  const [selectedPriority, setSelectedPriority] = useState("medium");
  

  const priorities = ["high", "medium", "low"];

  const handleSave = () => {
    onSave(taskContent, selectedPriority);
    setTaskContent(""); // reset the input field
    setSelectedPriority("medium"); // reset the priority
  };

  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* priority */}
      <Autocomplete
          value={selectedPriority}
          onChange={(event, newValue) => { setSelectedPriority(newValue);
            if (priorityError) {
              setPriorityError('');
            }
          }}
          id="priority-box-demo"
          options={priorities}
          getOptionLabel={(option) => option}
          style={{ width: 200, marginBottom:"1rem" }}
          renderInput={(params) => (
            <TextField 
              {...params}
              label="Priority"
              error={!!priorityError}
              helperText={priorityError}
            />
          )}
        />
        {/* description */}
        <TextField
          fullWidth
          label="Description"
          /* width of input */
          multiline 
          rows={4}
          value={taskContent}
          onChange={(e) => { setTaskContent(e.target.value);
            if (descriptionError) {
              setDescriptionError('');
            }
          }}
          error={!!descriptionError}
          helperText={descriptionError}
        />
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddTaskModal;
