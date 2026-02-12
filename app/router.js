import { renderStartScreen } from "../screens/start.js";

function getRoute() {
  // Default route
  const hash = window.location.hash || "#/start";
  return hash;
}

function renderRoute() {
  const route = getRoute();

  // For now, we only have one screen: start
  if (route === "#/start") {
    renderStartScreen();
    return;
  }

  // Fallback if user types a wrong URL
  window.location.hash = "#/start";
}

export function initRouter() {
  // Render when the page loads
  renderRoute();

  // Render when the hash changes
  window.addEventListener("hashchange", renderRoute);
}

