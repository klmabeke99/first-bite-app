import { EMOTION_PROFILES } from "./data.js";
import { getState } from "./state.js";

export function buildPlan(task, emotion) {
  const profile = EMOTION_PROFILES[emotion] || EMOTION_PROFILES.overwhelmed;

  const basePlan = {
    firstBite: profile.firstBite(task),
    nextSteps: profile.nextSteps(task),
    reframe: profile.reframe,
  };

  const { energy } = getState();
  return applyEnergy(basePlan, energy);
}

function applyEnergy(plan, energy) {
  if (!energy) return plan;

  if (energy === "low") {
    return {
      ...plan,
      firstBite: `Low-energy version: ${plan.firstBite}`,
      nextSteps: plan.nextSteps.slice(0, 2),
      reframe: `${plan.reframe} Low energy still counts.`,
    };
  }

  if (energy === "high") {
    return {
      ...plan,
      nextSteps: [...plan.nextSteps, "If you still have momentum, do one extra tiny step"],
      reframe: `${plan.reframe} Use the energy while it’s here.`,
    };
  }

  // medium
  return plan;
}
