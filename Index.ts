
const inputField = document.getElementById("todo-input") as HTMLInputElement;
const addButton = document.getElementById("add-btn") as HTMLButtonElement;
const outputDiv = document.querySelector(".checkboxes") as HTMLDivElement;

type Task = {
  test : string
  completed: boolean
}
// Function to save tasks to local storage
const saveTasksToLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

//  Retriving the task
let tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");



// Function to create a new task with a checkbox and label
const addTask = (taskText: string) => {
  // Create a new div to hold the checkbox and label
  const taskDiv = document.createElement("div");
  taskDiv.className = "check-styles";

  // Create a new checkbox input element
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";

  // Create a new label for the checkbox
  const label = document.createElement("label");
  label.className = "checkbox-text";
  label.textContent = taskText;

  
  checkbox.addEventListener("change", () => {
    const task = tasks.find((task) => task.text === taskText);
    if (checkbox.checked) {
      label.style.textDecoration = "line-through";
      task!.completed = true;
    } else {
      label.style.textDecoration = "none";
      task!.completed = false;
    }
    saveTasksToLocalStorage(); 
  });

  // Append the checkbox and label to the task div
  taskDiv.appendChild(checkbox);
  taskDiv.appendChild(label);

  outputDiv.appendChild(taskDiv);

  // Add the task to the tasks array
  tasks.push({ text: taskText, completed: false });
  saveTasksToLocalStorage(); 
};

// Function to create and add event listener to each task in the filtered view
const createTaskElement = (task: { text: string; completed: boolean }) => {
  const taskDiv = document.createElement("div");
  taskDiv.className = "check-styles";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  checkbox.checked = task.completed;

  const label = document.createElement("label");
  label.className = "checkbox-text";
  label.textContent = task.text;

  if (task.completed) {
    label.style.textDecoration = "line-through";
  }

  // Add event listener to update the task state when checkbox changes
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    label.style.textDecoration = task.completed ? "line-through" : "none";
    saveTasksToLocalStorage(); 
  });

  // Append the checkbox and label to the task div
  taskDiv.appendChild(checkbox);
  taskDiv.appendChild(label);

  return taskDiv;
};

// Function to display tasks based on filter
const filterTasks = (filter: "all" | "completed" | "incomplete") => {
  outputDiv.innerHTML = ""; // Clear current tasks

  // Display tasks based on the filter
  tasks.forEach((task) => {
    if (
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "incomplete" && !task.completed)
    ) {
      const taskElement = createTaskElement(task);
      outputDiv.appendChild(taskElement);
    }
  });
};

// Event listener for the "Add" button to add new tasks
addButton.addEventListener("click", () => {
  const userInput = inputField.value.trim(); 

  if (userInput) {
    addTask(userInput); 
    inputField.value = ""; 
  }
});

// Event listener to handle "Enter" key as well (optional)
inputField.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form submission
    addButton.click(); // Trigger the Add button click event
  }
});

// Event listeners for filter buttons
document.getElementById("show-complete")?.addEventListener("click", () => {
  filterTasks("completed");
});

document.getElementById("show-incomplete")?.addEventListener("click", () => {
  filterTasks("incomplete");
});

// Event listener for delete all button
document.getElementById("delete-all")?.addEventListener("click", () => {
  outputDiv.innerHTML = ""; // Clear the output div
  tasks = []; // Clear the tasks array
  saveTasksToLocalStorage(); // Update local storage
});

// Load tasks from local storage on page load
window.addEventListener("load", () => {
  filterTasks("all"); // Display all tasks initially
});
