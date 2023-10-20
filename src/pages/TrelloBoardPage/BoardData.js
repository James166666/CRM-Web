export const boardData = {
  tasks: {
    "task-1": { id: "task-1", content: "task 1", priority: "high" },
    "task-2": { id: "task-2", content: "short example", priority: "medium" },
    "task-3": { id: "task-3", content: "normal example normal example normal example", priority: "low" },
    "task-4": { id: "task-4", content: "long example long example long example long example long example long example long example long example long example long example long example long example long example long example long example long example long example long example ", priority: "low" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      tasks: ["task-1", "task-2"],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      tasks: ["task-3"],
    },
    "column-3": {
      id: "column-3",
      title: "Completed",
      tasks: ["task-4"],
    },
  },
  columnsOrder: ["column-1", "column-2", "column-3"],
};
