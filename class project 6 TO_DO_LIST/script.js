const taskinput = document.getElementById("textinput");
const addButton = document.getElementById("button");
const taskList = document.getElementById("list");
taskinput.focus();
addButton.addEventListener("click", ADDTASK);
    function ADDTASK() {
    const taskText = taskinput.value.trim();
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            li.classList.add("completed");
        } else {
            li.classList.remove("completed");
        }
    });

    const span = document.createElement("span");
    span.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function() {
        li.remove();
    });
    // Add the task as a styled item inside the existing to-do list box
    li.className = "task-item"; // For custom styling

    // Style the task item for better appearance
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.justifyContent = "space-between";
    li.style.padding = "12px";
    li.style.margin = "8px 0";
    li.style.border = "1.5px solid #ccc";
    li.style.borderRadius = "8px";
    li.style.background = "#f9f9f9";
    li.style.minHeight = "48px";

    span.style.flex = "1";
    span.style.margin = "0 12px";
    span.style.fontSize = "1.1rem";

    deleteButton.style.background = "#ff4d4d";
    deleteButton.style.color = "#fff";
    deleteButton.style.border = "none";
    deleteButton.style.padding = "10px 20px";
    deleteButton.style.borderRadius = "6px";
    deleteButton.style.fontSize = "1rem";
    deleteButton.style.cursor = "pointer";
    deleteButton.style.marginLeft = "12px";

    checkbox.style.transform = "scale(1.3)";
    checkbox.style.marginRight = "12px";

    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            span.style.textDecoration = "line-through";
            li.classList.add("completed");
        } else {
            span.style.textDecoration = "none";
            li.classList.remove("completed");
        }
    });
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    taskList.appendChild(li);

    taskinput.value = "";
}