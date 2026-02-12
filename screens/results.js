import { getState, resetState } from "../app/state.js";

export function renderResultsScreen() {
  const app = document.getElementById("app");
  const { task, emotion, sessionsCompleted } = getState();


  const plan = buildPlan(task, emotion);

  app.innerHTML = `
    <section class="card">
      <h2 class="h2">Your First Bite Plan</h2>
      <p class="p">You don’t need motivation. You just need a tiny start.</p>

      <hr class="hr" />

      <p class="p"><strong>Task:</strong> ${escapeHtml(task)}</p>
      <p class="p"><strong>Feeling:</strong> ${labelEmotion(emotion)}</p>

      <hr class="hr" />

      <p class="p"><strong>First bite (5 minutes):</strong></p>
      <p class="p">${escapeHtml(plan.firstBite)}</p>

      <p class="p"><strong>Then do:</strong></p>
      <ul>
        ${plan.nextSteps.map(s => `<li>${escapeHtml(s)}</li>`).join("")}
      </ul>

      <p class="p"><strong>Gentle reframe:</strong> ${escapeHtml(plan.reframe)}</p>
      <p class="small">Sessions completed so far: ${sessionsCompleted || 0}</p>

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

function buildPlan(task, emotion) {
  // Simple starter logic (we’ll upgrade later in logic.js)
  if (emotion === "anxious") {
    return {
      firstBite: `Open the task and write one tiny first line about "${task}" (no pressure to finish).`,
      nextSteps: [
        "List 3 bullet points of what you need (not the full plan)",
        "Do the easiest bullet first",
        "Send/submit a rough first version",
      ],
      reframe: "Starting is success. You’re only doing the first inch.",
    };
  }

  if (emotion === "overwhelmed") {
    return {
      firstBite: `Break "${task}" into 3 mini-parts. Write only the 3 parts.`,
      nextSteps: [
        "Pick the smallest part",
        "Work on it for 5 more minutes",
        "Stop after the timer and decide if you want another round",
      ],
      reframe: "You don’t have to do it all. You only have to start.",
    };
  }

  if (emotion === "bored") {
    return {
      firstBite: `Set a 5-minute challenge: do the fastest possible version of "${task}".`,
      nextSteps: [
        "Add one tiny improvement",
        "Add one tiny improvement again",
        "Stop once it’s “good enough”",
      ],
      reframe: "Make it a game. Tiny progress counts.",
    };
  }

  if (emotion === "confused") {
    return {
      firstBite: `Write 1 question: “What is the next obvious step for "${task}"?” Then answer it in one sentence.`,
      nextSteps: [
        "Search/ask for the missing info (one message, one search)",
        "Write the first step as a checklist item",
        "Do that one checklist item",
      ],
      reframe: "Clarity comes after movement, not before.",
    };
  }

  // tired (default)
  return {
    firstBite: `Do the “setup step” for "${task}" only (open tabs, files, notebook, workspace).`,
    nextSteps: [
      "Do the easiest 2-minute action",
      "Take a short water break",
      "Do one more tiny action",
    ],
    reframe: "Low energy doesn’t mean zero progress.",
  };
}

function labelEmotion(e) {
  const map = {
    overwhelmed: "Overwhelmed",
    anxious: "Anxious",
    bored: "Bored",
    confused: "Confused",
    tired: "Tired",
  };
  return map[e] || "Overwhelmed";
}

function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

