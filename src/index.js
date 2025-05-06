import "./stylez.css"
import { setupEvents } from './events.js';
import { renderRecentTasks, renderProjectList } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  renderRecentTasks();
  renderProjectList();
  setupEvents();
});
