var _a, _b, _c;
// Get references to the input, button, and output div
var inputField = document.getElementById("todo-input");
var addButton = document.getElementById("add-btn");
var outputDiv = document.querySelector(".checkboxes");
// Store tasks in an array
var tasks = [];
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
        if (checkbox.checked) {
            label.style.textDecoration = "line-through";
            tasks.find(function (task) { return task.text === taskText; }).completed = true;
        }
        else {
            label.style.textDecoration = "none";
            tasks.find(function (task) { return task.text === taskText; }).completed = false;
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
var filterTasks = function (filter) {
    outputDiv.innerHTML = "";
    // Display tasks based on the filter
    tasks.forEach(function (task) {
        if (filter === "all" ||
            (filter === "completed" && task.completed) ||
            (filter === "incomplete" && !task.completed)) {
            // Create a new div to hold the checkbox and label
            var taskDiv = document.createElement("div");
            taskDiv.className = "check-styles";
            // Create a new checkbox input element
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "task-checkbox";
            checkbox.checked = task.completed;
            // Create a new label for the checkbox
            var label = document.createElement("label");
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
addButton.addEventListener("click", function () {
    var userInput = inputField.value.trim();
    if (userInput) {
        addTask(userInput);
        inputField.value = "";
    }
});
// Event listener to handle "Enter" key as well (optional)
inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addButton.click();
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
    outputDiv.innerHTML = "";
    tasks = [];
});
