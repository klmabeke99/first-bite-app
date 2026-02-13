import { buildPlan } from "../app/logic.js";
import { getState, resetState } from "../app/state.js";

export function renderResultsScreen() {
  const app = document.getElementById("app");
  
  const { task, emotion, energy, sessionsCompleted, streakDays } = getState();

  const plan = buildPlan(task, emotion);

  app.innerHTML = `
    <section class="card">
      <h2 class="h2">Your First Bite Plan</h2>
      <p class="p">You don’t need motivation. You just need a tiny start.</p>
      

      <hr class="hr" />

      <p class="p"><strong>Task:</strong> ${escapeHtml(task)}</p>
      <p class="p"><strong>Feeling:</strong> ${labelEmotion(emotion)}</p>
      <p class="p"><strong>Energy:</strong> ${labelEnergy(energy || "medium")}</p>


      <hr class="hr" />

      <p class="p"><strong>First bite (5 minutes):</strong></p>
      <p class="p">${escapeHtml(plan.firstBite)}</p>

      <p class="p"><strong>Then do:</strong></p>
      <ul>
        ${plan.nextSteps.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}
      </ul>

      <p class="p"><strong>Gentle reframe:</strong> ${escapeHtml(plan.reframe)}</p>

      <p class="small">Sessions completed so far: ${sessionsCompleted || 0}</p>
      <p class="small">Current streak: ${streakDays || 0} day${(streakDays || 0) === 1 ? "" : "s"}</p>
      <p class="small" style="opacity:.75;">
        Streak counts once per day. Missing a day resets gently — no pressure.
      </p>

      <div class="row">
        <button class="btn secondary" id="backBtn">Back</button>
        <button class="btn" id="focusBtn">Start 5-minute timer</button>
      </div>

      <div class="row" style="margin-top:8px;">
        <button class="btn secondary" id="resetBtn">Reset</button>
      </div>
    </section>
  `;

  document.getElementById("backBtn").addEventListener("click", () => {
    window.location.hash = "#/questions";
  });

  document.getElementById("focusBtn").addEventListener("click", () => {
    window.location.hash = "#/focus";
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    resetState();
    window.location.hash = "#/start";
  });
}

function labelEmotion(e) {
  const map = {
    overwhelmed: "Overwhelmed",
    anxious: "Anxious",
    bored: "Bored",
    confused: "Confused",
    tired: "Tired",
    perfectionism: "Perfectionism",
    avoidance: "Avoidance",
    low_dopamine: "Low dopamine",
    distracted: "Distracted",
  };
  return map[e] || e;
}
function labelEnergy(e) {
  const map = { low: "Low", medium: "Medium", high: "High" };
  return map[e] || "Medium";
}


function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
