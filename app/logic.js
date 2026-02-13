import { EMOTION_PROFILES } from "./data.js";

export function buildPlan(task, emotion) {
  const profile = EMOTION_PROFILES[emotion] || EMOTION_PROFILES.overwhelmed;

  return {
    firstBite: profile.firstBite(task),
    nextSteps: profile.nextSteps(task),
    reframe: profile.reframe,
  };
}

