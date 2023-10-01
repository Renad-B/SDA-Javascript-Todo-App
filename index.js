document.addEventListener("DOMContentLoaded", function () {
    // Get elements from the DOM
    const inputField = document.querySelector('input[type="text"]');
    const addBtn = document.getElementById("add-btn");
    const todoList = document.getElementById("task");
    const pendingTasks = document.querySelector(".count-value");
    const errorText = document.getElementById("error");
    const filterAllBtn = document.getElementById("filter-all");
    const filterActiveBtn = document.getElementById("filter-active");
    const filterCompletedBtn = document.getElementById("filter-completed");
  
    let todos = [];
    let currentFilter = "all";
  
    // Function to render the todo list based on the current filter
    function renderTodoList() {
      // Clear the todo list
      todoList.innerHTML = "";
  
      // Filter the todos based on the current filter
      let filteredTodos = todos;
      if (currentFilter === "active") {
        filteredTodos = todos.filter((todo) => !todo.completed);
      } else if (currentFilter === "completed") {
        filteredTodos = todos.filter((todo) => todo.completed);
      }
  
      // Iterate through filteredTodos array and create list items
      for (let i = 0; i < filteredTodos.length; i++) {
        const todo = filteredTodos[i];
  
        // Create list item
        const listItem = document.createElement("li");
        listItem.setAttribute("data-id", i);
  
        // Create checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", toggleTodoComplete);
  
        // Create task description
        const taskDescription = document.createElement("span");
        taskDescription.textContent = todo.description;
  
        // Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.addEventListener("click", deleteTodo);
  
        // Create edit button
        const editBtn = document.createElement("button");
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.addEventListener("click", editTodo);
  
        // Append elements to the list item
        listItem.appendChild(checkbox);
        listItem.appendChild(taskDescription);
        listItem.appendChild(deleteBtn);
        listItem.appendChild(editBtn);
  
        // Append list item to the todo list
        todoList.appendChild(listItem);
      }
  
      // Update the todo counter
      updateTodoCounter();
    }
  
    // Function to add a new todo
    function addTodo() {
      const description = inputField.value;
  
      // Check if the input is empty
      if (description.trim() === "") {
        errorText.style.display = "block";
        return;
      }
  
      // Create a new todo object
      const newTodo = {
        description: description,
        completed: false,
      };
  
      // Add the new todo to the todos array
      todos.push(newTodo);
  
      // Clear the input field
      inputField.value = "";
  
      // Render the updated todo list
      renderTodoList();
    }
  
    // Function to toggle the completion status of a todo
    function toggleTodoComplete(event) {
      const listItem = event.target.parentElement;
      const todoId = listItem.getAttribute("data-id");
  
      // Toggle the completed status of the corresponding todo
      todos[todoId].completed = event.target.checked;
  
      // Render the updated todo list
      renderTodoList();
    }
  
    // Function to delete a todo
    function deleteTodo() {
      const listItem = this.parentElement;
      const todoId = listItem.getAttribute("data-id");
  
      // Remove the corresponding todo from the todos array
      todos.splice(todoId, 1);
  
      // Render the updated todo list
      renderTodoList();
    }
  
    // Function to edit a todo
    function editTodo() {
      const listItem = this.parentElement;
      const todoId = listItem.getAttribute("data-id");
      const taskDescription = listItem.querySelector("span");
      const newDescription = prompt(
        "Enter the new task description:",
        taskDescription.textContent
      );
  
      // Update the task description of the corresponding todo
      todos[todoId].description = newDescription;
  
      // Render the updated todo list
      renderTodoList();
    }
  
    // Function to update the todo counter
    function updateTodoCounter() {
      const totalTasks = todos.length;
      const completedTasks = todos.filter((todo) => todo.completed).length;
  
      // Update the counter text
      pendingTasks.textContent = totalTasks;
  
      // Update the completed tasks count
      const completedTasksText = document.querySelector(".completed-tasks");
      completedTasksText.textContent = completedTasks;
    }
  
    // Event listener forthe add button
    addBtn.addEventListener("click", addTodo);
  
    // Event listener for the input field to hide the error text
    inputField.addEventListener("input", function () {
      errorText.style.display = "none";
    });
  
    // Event listener for the filter buttons
    filterAllBtn.addEventListener("click", function () {
      currentFilter = "all";
      renderTodoList();
    });
  
    filterActiveBtn.addEventListener("click", function () {
      currentFilter = "active";
      renderTodoList();
    });
  
    filterCompletedBtn.addEventListener("click", function () {
      currentFilter = "completed";
      renderTodoList();
    });
  
    // Render the initial todo list
    renderTodoList();
  });