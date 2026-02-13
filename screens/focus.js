import { getState, setState, incrementSessions } from "../app/state.js";

let timerId = null;

export function renderFocusScreen() {
  const app = document.getElementById("app");
  const { task } = getState();

  const totalSeconds = 5 * 60;
  const saved = getState();
  let remaining = Number.isFinite(saved.focusRemaining) ? saved.focusRemaining : totalSeconds;


  app.innerHTML = `
    <section class="card">
      <h2 class="h2">Focus Mode</h2>
      <p class="p">Just 5 minutes. You’re not finishing. You’re starting.</p>

      <hr class="hr" />

      <p class="p"><strong>Task:</strong> ${escapeHtml(task)}</p>

      <div class="timer">
        <div class="ringWrap">
  <div class="ring" id="ring">
    <div class="ringInner">
      <div class="timer__time" id="timeDisplay">05:00</div>
    </div>
  </div>
</div>


        <div class="row">
          <button class="btn" id="startTimerBtn">Start Timer</button>
          <button class="btn secondary" id="pauseTimerBtn">Pause</button>
          <button class="btn secondary" id="resetTimerBtn">Reset</button>
        </div>

        <div class="row" id="extraActions" style="display:none;">
          <button class="btn" id="plusFiveBtn">+ 5 more minutes</button>
          <button class="btn secondary" id="doneBtn">Done for now</button>
        </div>

        <p class="p" id="statusMsg" style="display:none;"></p>
        <p class="small" id="sessionMsg" style="display:none;"></p>
      </div>

      <hr class="hr" />

      <div class="row">
        <button class="btn secondary" id="backBtn">Back to Plan</button>
      </div>

      <p class="small">If you stop after 5 minutes, you still win.</p>
    </section>
  `;

  const timeDisplay = document.getElementById("timeDisplay");
  const ring = document.getElementById("ring");
  const startBtn = document.getElementById("startTimerBtn");
  const pauseBtn = document.getElementById("pauseTimerBtn");
  const resetBtn = document.getElementById("resetTimerBtn");
  const extraActions = document.getElementById("extraActions");
  const plusFiveBtn = document.getElementById("plusFiveBtn");
  const doneBtn = document.getElementById("doneBtn");
  const statusMsg = document.getElementById("statusMsg");
  const sessionMsg = document.getElementById("sessionMsg");

  function renderTime() {
  timeDisplay.textContent = formatTime(remaining);

  // Progress from 0 → 1 (time used)
  const used = totalSeconds - remaining;
  const progress = Math.min(Math.max(used / totalSeconds, 0), 1);
  const deg = Math.round(progress * 360);

  // Fill ring gently as time passes
 ring.style.background = `conic-gradient(var(--ringFill) ${deg}deg, var(--ringTrack) ${deg}deg)`;
}
  function showCompleteUI() {
    extraActions.style.display = "flex";
    statusMsg.style.display = "block";
    sessionMsg.style.display = "block";

    statusMsg.textContent = "Nice work. You showed up for 5 minutes ✅";
    const count = incrementSessions();
    sessionMsg.textContent = `Sessions completed: ${count}`;
  }

  function hideCompleteUI() {
    extraActions.style.display = "none";
    statusMsg.style.display = "none";
    sessionMsg.style.display = "none";
  }

  function startTimer() {
    if (timerId) return;

    hideCompleteUI();
    ring.classList.add("breathing");


    timerId = setInterval(() => {
      remaining -= 1;
      renderTime();

      if (remaining <= 0) {
        stopTimer();
        remaining = 0;
        renderTime();
        showCompleteUI();
      }
    }, 1000);
  }

  function stopTimer() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
      ring.classList.remove("breathing");

    }
  }

  function resetTimer() {
    stopTimer();
    remaining = totalSeconds;
    renderTime();
    hideCompleteUI();
    ring.classList.remove("breathing");

  }

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", stopTimer);
  resetBtn.addEventListener("click", resetTimer);

  plusFiveBtn.addEventListener("click", () => {
    // Add 5 minutes more and continue
    remaining = 5 * 60;
    renderTime();
    hideCompleteUI();
    startTimer();
  });

  doneBtn.addEventListener("click", () => {
    window.location.hash = "#/results";
  });

  document.getElementById("backBtn").addEventListener("click", () => {
    stopTimer();
    window.location.hash = "#/results";
  });

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
