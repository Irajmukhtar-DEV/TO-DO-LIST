const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");


// Load tasks when page opens
window.onload = function () {

  const savedTasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

  savedTasks.forEach(task => {
    createTask(task.text, task.completed);
  });

  toggleEmptyMessage();
};


// Add Task
function addTask() {

  const taskText = taskInput.value.trim();

  if(taskText === ""){
    alert("Please enter a task");
    return;
  }

  createTask(taskText, false);

  saveTasks();

  taskInput.value = "";

  toggleEmptyMessage();
}


// Create Task
function createTask(text, completed){

  const li = document.createElement("li");

  li.classList.add("task");

  if(completed){
    li.classList.add("completed");
  }

  li.innerHTML = `
  
    <div class="task-left">

      <input type="checkbox" ${completed ? "checked" : ""}>

      <span>${text}</span>

    </div>

    <button class="delete-btn">
      Delete
    </button>
  `;

  // Complete task
  const checkbox = li.querySelector("input");

  checkbox.addEventListener("change", () => {

    li.classList.toggle("completed");

    saveTasks();
  });


  // Delete task
  const deleteBtn = li.querySelector(".delete-btn");

  deleteBtn.addEventListener("click", () => {

    li.remove();

    saveTasks();

    toggleEmptyMessage();
  });

  taskList.appendChild(li);
}


// Save Tasks
function saveTasks(){

  const tasks = [];

  document.querySelectorAll(".task").forEach(task => {

    tasks.push({

      text: task.querySelector("span").innerText,

      completed: task.classList.contains("completed")
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Empty message
function toggleEmptyMessage(){

  if(taskList.children.length === 0){

    emptyMessage.style.display = "block";

  } else {

    emptyMessage.style.display = "none";
  }
}


// Enter key support
taskInput.addEventListener("keypress", function(e){

  if(e.key === "Enter"){

    addTask();
  }
});