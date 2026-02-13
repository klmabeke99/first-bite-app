import { renderUpgradeScreen } from "../screens/upgrade.js";
import { renderFocusScreen } from "../screens/focus.js";
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

  if (route === "#/focus") {
    renderFocusScreen();
    return;
  }

  // 👇 ADD IT HERE
  if (route === "#/upgrade") {
    renderUpgradeScreen();
    return;
  }

  window.location.hash = "#/start";
}


export function initRouter() {
  renderRoute();
  window.addEventListener("hashchange", renderRoute);
}

