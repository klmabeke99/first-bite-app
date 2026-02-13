import { getState, setState } from "./state.js";

// Simple local premium flag (later can be replaced with license validation)
export function isPremium() {
  const { premiumUnlocked } = getState();
  return !!premiumUnlocked;
}

export function unlockPremium() {
  setState({ premiumUnlocked: true });
}

export function lockPremium() {
  setState({ premiumUnlocked: false });
}
