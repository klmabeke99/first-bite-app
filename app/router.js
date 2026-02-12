import { renderStartScreen } from "../screens/start.js";
import { renderQuestionsScreen } from "../screens/questions.js";
import { renderResultsScreen } from "../screens/results.js";

function getRoute() {
  return window.location.hash || "#/start";
}

function renderRoute() {
  const route = getRoute();

  if (route === "#/start") {
    renderStartScreen();
    return;
  }

  if (route === "#/questions") {
    renderQuestionsScreen();
    return;
  }

  if (route === "#/results") {
    renderResultsScreen();
    return;
  }

  window.location.hash = "#/start";
}

export function initRouter() {
  renderRoute();
  window.addEventListener("hashchange", renderRoute);
}
