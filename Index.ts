// Get references to the input, button, and output div
const inputField = document.getElementById("todo-input") as HTMLInputElement;
const addButton = document.getElementById("add-btn") as HTMLButtonElement;
const outputDiv = document.querySelector(".checkboxes") as HTMLDivElement;

// Store tasks in an array
let tasks: { text: string; completed: boolean }[] = [];

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


  // Add event listener to toggle line-through on the label when the checkbox is clicked
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      label.style.textDecoration = "line-through"; 
      tasks.find((task) => task.text === taskText)!.completed = true; 
    } else {
      label.style.textDecoration = "none"; 
      tasks.find((task) => task.text === taskText)!.completed = false; 
    }
  });

  

  // Append the checkbox and label to the task div
  taskDiv.appendChild(checkbox);
  taskDiv.appendChild(label);
  

  outputDiv.appendChild(taskDiv);

  // Add the task to the tasks array
  tasks.push({ text: taskText, completed: false });
};

// Function to display tasks based on filter
const filterTasks = (filter: "all" | "completed" | "incomplete") => {
  outputDiv.innerHTML = ""; 

  // Display tasks based on the filter
  tasks.forEach((task) => {
    if (
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "incomplete" && !task.completed)
    ) {
      // Create a new div to hold the checkbox and label
      const taskDiv = document.createElement("div");
      taskDiv.className = "check-styles";

      // Create a new checkbox input element
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "task-checkbox";
      checkbox.checked = task.completed; 

      // Create a new label for the checkbox
      const label = document.createElement("label");
      label.className = "checkbox-text";
      label.textContent = task.text;

      
      if (task.completed) {
        label.style.textDecoration = "line-through";
      }

      // Append the checkbox and label to the task div
      taskDiv.appendChild(checkbox);
      taskDiv.appendChild(label);

      // Append the task div to the output div
      outputDiv.appendChild(taskDiv);
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
    event.preventDefault(); 
    addButton.click(); 
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
  outputDiv.innerHTML = ""; 
  tasks = []; 
});
