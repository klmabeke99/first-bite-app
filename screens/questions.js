import { setState, getState } from "../app/state.js";
import { isPremium } from "../app/features.js";


export function renderQuestionsScreen() {
  const app = document.getElementById("app");
  const state = getState();

  app.innerHTML = `
    <section class="card">
      <h2 class="h2">What are we starting?</h2>
      <p class="p">Keep it simple. One task. One feeling. That’s enough.</p>

      <label class="label" for="taskInput">Your task</label>
      <input class="input" id="taskInput" type="text" placeholder="e.g., Reply to the email" value="${escapeHtml(state.task)}" />
      <p class="small" id="taskError" style="display:none; color: rgba(17,24,39,.65); margin-top:6px;">
  Please type a task (even a short one)
</p>


      <label class="label" for="emotionSelect">What feeling shows up?</label>
     <select class="select" id="emotionSelect">
  <option value="overwhelmed">Overwhelmed</option>
  <option value="anxious">Anxious</option>
  <option value="bored">Bored</option>
  <option value="confused">Confused</option>
  <option value="tired">Tired</option>

  <optgroup label="Premium (locked)">
    <option value="perfectionism" ${isPremium() ? "" : "disabled"}>Perfectionism</option>
    <option value="avoidance" ${isPremium() ? "" : "disabled"}>Avoidance</option>
    <option value="low_dopamine" ${isPremium() ? "" : "disabled"}>Low dopamine</option>
    <option value="distracted" ${isPremium() ? "" : "disabled"}>Distracted</option>
  </optgroup>
</select>

${isPremium() ? `
  <label class="label" style="margin-top:12px;">Energy level right now</label>
  <select class="select" id="energySelect">
    <option value="low">Low</option>
    <option value="medium" selected>Medium</option>
    <option value="high">High</option>
  </select>
  <p class="small" style="opacity:.8;">Premium adapts the plan to your energy.</p>
` : `
  <p class="small" style="opacity:.75; margin-top:10px;">
    Premium adds an energy-aware plan (low/medium/high).
  </p>
`}

<p class="small" style="opacity:.8;">
  Premium unlocks deeper blockers (perfectionism, avoidance, low dopamine, distracted)
</p>


      <div class="row">
        <button class="btn secondary" id="backBtn">Back</button>
        <button class="btn" id="nextBtn">Next</button>
      </div>

      <p class="small">Next: you’ll get a tiny “first bite” plan.</p>
    </section>
  `;

  // Set selected value after render
  document.getElementById("emotionSelect").value = state.emotion || "overwhelmed";

  document.getElementById("backBtn").addEventListener("click", () => {
    window.location.hash = "#/start";
  });

 document.getElementById("nextBtn").addEventListener("click", () => {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();
  const emotion = document.getElementById("emotionSelect").value;

  const taskError = document.getElementById("taskError");

  if (!task) {
    taskError.style.display = "block";
    taskInput.focus();
    return;
  }

  let energy = "medium";
  const energyEl = document.getElementById("energySelect");
  if (energyEl) energy = energyEl.value;

  setState({ task, emotion, energy });

  window.location.hash = "#/results";
});



function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
