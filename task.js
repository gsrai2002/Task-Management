let tasks = JSON.parse(localStorage.getItem('taskInfo')) || [];

const taskForm = document.querySelector('.form');
const taskList = document.querySelector('.task-list');

taskForm.addEventListener('submit',(e) =>{
    e.preventDefault();

    const title = document.querySelector('.task-title').value;
    const description = document.querySelector('.task-description').value;
    const dueDate = document.querySelector('.task-due-date').value;

    const task = {
        title,
        description,
        dueDate,
        completed: false
    };

    tasks.push(task);
    taskForm.reset();
    localStorage.setItem('taskInfo', JSON.stringify(tasks));
    displayTasks();
});

function displayTasks(){
    taskList.innerHTML = '';

    tasks.forEach((task,index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');

        taskItem.innerHTML = `
            <div class="task-info">
                <h3 class="task-name">${task.title}</h3>
                <p>${task.description}</p>
            </div>
            
            <div class="extra-info">
                <p>Due Date: ${task.dueDate}</p>

                <div>
                    <input type="checkbox" id="task-completed-${index}" ${task.completed ? 'checked' : ''}>
                    <label for="task-completed-${index}">Completed</label> 
                </div>
                
                <div class="info-buttons">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        `;

        taskList.appendChild(taskItem);

        //Event listner for checkbox change
        const checkbox = document.getElementById(`task-completed-${index}`);
        checkbox.addEventListener('change', () =>{
            tasks[index].completed = checkbox.checked;
        });
    });
}

displayTasks();

/*
About e.preventDefault();
In HTML, when a form is submitted, the default behavior is to reload the page or navigate to a new 
URL specified in the form's action attribute. This is the standard behavior of HTML forms.

after calling e.preventDefault();, the JavaScript code proceeds to gather the user's input data from 
the form fields, create a task object, add it to the tasks array, and then update the display of tasks 
on the page—all without the page being refreshed or navigating to a different URL.
*/

/*
${task.completed ? 'checked' : ''}
If task.completed is true, the checked attribute is included in the HTML, which means the checkbox 
will be pre-checked. If task.completed is false, the checked attribute is omitted, and the checkbox 
will be unchecked.
*/