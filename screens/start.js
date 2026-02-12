export function renderStartScreen() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section class="card">
      <h2 class="h2">Start your task in 5 minutes</h2>
      <p class="p">
        This is not about forcing your brain. We’ll find one tiny “first bite” so you can begin gently.
      </p>

      <hr class="hr" />

      <p class="p"><strong>Ready?</strong> Click below to begin.</p>

      <div class="row">
        <button class="btn" id="startBtn">Start</button>
      </div>

      <p class="small">
        Tip: If you only do 5 minutes, you still win.
      </p>
    </section>
  `;

  const startBtn = document.getElementById("startBtn");
  startBtn.addEventListener("click", () => {
    // Next screen will be added later
    alert("Nice. Next step: we will build the Questions screen.");
  });
}

