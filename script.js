// Selectors
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.getElementById('filter-todo');



// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck)
// filterOption.addEventListener('click', filterTodo)

// Functions

function addTodo(event) {
    event.preventDefault();
    // TODO DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    // Create LI
    const newTodo = document.createElement('li');
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);



    // CHECK MARK BUTTON
    const completedBtn = document.createElement('button');
    completedBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    completedBtn.classList.add('completed-btn');
    todoDiv.appendChild(completedBtn);

    // Cancel  BUTTON
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashBtn.classList.add('trash-btn');
    todoDiv.appendChild(trashBtn);

    // APPEND TO LIST
    if (todoInput.value.length > 0) {
        // Add TODO TO LOCAL STORAGE

        saveToLocalStorage(todoInput.value)
        newTodo.innerText = todoInput.value;
        todoInput.value = "";
        todoList.appendChild(todoDiv);

        if (filterOption.value !== 'all') {
            filterOption.selectedIndex = 0;
            filterOption.dispatchEvent(new Event('change'));
        }

    }
}

function deleteCheck(e) {

    const item = e.target;
    //    Delete TODO;
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;

        todo.classList.add('fall');
        removeFromLocalStorage(todo);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })
    }

    // CHECK MARK 
    if (item.classList[0] === "completed-btn") {
        const todo = item.parentElement;
        localStorageToggleCompleted(todo);
        todo.classList.toggle("completed")

    }
}


filterOption.onchange = function filterTodo(e) {


    const todos = todoList.childNodes;

    todos.forEach((todo) => {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break

        }
    })
}

function saveToLocalStorage(todo) {
    let todos = checkLocalStorage();
    todos.push({
        value: todo,
        completed: false
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos = checkLocalStorage();

    todos.forEach((todo) => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        // Create LI
        const newTodo = document.createElement('li');
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        todo.completed ? todoDiv.classList.add('completed') : null;


        // CHECK MARK BUTTON
        const completedBtn = document.createElement('button');
        completedBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        completedBtn.classList.add('completed-btn');
        todoDiv.appendChild(completedBtn);

        // Cancel  BUTTON
        const trashBtn = document.createElement('button');
        trashBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        trashBtn.classList.add('trash-btn');
        todoDiv.appendChild(trashBtn);

        // APPEND TO LIST

        newTodo.innerText = todo.value;
        todoInput.value = "";
        todoList.appendChild(todoDiv);

        if (filterOption.value !== 'all') {
            filterOption.selectedIndex = 0;
            filterOption.dispatchEvent(new Event('change'));
        }
    })

}

function removeFromLocalStorage(todo) {
    let todos = checkLocalStorage();

    const todoIndex = todo.childNodes[0].innerText;
    todos.splice(todos.findIndex((item) => item.value === todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function checkLocalStorage() {
    if (localStorage.getItem('todos') === null) {
        return [];
    } else {
        return JSON.parse(localStorage.getItem('todos'))
    }
}

function localStorageToggleCompleted(todo) {
    let todos = checkLocalStorage();
    let todoContent = todo.childNodes[0].innerText;
    let todoIdx = todos.findIndex((item) => item.value === todoContent);
    console.log({ todos, todoIdx })
    todos[todoIdx].completed = !todos[todoIdx]?.completed;
    localStorage.setItem('todos', JSON.stringify(todos))
}