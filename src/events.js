import { Task, Project, addTask, addProject, projectList, tasksList } from './data.js';
import { renderRecentTasks, renderProjectList, renderProjectTasks } from './ui.js';
import { setCurrentProject, getCurrentProject, clearCurrentProject } from './state.js';

export function setupEvents() {
  const newItemBtn = document.querySelector(".newitem");
  const newProjectBtn = document.querySelector(".newproject");
  const homeBtn = document.querySelector(".home");
  const taskForm = document.getElementById("taskForm");
  const projectForm = document.getElementById("projForm");
  const taskDialog = document.getElementById("dialog");
  const projectDialog = document.getElementById("projdialog");


  newItemBtn.addEventListener("click", () => {
    if (getCurrentProject()) {
      document.getElementById("assign").value = getCurrentProject();
      document.getElementById("assign").disabled = true;
    } else {
      document.getElementById("assign").value = "";
      document.getElementById("assign").disabled = false;
    }
    taskDialog.showModal();
  });

  homeBtn.addEventListener("click", () => {
    clearCurrentProject();
    renderRecentTasks();
  });

  newProjectBtn.addEventListener("click", () => {
    projectDialog.showModal();
  });

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = new Task(
      document.getElementById("title").value,
      document.getElementById("description").value,
      document.getElementById("date").value,
      document.getElementById("priority").value,
      document.getElementById("notes").value,
      document.getElementById("assign").value
    );
    addTask(task);
    if (task.assign && task.assign.trim() !== "") {
      console.warn("Empty project assign found in task:", task);
      if (!projectList.some(p => p.title === task.assign)) {
        const project = new Project(task.assign);
        addProject(project);
      }
      renderProjectList();
    }
    taskDialog.close();
    taskForm.reset();
    getCurrentProject() ? renderProjectTasks(getCurrentProject()) : renderRecentTasks();

  });

  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("newtitle").value;
    const project = new Project(title);
    addProject(project);
    renderProjectList();
    projectDialog.close();
    projectForm.reset();
  });

  document.querySelector(".projectslist").addEventListener("click", (e) => {
    if (e.target.classList.contains("listprojectname")) {
      const projectValue = e.target.dataset.project;
      if(projectValue){
        setCurrentProject(projectValue);
        renderProjectTasks(projectValue);
      }
    }
  });
}