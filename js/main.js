let inputText = window.document.querySelector('.input-txt');
let addTaskButton = window.document.querySelector('.submit-btn');
let tasksContainer = window.document.querySelector('.tasks-container');

let tasksArray = [];

window.onload = () => {
    inputText.focus();
    getTasksFromLocalStorage();
};
if(window.localStorage.getItem("taskino")){
    tasksArray = JSON.parse(window.localStorage.getItem("taskino"));
}
function getTasksFromLocalStorage(){
    const tasks = window.localStorage.getItem('taskino');
    if(tasks){
        JSON.parse(tasks).forEach((task) => {
           displayTask(task);
         });
    }
}

function displayTask(task){
    let div = document.createElement('div');
    div.setAttribute('data-id', task.id);
    div.className = 'new-div';
    div.appendChild(document.createTextNode(task.val));
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.appendChild(document.createTextNode('Delete'));
    div.appendChild(deleteBtn);
    let doneBtn = document.createElement('button');
    doneBtn.className = 'finished';
    doneBtn.appendChild(document.createTextNode('Done'));
    div.appendChild(doneBtn);
    tasksContainer.appendChild(div);
}

addTaskButton.addEventListener('click', () => {
    if(inputText.value !== ''){
        let UID = (Math.random() * Date.now()).toFixed().slice(0, 5);
        let myTask = {
            id: UID,
            val: inputText.value,
        };
        displayTask(myTask);

        //
       
        inputText.value = '';
        inputText.focus();
        tasksArray.push(myTask);
        window.localStorage.setItem('taskino', JSON.stringify(tasksArray));
    }
});



window.addEventListener('click', (event) => {
    let whatsClicked = event.target;
    let parent = whatsClicked.parentNode;
    if(whatsClicked.classList.contains('delete-btn')){
        deleteTask(parent.getAttribute('data-id'));
        parent.remove();
    } else if(whatsClicked.classList.contains('finished')){
      parent.classList.toggle('lineThrough');
    }
});
// Delete Task
function deleteTask(taskId){
    tasksArray =  tasksArray.filter((task) => task.id !== taskId);
    window.localStorage.setItem('taskino', JSON.stringify(tasksArray));
}
