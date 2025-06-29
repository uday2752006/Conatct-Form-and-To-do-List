
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const charCount = document.getElementById('charCount');
const formStatus = document.querySelector('.form-status');

messageInput.addEventListener('input', () => {
    const count = messageInput.value.length;
    charCount.textContent = count;
    if (count > 150) {
        messageInput.parentElement.classList.add('invalid');
        messageInput.parentElement.querySelector('.validation-icon').innerHTML = '<i class="fas fa-exclamation-circle"></i>';
    } else {
        messageInput.parentElement.classList.remove('invalid');
    }
});

nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);

function validateName() {
    const nameGroup = nameInput.parentElement;
    if (nameInput.value.length < 3) {
        nameGroup.classList.add('invalid');
        nameGroup.classList.remove('valid');
        nameGroup.querySelector('.validation-icon').innerHTML = '<i class="fas fa-exclamation-circle"></i>';
    } else {
        nameGroup.classList.add('valid');
        nameGroup.classList.remove('invalid');
        nameGroup.querySelector('.validation-icon').innerHTML = '<i class="fas fa-check-circle"></i>';
    }
}

function validateEmail() {
    const emailGroup = emailInput.parentElement;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        emailGroup.classList.add('invalid');
        emailGroup.classList.remove('valid');
        emailGroup.querySelector('.validation-icon').innerHTML = '<i class="fas fa-exclamation-circle"></i>';
    } else {
        emailGroup.classList.add('valid');
        emailGroup.classList.remove('invalid');
        emailGroup.querySelector('.validation-icon').innerHTML = '<i class="fas fa-check-circle"></i>';
    }
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    validateName();
    validateEmail();
    
    if (nameInput.parentElement.classList.contains('valid') && 
        emailInput.parentElement.classList.contains('valid') && 
        messageInput.value.length > 0 && messageInput.value.length <= 150) {
        
        formStatus.textContent = 'Message sent successfully!';
        formStatus.style.color = 'var(--success)';
        contactForm.reset();
        nameInput.parentElement.classList.remove('valid');
        emailInput.parentElement.classList.remove('valid');
        charCount.textContent = '0';
        setTimeout(() => {
            formStatus.textContent = '';
        }, 3000);
    } else {
        formStatus.textContent = 'Please fill all fields correctly!';
        formStatus.style.color = 'var(--error)';
    }
});

const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');
const taskCount = document.getElementById('taskCount');
const clearCompletedBtn = document.getElementById('clearCompleted');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = todo.completed ? 'completed' : '';
        li.innerHTML = `
            <span class="task-text">${todo.text}</span>
            <div class="task-actions">
                <button class="complete-btn"><i class="fas fa-${todo.completed ? 'undo' : 'check'}"></i></button>
                <button class="delete-btn"><i class="fas fa-trash"></i></button>
            </div>
        `;
        
        li.querySelector('.complete-btn').addEventListener('click', () => toggleComplete(index));
        li.querySelector('.delete-btn').addEventListener('click', () => deleteTodo(index));
        
        todoList.appendChild(li);
    });
    
    updateTaskCount();
}

function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ text, completed: false });
        saveTodos();
        todoInput.value = '';
        renderTodos();
    }
}

function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
}

function updateTaskCount() {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    taskCount.textContent = `${completed}/${total} tasks completed`;
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});
clearCompletedBtn.addEventListener('click', clearCompleted);

renderTodos();