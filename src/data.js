export let tasksList = JSON.parse(localStorage.getItem("tasksList")) || [];
export let projectList = JSON.parse(localStorage.getItem("projectList")) || [];

export function saveTasks() {
  localStorage.setItem("tasksList", JSON.stringify(tasksList));
}

export function saveProjects() {
  localStorage.setItem("projectList", JSON.stringify(projectList));
}

export function Task(title, description, date, priority, notes, assign) {
  this.title = title;
  this.description = description;
  this.date = date;
  this.priority = priority;
  this.notes = notes;
  this.assign = assign;
  this.id = crypto.randomUUID();
}

export function Project(title) {
  this.title = title;
  this.id = crypto.randomUUID();
}

export function addTask(task) {
  tasksList.push(task);
  saveTasks();
}

export function addProject(project) {
  projectList.push(project);
  saveProjects();
}

export function getRecentTasks(limit = 6) {
  return tasksList.slice(-limit).reverse();
}

export function getTasksByProject(projectTitle) {
  return tasksList
    .filter(task => task.assign === projectTitle)
    .sort((a, b) => priorityRank(a.priority) - priorityRank(b.priority));
}

function priorityRank(priority) {
  const ranks = {
    urgent: 1,
    important: 2,
    medium: 3,
    low: 4,
  };
  return ranks[priority] || 5;
}