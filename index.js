var _a, _b, _c;
// Get references to the input, button, and output div
var inputField = document.getElementById("todo-input");
var addButton = document.getElementById("add-btn");
var outputDiv = document.querySelector(".checkboxes");
// Retrieve tasks from local storage or initialize an empty array
var tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
// Function to save tasks to local storage
var saveTasksToLocalStorage = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};
// Function to create a new task with a checkbox and label
var addTask = function (taskText) {
    // Create a new div to hold the checkbox and label
    var taskDiv = document.createElement("div");
    taskDiv.className = "check-styles";
    // Create a new checkbox input element
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    // Create a new label for the checkbox
    var label = document.createElement("label");
    label.className = "checkbox-text";
    label.textContent = taskText;
    // Add event listener to toggle line-through on the label when the checkbox is clicked
    checkbox.addEventListener("change", function () {
        var task = tasks.find(function (task) { return task.text === taskText; });
        if (checkbox.checked) {
            label.style.textDecoration = "line-through";
            task.completed = true;
        }
        else {
            label.style.textDecoration = "none";
            task.completed = false;
        }
        saveTasksToLocalStorage(); // Update local storage after task update
    });
    // Append the checkbox and label to the task div
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(label);
    outputDiv.appendChild(taskDiv);
    // Add the task to the tasks array
    tasks.push({ text: taskText, completed: false });
    saveTasksToLocalStorage(); // Save to local storage after adding a task
};
// Function to create and add event listener to each task in the filtered view
var createTaskElement = function (task) {
    var taskDiv = document.createElement("div");
    taskDiv.className = "check-styles";
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;
    var label = document.createElement("label");
    label.className = "checkbox-text";
    label.textContent = task.text;
    if (task.completed) {
        label.style.textDecoration = "line-through";
    }
    // Add event listener to update the task state when checkbox changes
    checkbox.addEventListener("change", function () {
        task.completed = checkbox.checked;
        label.style.textDecoration = task.completed ? "line-through" : "none";
        saveTasksToLocalStorage(); // Save to local storage after task update
    });
    // Append the checkbox and label to the task div
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(label);
    return taskDiv;
};
// Function to display tasks based on filter
var filterTasks = function (filter) {
    outputDiv.innerHTML = ""; // Clear current tasks
    // Display tasks based on the filter
    tasks.forEach(function (task) {
        if (filter === "all" ||
            (filter === "completed" && task.completed) ||
            (filter === "incomplete" && !task.completed)) {
            var taskElement = createTaskElement(task);
            outputDiv.appendChild(taskElement);
        }
    });
};
// Event listener for the "Add" button to add new tasks
addButton.addEventListener("click", function () {
    var userInput = inputField.value.trim(); // Trim whitespace from input
    if (userInput) {
        addTask(userInput); // Add the new task
        inputField.value = ""; // Clear the input field
    }
});
// Event listener to handle "Enter" key as well (optional)
inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission
        addButton.click(); // Trigger the Add button click event
    }
});
// Event listeners for filter buttons
(_a = document.getElementById("show-complete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    filterTasks("completed");
});
(_b = document.getElementById("show-incomplete")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    filterTasks("incomplete");
});
// Event listener for delete all button
(_c = document.getElementById("delete-all")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
    outputDiv.innerHTML = ""; // Clear the output div
    tasks = []; // Clear the tasks array
    saveTasksToLocalStorage(); // Update local storage
});
// Load tasks from local storage on page load
window.addEventListener("load", function () {
    filterTasks("all"); // Display all tasks initially
});
