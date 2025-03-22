function addTask() {
    let taskInput = document.getElementById("task");
    let dateTimeInput = document.getElementById("taskDateTime");
    let statusInput = document.getElementById("taskStatus");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task.");
        return;
    }

    let taskItem = document.createElement("li");

    let taskText = document.createElement("span");
    let dueDate = dateTimeInput.value ? ` (Due: ${dateTimeInput.value})` : "";
    taskText.textContent = taskInput.value + dueDate;

    let statusSpan = document.createElement("span");
    statusSpan.textContent = statusInput.value;
    statusSpan.classList.add("status", getStatusClass(statusInput.value));

    let completeButton = document.createElement("button");
    completeButton.textContent = "✔";
    completeButton.onclick = function () {
        taskText.classList.toggle("completed");
        statusSpan.textContent = "Completed";
        statusSpan.className = "status completed";
    };

    let editButton = document.createElement("button");
    editButton.textContent = "✏";
    editButton.classList.add("edit-btn");
    editButton.onclick = function () {
        let newTask = prompt("Edit task:", taskText.textContent.split(" (Due: ")[0]);
        if (newTask) {
            taskText.textContent = newTask + dueDate;
        }
    };

    let statusDropdown = document.createElement("select");
    ["Pending", "In Progress", "Completed"].forEach(status => {
        let option = document.createElement("option");
        option.value = status;
        option.textContent = status;
        if (status === statusInput.value) option.selected = true;
        statusDropdown.appendChild(option);
    });
    statusDropdown.onchange = function () {
        statusSpan.textContent = statusDropdown.value;
        statusSpan.className = "status " + getStatusClass(statusDropdown.value);
    };

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = function () {
        taskList.removeChild(taskItem);
    };

    let actionsDiv = document.createElement("div");
    actionsDiv.classList.add("actions");
    actionsDiv.appendChild(statusDropdown);
    actionsDiv.appendChild(editButton);
    actionsDiv.appendChild(completeButton);
    actionsDiv.appendChild(deleteButton);

    taskItem.appendChild(taskText);
    taskItem.appendChild(statusSpan);
    taskItem.appendChild(actionsDiv);
    taskList.appendChild(taskItem);

    taskInput.value = "";
    dateTimeInput.value = "";
    statusInput.value = "Pending";
}

function getStatusClass(status) {
    if (status === "Pending") return "pending";
    if (status === "In Progress") return "in-progress";
    if (status === "Completed") return "completed";
}
