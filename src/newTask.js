const tasksList = [];
const projectList = [];

function Task(title, description, date, priority, notes, assign, id) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority; 
    this.notes = notes;
    this.assign = assign;
    this.id = id;
}
function Project(title, id){
    this.title = title;
    this.id = id;
}
function addTaskToProject(title, description, date, priority, notes, assign){
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority; 
    this.notes = notes;
    this.assign = assign;
    this.createTask = function (){
        const task = new Task(title, description, date, priority, notes, assign, crypto.randomUUID());
        tasksList.push(task);
        return task;
    }
}
function addProjectToList (title){
    this.title = title;
    this.createProject = function (){
        const project = new Project(title, crypto.randomUUID());
        projectList.push(project);
        return project;
    }
}

function showTasks(){
    tasksList.forEach(task => {
        console.log(task)
    });
}
function showProjects(){
    projectList.forEach(project => {
        console.log(project)
    });
}
const taskTable = document.querySelector(".defaultcontainer");
const projectsList = document.querySelector(".projectslist");

projectsList.innerHTML = JSON.parse(localStorage.getItem('projectValue'));

export function newItem(){

const newItem = document.querySelector(".newitem");
const newProject = document.querySelector(".newproject");
const close = document.getElementById("close");
const submit = document.getElementById("submit");
const projectHeader = document.querySelector(".defaultheader");



newItem.addEventListener("click", () => {
    dialog.showModal();
});

document.getElementById("taskForm").addEventListener("submit", (e) => {
    
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let date = document.getElementById("date").value;
    let priority = document.getElementById("priority").value;
    let notes = document.getElementById("notes").value;
    let assign = document.getElementById("assign").value;

    const newTask = new addTaskToProject(title, description, date, priority, notes, assign).createTask();

    localStorage.setItem('taskValue', JSON.stringify(newTask));

    const card = document.createElement("div");
    taskTable.appendChild(card);
    card.classList.add("task-card");
    card.setAttribute("data-id", newTask.id);

    card.innerHTML = `
    <h3> ${newTask.title}</h3>
    <p> ${newTask.description}</p>
    <p> ${newTask.date}</p>
    <p><span class="taskpriority"> ${newTask.priority}</span></p>
    <p>Notes: ${newTask.notes}</p>
    <button class="complete">Task Completed </button>
    <button class="status">Change Status </button>
    `;

    card.querySelector(".complete").addEventListener("click", () => {

        const taskId = card.getAttribute("data-id");
    
        const index = tasksList.findIndex(task => task.id === taskId);
        if (index > -1){
            tasksList.splice(index, 1);
        }
        card.remove();
        card.removeAttribute("data-id");
    });
})

close.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
});

newProject.addEventListener("click", () => {
    projdialog.showModal();
});

document.getElementById("projForm").addEventListener("submit", (e) => {
    
    let title = document.getElementById("newtitle").value;
    
    const newProject = new addProjectToList(title).createProject();
    
    localStorage.setItem('projectValue', JSON.stringify(newProject));

    const project = document.createElement("div");
    projectsList.appendChild(project);
    project.classList.add("projectNameHeader");
    project.setAttribute("data-id", newProject.id);

    showProjects();
    project.innerHTML = `<button class="listprojectname">${newProject.title}</button>`;

    const projectButton = document.querySelectorAll(".projectNameHeader");

    projectButton.forEach(button => {
        button.addEventListener("click", () => {
            const title = button.textContent;
            projectHeader.textContent = "Project: " + title;
            
        })
    })
    

    e.preventDefault();
    projdialog.close();
    document.getElementById("projForm").reset();
})



close.addEventListener("click", (e) => {
    e.preventDefault();
    projdialog.close();
});
}