export function renderQuestionsScreen() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section class="card">
      <h2 class="h2">What are we starting?</h2>
      <p class="p">Keep it simple. One task. One feeling. That’s enough.</p>

      <label class="label" for="taskInput">Your task</label>
      <input class="input" id="taskInput" type="text" placeholder="e.g., Reply to the email" />

      <label class="label" for="emotionSelect">What feeling shows up?</label>
      <select class="select" id="emotionSelect">
        <option value="overwhelmed">Overwhelmed</option>
        <option value="anxious">Anxious</option>
        <option value="bored">Bored</option>
        <option value="confused">Confused</option>
        <option value="tired">Tired</option>
      </select>

      <div class="row">
        <button class="btn secondary" id="backBtn">Back</button>
        <button class="btn" id="nextBtn">Next</button>
      </div>

      <p class="small">Next: you’ll get a tiny “first bite” plan.</p>
    </section>
  `;

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

    // TEMP for now — next step we’ll save this to state.js/localStorage
    console.log({ task, emotion });

    alert("Great. Next step: we’ll generate your plan on the Results screen.");
  });
}

