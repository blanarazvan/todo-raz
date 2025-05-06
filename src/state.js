export let currentProject = null;

export function setCurrentProject(project) {
  currentProject = project;
}

export function getCurrentProject() {
    return currentProject;
}
export function clearCurrentProject() {
  currentProject = null;
}