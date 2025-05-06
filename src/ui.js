import { getRecentTasks, projectList, saveTasks, tasksList, saveProjects} from './data.js';
import { clearCurrentProject } from './state.js';

const taskTable = document.querySelector(".defaultcontainer");
const projectHeader = document.querySelector(".defaultheader");
const projectsList = document.querySelector(".projectslist");

export function renderRecentTasks() {
  projectHeader.textContent = "Recently Added Tasks";
  taskTable.innerHTML = "";
  const tasks = getRecentTasks();
  tasks.forEach(task => renderTaskCard(task, taskTable, renderRecentTasks));
}

export function renderTaskCard(task, container, reRenderFn) {
  let priorityHTML = '';

  if (task.priority === 'Completed') {
    priorityHTML = `<strong>Completed</strong>`;
  } else {
    priorityHTML = `
      <label for="priority-${task.id}">Priority:</label>
      <select id="priority-${task.id}" class="priority-dropdown">
        <option value="urgent" ${task.priority === 'urgent' ? 'selected' : ''}>Urgent</option>
        <option value="important" ${task.priority === 'important' ? 'selected' : ''}>Important</option>
        <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>Medium</option>
        <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Low</option>
      </select>
    `;
  }
  const card = document.createElement("div");
  card.classList.add("task-card");
  if (task.priority === "Completed") {
    card.style.backgroundColor = "#6fff52";
  }
  card.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    <p>${task.date}</p>
    <p class="prioritywrap">${priorityHTML}</p>
    <p>Notes: ${task.notes}</p>
    <p>Assigned to: ${task.assign}</p>
    <button class="complete">Task Completed </button>
    <button class="delete">Delete Task </button>
  `;

  const priorityDropdown = card.querySelector(".priority-dropdown");
  if (priorityDropdown) {
    priorityDropdown.addEventListener("change", (e) => {
      task.priority = e.target.value;
      saveTasks();
      reRenderFn(); 
    });
  }
  card.querySelector(".complete").addEventListener("click", () => {
    task.priority = "Completed";
    saveTasks();
    reRenderFn();
  });

  card.querySelector(".delete").addEventListener("click", () => {
    const index = tasksList.findIndex(t => t.id === task.id);
    if (index > -1) {
      tasksList.splice(index, 1);
      saveTasks();
      reRenderFn();
    }
  });
 
  container.appendChild(card);
}

export function renderProjectList() {
  projectsList.innerHTML = "";
  projectList.forEach(project => {
    if (!project.title || project.title.trim() === "") return; 

    const div = document.createElement("div");
    div.classList.add("projectNameHeader");
    div.innerHTML = `<button class="listprojectname" data-project="${project.title}">${project.title}</button>`;
    projectsList.appendChild(div);
  });
}

export function renderProjectTasks(projectTitle) {
  const header = document.querySelector(".defaultheader");
  const taskTable = document.querySelector(".defaultcontainer");
  const buttonsContainer = document.querySelector(".buttons");

  taskTable.innerHTML = "";
  header.textContent = "Project: " + projectTitle;
  

  const tasks = tasksList
    .filter(t => t.assign === projectTitle)
    .sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority));

  tasks.forEach(task => {
    renderTaskCard(task, taskTable, () => renderProjectTasks(projectTitle));
  });
  const existingBtn = document.getElementById("deleteProjectBtn");
  if (!existingBtn) {
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Project";
    deleteBtn.id = "deleteProjectBtn";
    deleteBtn.classList.add("delete-project");
    buttonsContainer.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", () => {
      const index = projectList.findIndex((p) => p.title === projectTitle);
      if (index > -1) {
        projectList.splice(index, 1);
      }
      for (let i = tasksList.length - 1; i >= 0; i--) {
        if (tasksList[i].assign === projectTitle) {
          tasksList.splice(i, 1);
        }
      }
      clearCurrentProject();
      deleteBtn.remove();
      saveProjects();
      saveTasks();
      renderProjectList();
      renderRecentTasks();
    });
  }

}
function priorityValue(p) {
  return { urgent: 1, important: 2, medium: 3, low: 4 }[p] || 5;
}