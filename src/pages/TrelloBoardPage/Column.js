import React, { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import Button from "react-bootstrap/Button";
import Task from "./Task";
import AddTaskModal from "./AddTaskModal";
import "../../components/ButtonStyle.css";
import { addTask } from '../Interface.js'

function Column({ column, tasks, onDeleteTask, onEditTaskClick, onAddNewTask, setRefresh }) {
  /* add task modal */
  const [openModal, setOpenModal] = useState(false);
  const [priorityError, setPriorityError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleAddCardClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSaveNewCard = async (title, priority) => {
    // create the task data object
    const taskData = {
        content: title,
        priority: priority,
        column: parseInt(column.id.split('-')[1], 10)  // this is the column's unique identifier
    };
  
    const response = await addTask(taskData);
    
    if (response === true) {
      console.log("Task added successfully!");
      // onAddNewTask(taskData, column.id);
      // onClose();
      setRefresh(true);
      setOpenModal(false);  // close the modal
    } else if (response === "Bad Request1") {
      // Handle error messages
      setDescriptionError("Description cannot be empty!")
      console.error("Description cannot be empty!");
    } else if (response === "Bad Request2") {
      setPriorityError("Priority cannot be empty!")
      console.error("Priority cannot be empty!");
    } else {
      console.error("Failed to add task!");
    }
};


  /* edit column title */
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(column.title);

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleTitleSave = () => {
    // TODO: Save the edited title
    // For now, just updating the local state
    column.title = editedTitle;
    setIsEditingTitle(false);
  };


  return (
    <div className="column-container">
      {isEditingTitle ? (
        <div>
          <input
            className="column-edit-title"
            value={editedTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleSave}
            autoFocus
          />
        </div>
      ) : (
        <h2 className="column-title" onClick={handleTitleClick}>
          {column.title}
        </h2>
      )}
      {/* render Task */}
      <Droppable droppableId={column.id} type="task">
        {(provided) => (
          <div
            className="task-column"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            
            {tasks.map((task, index) => {
              if (!task) {
                console.error(`Task at index ${index} is undefined`);
                return null;  // don't render anything for this task
              }
                return (
                  <Task
                    key={task.id}
                    task={task}
                    index={index}
                    columnId={column.id}
                    onDelete={onDeleteTask}
                    onEditClick={onEditTaskClick}
                  />
                );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Button
        className="btn change-color-btn column-add-card"
        onClick={handleAddCardClick}
      >
        Add a card
      </Button>
      <AddTaskModal
        open={openModal}
        descriptionError={descriptionError}
        setDescriptionError={setDescriptionError}
        priorityError={priorityError}
        setPriorityError={setPriorityError}
        onClose={handleCloseModal}
        onSave={handleSaveNewCard}
      />
    </div>
  );
}

export default Column;
