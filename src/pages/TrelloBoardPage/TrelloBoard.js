import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Button from "react-bootstrap/Button";
import SideBar from "../../components/Bar";
import Column from "./Column";
import "./TrelloBoardStyles.css";
import EditTaskModal from "./EditTaskModal";
import { addColumn,getColumn,getTask,deleteT,updateTaskColumn } from '../Interface.js'

const TrelloBoard = () => {
  console.log("TrelloBoard Mounted")
  const [priorityError2, setPriorityError2] = useState("");
  const [descriptionError2, setDescriptionError2] = useState("");
  const [hasInitialized, setHasInitialized] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [state, setState] = useState({
    tasks: {},
    columns: {},
    columnsOrder: []
  });


  const DEFAULT_COLUMNS = [
    { title: "To Do" },
    { title: "In Progress" },
    { title: "Completed" }
  ];

  const initializeColumnsForNewUser = async () => {
    console.log(1)
    for (let column of DEFAULT_COLUMNS) {
      const addedColumn = await addColumn(column);
  
      if (addedColumn) {
        setState(prevState => ({
          ...prevState,
          columns: {
            ...prevState.columns,
            [addedColumn.id]: {
              id: addedColumn.id,
              title: addedColumn.title,
              tasks: [],   // Fixed the typo from 'asks' to 'tasks'
            }
          },
          columnsOrder: [...prevState.columnsOrder, addedColumn.id]
        }));
      } else {
        console.error("Failed to add column!");
      }
    }
  };


  React.useEffect(() => {
  
    const fetchColumnsForUser = async () => {
      try {
        const userColumns = await getColumn();
        
        const updatedColumns = userColumns.map(column => {
          // Modify each task in the tasks array to its desired string representation
          const modifiedTasks = column.tasks.map(task => `${task.id}`);
          // Return a new column object with the modified tasks array
          return {
            ...column,
            tasks: modifiedTasks
          };
        });
        // Fetch tasks for each column
        const tasksForColumnsPromises = userColumns.map(column => getTask(column.id));
        const tasksForColumns = await Promise.all(tasksForColumnsPromises);
  
        // Aggregating tasks from all columns and the fetched tasks
        const allTasks = userColumns.reduce((acc, column, index) => {
          // Combine tasks from column and fetched tasks
          const combinedTasks = [...column.tasks, ...tasksForColumns[index]];
  
          combinedTasks.forEach(task => {
            acc[task.id] = task;
          });
          return acc;
        }, {});
  
        if (!hasInitialized && userColumns.length === 0) {
          await initializeColumnsForNewUser();
          setHasInitialized(true);
        } else {
          setState(prevState => ({
            ...prevState,
            tasks: allTasks,  // Here we set the accumulated tasks
            columns: updatedColumns.reduce((acc, column) => {
              acc[column.id] = column;
              return acc;
            }, {}),
            columnsOrder: userColumns.map(column => column.id)
          }));
        }
      } catch (error) {
        console.error("Failed to fetch columns!", error.message);
      }
    }
    fetchColumnsForUser();
    setRefresh(false)
  }, [hasInitialized, refresh]);

  

  const handleAddNewTask = (task, columnId) => {
      setState(prevState => {
          const newTasks = {...prevState.tasks};
          newTasks[task.id] = task;
          
          const newColumns = {...prevState.columns};
          newColumns[columnId].tasks.push(task.id);
  
          return {
              ...prevState,
              tasks: newTasks,
              columns: newColumns
          };
      });
    };

  /* drag and drop logic*/
  const onDragEnd = (result) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // console.log(`Task with ID ${result.draggableId} was dragged from column with ID 
    // ${source.droppableId} to column with ID ${destination.droppableId}`);

    /* drag and drop column */
    if (type === "column") {
      const newColumnsOrder = Array.from(state.columnsOrder);
      newColumnsOrder.splice(source.index, 1);
      newColumnsOrder.splice(destination.index, 0, result.draggableId);

      const newState = {
        ...state,
        columnsOrder: newColumnsOrder,
      };

      setState(newState);
      return;
    }

    /* drag and drop cards */
    const startColumn = state.columns[source.droppableId];
    const finishColumn = state.columns[destination.droppableId];

    /*  Moving tasks in one column */
    if (startColumn === finishColumn) {
      const updatedTaskIds = Array.from(startColumn.tasks);
      updatedTaskIds.splice(source.index, 1);
      updatedTaskIds.splice(destination.index, 0, result.draggableId);

      const updatedColumn = {
        ...startColumn,
        tasks: updatedTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [updatedColumn.id]: updatedColumn,
        },
      };

      setState(newState);
      return;
    }

    /*  Moving tasks from one column to another */
    const startTaskIds = Array.from(startColumn.tasks);
    startTaskIds.splice(source.index, 1);
    const updatedStartColumn = {
      ...startColumn,
      tasks: startTaskIds,
    };

    const finishTaskIds = Array.from(finishColumn.tasks);
    finishTaskIds.splice(destination.index, 0, result.draggableId);
    const updatedFinishColumn = {
      ...finishColumn,
      tasks: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [updatedStartColumn.id]: updatedStartColumn,
        [updatedFinishColumn.id]: updatedFinishColumn,
      },
    };
    updateTaskColumn(result.draggableId, parseInt(destination.droppableId.split('-')[1], 10));
    setState(newState);
  };

  /* delete task logic */
  const deleteTask = (taskId, columnId) => {
    // Create a new tasks object without the task to be deleted
    const response = deleteT(taskId);
    if (response) { 
      console.log("Successfully deleted the task!");
    }

    const updatedTasks = { ...state.tasks };
    delete updatedTasks[taskId];

    // Remove the taskId from the tasks list
    const updatedColumnTasks = state.columns[columnId].tasks.filter(
      (id) => id !== taskId
    );
    const updatedColumns = {
      ...state.columns,
      [columnId]: {
        ...state.columns[columnId],
        tasks: updatedColumnTasks,
      },
    };

    // Update the state
    setState({
      ...state,
      tasks: updatedTasks,
      columns: updatedColumns,
    });
  };

  /* edit task logic */
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const handleEditTaskClick = (task) => {
    setCurrentTask(task);
    setIsEditModalOpen(true);
  };
  const handleSaveEditedTask = (taskId, newContent, newPriority) => {
    const updatedTasks = {
      ...state.tasks,
      [taskId]: {
        ...state.tasks[taskId],
        content: newContent,
        priority: newPriority,
      },
    };

    setState({ ...state, tasks: updatedTasks });
    setIsEditModalOpen(false);
  };

  return (
    <div className="parent">
      <div className="div1">
        <SideBar />
      </div>
      <div className="div2 right--side-bg">
        <div className="trello-container">
          <div className="header-container-blur trello-header-row">
            <h1 className="trello-header-title">To Do List</h1>
            {/* <Button className="btn change-color-btn board-add-list">
              Add a List
            </Button> */}
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="all-columns"
              direction="horizontal"
              type="column"
            >
              {(provided) => (
                <div
                  className="board-container"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {state.columnsOrder.map((columnId, index) => {
                    const column = state.columns[columnId];
                    const tasks = column.tasks.map(
                      (taskId) => state.tasks[taskId]
                    );
                    // if (!tasks) return null;  
                    return (
                      <Draggable
                        key={column.id}
                        draggableId={column.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="test-1"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {/* run column */}
                            <Column
                              key={column.id}
                              column={column}
                              tasks={tasks}
                              onAddNewTask={handleAddNewTask}
                              onDeleteTask={deleteTask}
                              onEditTaskClick={handleEditTaskClick}
                              setRefresh={setRefresh}
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
      <EditTaskModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEditedTask}
        task={currentTask}
        descriptionError2={descriptionError2}
        setDescriptionError2={setDescriptionError2}
        priorityError2={priorityError2}
        setPriorityError2={setPriorityError2}
        // setRefresh={setRefresh}
      />
    </div>
  );
};

export default TrelloBoard;
