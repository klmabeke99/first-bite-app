import { EMOTION_PROFILES } from "./data.js";

export function buildPlan(task, emotion) {
  // Premium-specific emotion blocks (override profiles)
  if (emotion === "perfectionism") {
    return {
      firstBite: `Create a deliberately imperfect version of "${task}". Aim for 60% quality only.`,
      nextSteps: [
        "Set a 5-minute limit",
        "Do not edit while creating",
        "Ship or save when timer ends",
      ],
      reframe: "Progress beats perfect. Done imperfectly is still done.",
    };
  }

  if (emotion === "avoidance") {
    return {
      firstBite: `Open "${task}" and stare at it for 30 seconds. That’s it.`,
      nextSteps: [
        "Write one messy line",
        "Stand up and take one breath",
        "Return and write one more messy line",
      ],
      reframe: "Avoidance fades when exposure begins.",
    };
  }

  if (emotion === "low_dopamine") {
    return {
      firstBite: `Change your environment before touching "${task}" (stand up, change room, light, or music).`,
      nextSteps: [
        "Set a 3-minute micro sprint",
        "Reward yourself with movement",
        "Repeat once",
      ],
      reframe: "Motivation follows motion.",
    };
  }

  if (emotion === "distracted") {
    return {
      firstBite: `Remove one distraction before starting "${task}". Just one.`,
      nextSteps: [
        "Put phone in another room",
        "Close one browser tab",
        "Start timer immediately",
      ],
      reframe: "Attention improves when friction is removed.",
    };
  }

  // Default: use emotion profiles from data.js
  const profile = EMOTION_PROFILES[emotion] || EMOTION_PROFILES.overwhelmed;

  return {
    firstBite: profile.firstBite(task),
    nextSteps: profile.nextSteps(task),
    reframe: profile.reframe,
  };
}

