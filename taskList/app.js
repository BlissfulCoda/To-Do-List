const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');
const taskList = document.querySelector('.collection');
const card = document.querySelector('.card');


//loadAllFunctions
loadAllEventListeners();


//Load Events function
function loadAllEventListeners(){
    //Dom laod Event
    document.addEventListener('DOMContentLoaded', getTasks);
    card.addEventListener('mousemove', changeColor);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', deleteTask);
    clearBtn.addEventListener('click', clearTasks);
    clearBtn.addEventListener('mouseover', changeName);
    clearBtn.addEventListener('mouseout', changeName2);
    filter.addEventListener('keyup', filterTasks);

}

//Get Tasks from localstorage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task =>{
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = `delete-item secondary-content`;
        link.innerHTML = `<i class="fa fa-remove"></i>`;
        li.appendChild(link);
        taskList.appendChild(li);
    });
}



function changeColor(e){
    document.body.style.background = `rgb( ${e.offsetX}, ${e.offsetY}, 200)`;
}


function addTask(e){
    if(taskInput.value === ''){
        alert('Please add a task.');
    }

    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('a');
    link.className = `delete-item secondary-content`;
    link.innerHTML = `<i class="fa fa-remove"></i>`;
    li.appendChild(link);
    taskList.appendChild(li);

    //Persist to local Storage
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';
    e.preventDefault();
}

//Store tasks 
 function storeTaskInLocalStorage(task){
     let tasks;
     if(localStorage.getItem('tasks') === null){
         tasks = [];
     } else {
         tasks = JSON.parse(localStorage.getItem('tasks'));
     }

     tasks.push(task);

     localStorage.setItem('tasks', JSON.stringify(tasks))
 }

//delete a task
function deleteTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')){
        e.target.parentElement.parentElement.remove();

        // Remove from local Storage.
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//clear  all tasks
function clearTasks(e){
    taskList.textContent = '';
    e.preventDefault();

    //clear Tasks
    clearTasksFromLocalStorage();

}

//clear Tasks
function clearTasksFromLocalStorage(){
    localStorage.clear();
}


//change clear button mouseover
function changeName(e){
    e.target.textContent = `ARE YOU SURE ?`;
}

//change clear button mouseout
function changeName2(e){
    e.target.textContent = `CLEAR TASKS`;
}

//filter Tasks
function filterTasks(e){
    const filterInput = e.target.value.toLowerCase();
    const allText = document.querySelectorAll('.collection-item');

    allText.forEach(task =>{
        const textContainer = task.firstChild.textContent;
        if(textContainer.toLowerCase().indexOf(filterInput) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
     if(localStorage.getItem('tasks') === null){
         tasks = [];
     } else {
         tasks = JSON.parse(localStorage.getItem('tasks'));
     }

     tasks.forEach((task, index) =>{
         if(taskItem.textContent === task){
             tasks.splice(index, 1);
         }
     });
     //set localstorage
     localStorage.setItem('tasks', JSON.stringify(tasks))
}
