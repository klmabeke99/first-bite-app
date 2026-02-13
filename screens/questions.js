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
    const task = document.getElementById("taskInput").value.trim();
    const emotion = document.getElementById("emotionSelect").value;

    if (!task) {
      alert("Please type a task (even a short one).");
      return;
    }

    setState({ task, emotion });
    window.location.hash = "#/results";
  });
}

function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
