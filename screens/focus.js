import { getState } from "../app/state.js";

let timerId = null;

export function renderFocusScreen() {
  const app = document.getElementById("app");
  const { task } = getState();

  const totalSeconds = 5 * 60;

  app.innerHTML = `
    <section class="card">
      <h2 class="h2">Focus Mode</h2>
      <p class="p">Just 5 minutes. You’re not finishing. You’re starting.</p>

      <hr class="hr" />

      <p class="p"><strong>Task:</strong> ${escapeHtml(task)}</p>

      <div class="timer">
        <div class="timer__time" id="timeDisplay">05:00</div>
        <div class="row">
          <button class="btn" id="startTimerBtn">Start Timer</button>
          <button class="btn secondary" id="pauseTimerBtn">Pause</button>
          <button class="btn secondary" id="resetTimerBtn">Reset</button>
        </div>
      </div>

      <hr class="hr" />

      <div class="row">
        <button class="btn secondary" id="backBtn">Back to Plan</button>
      </div>

      <p class="small">If you stop after 5 minutes, you still win.</p>
    </section>
  `;

  // Wire buttons
  let remaining = totalSeconds;

  const timeDisplay = document.getElementById("timeDisplay");
  const startBtn = document.getElementById("startTimerBtn");
  const pauseBtn = document.getElementById("pauseTimerBtn");
  const resetBtn = document.getElementById("resetTimerBtn");

  function renderTime() {
    timeDisplay.textContent = formatTime(remaining);
  }

  function startTimer() {
    if (timerId) return; // already running

    timerId = setInterval(() => {
      remaining -= 1;
      renderTime();

      if (remaining <= 0) {
        stopTimer();
        remaining = 0;
        renderTime();
        alert("Time’s up ✅ Want to do 5 more minutes?");
      }
    }, 1000);
  }

  function stopTimer() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function resetTimer() {
    stopTimer();
    remaining = totalSeconds;
    renderTime();
  }

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", stopTimer);
  resetBtn.addEventListener("click", resetTimer);

  document.getElementById("backBtn").addEventListener("click", () => {
    stopTimer();
    window.location.hash = "#/results";
  });

  // Initial render
  renderTime();
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

