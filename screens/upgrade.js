import { isPremium, unlockPremium, lockPremium } from "../app/features.js";

export function renderUpgradeScreen() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section class="card">
      <h2 class="h2">Upgrade (Test Mode)</h2>
      <p class="p">
        This screen is for testing premium features while we build.
        Later, this will connect to Gumroad/Payhip.
      </p>

      <hr class="hr" />

      <p class="p"><strong>Status:</strong> ${isPremium() ? "Premium ✅" : "Free"}</p>

      <div class="row">
        <button class="btn" id="unlockBtn">Unlock Premium</button>
        <button class="btn secondary" id="lockBtn">Switch to Free</button>
      </div>

      <div class="row" style="margin-top:8px;">
        <button class="btn secondary" id="backBtn">Back</button>
      </div>

      <p class="small">Tip: After toggling, go back to Questions to see locked options change.</p>
    </section>
  `;

  document.getElementById("unlockBtn").addEventListener("click", () => {
    unlockPremium();
    window.location.hash = "#/questions";
  });

  document.getElementById("lockBtn").addEventListener("click", () => {
    lockPremium();
    window.location.hash = "#/questions";
  });

  document.getElementById("backBtn").addEventListener("click", () => {
    window.history.back();
  });
}

