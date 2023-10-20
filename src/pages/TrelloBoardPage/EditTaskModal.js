import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { updateTask } from '../Interface.js'

function EditTaskModal({ open, onClose, onSave, task, priorityError2, setPriorityError2, setDescriptionError2, descriptionError2, setRefresh }) {
  const [taskContent, setTaskContent] = useState(task?.content || "");
  const [selectedPriority, setSelectedPriority] = useState(task?.priority || "medium");

  const priorities = ["high", "medium", "low"];

  useEffect(() => {
    setTaskContent(task?.content || "");
    setSelectedPriority(task?.priority || "medium");
  }, [task]);

  // const handleSave = () => {
  //   onSave(task.id, taskContent, selectedPriority);
  //   onClose();
  // };

  const handleSave = async () => {
    const result = await updateTask(task.id, taskContent, selectedPriority); // Call the update function
    // await getTask(task.id);
    if (result === "Bad Request1") {
      // Handle error messages
      setDescriptionError2("Description cannot be empty!")
      console.error("Description cannot be empty!");
    } else if (result === "Bad Request2") {
      setPriorityError2("Priority cannot be empty!")
      console.error("Priority cannot be empty!");
    } else if (result) {
      // setRefresh(true)
      onSave(task.id, taskContent, selectedPriority);
      onClose();
    }
  };
  
  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Autocomplete
          value={selectedPriority}
          onChange={(event, newValue) => { setSelectedPriority(newValue);
            if (priorityError2) {
              setPriorityError2('');
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
              error={!!priorityError2}
              helperText={priorityError2}
            />
          )}
        />
        <TextField
          fullWidth
          label="Description"
          multiline 
          rows={4}
          value={taskContent}
          onChange={(e) => { setTaskContent(e.target.value);
            if (descriptionError2) {
              setDescriptionError2('');
            }
          }}
          error={!!descriptionError2}
          helperText={descriptionError2}
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

export default EditTaskModal;
