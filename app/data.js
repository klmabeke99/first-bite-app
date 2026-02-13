export const EMOTION_PROFILES = {
  anxious: {
    reframe: "Starting is success. You’re only doing the first inch.",
    firstBite: (task) => `Open the task and write one tiny first line about "${task}" (no pressure to finish).`,
    nextSteps: () => [
      "List 3 bullet points of what you need (not the full plan)",
      "Do the easiest bullet first",
      "Send/submit a rough first version",
    ],
  },

  overwhelmed: {
    reframe: "You don’t have to do it all. You only have to start.",
    firstBite: (task) => `Break "${task}" into 3 mini-parts. Write only the 3 parts.`,
    nextSteps: () => [
      "Pick the smallest part",
      "Work on it for 5 more minutes",
      "Stop after the timer and decide if you want another round",
    ],
  },

  bored: {
    reframe: "Make it a game. Tiny progress counts.",
    firstBite: (task) => `Set a 5-minute challenge: do the fastest possible version of "${task}".`,
    nextSteps: () => [
      "Add one tiny improvement",
      "Add one tiny improvement again",
      "Stop once it’s “good enough”",
    ],
  },

  confused: {
    reframe: "Clarity comes after movement, not before.",
    firstBite: (task) => `Write 1 question: “What is the next obvious step for "${task}"?” Then answer it in one sentence.`,
    nextSteps: () => [
      "Search/ask for the missing info (one message, one search)",
      "Write the first step as a checklist item",
      "Do that one checklist item",
    ],
  },

  tired: {
    reframe: "Low energy doesn’t mean zero progress.",
    firstBite: (task) => `Do the “setup step” for "${task}" only (open tabs, files, notebook, workspace).`,
    nextSteps: () => [
      "Do the easiest 2-minute action",
      "Take a short water break",
      "Do one more tiny action",
    ],
  },
  perfectionism: {
  premium: true,
  reframe: "Progress beats perfect. Done imperfectly is still done.",
  firstBite: (task) => `Create a deliberately imperfect version of "${task}". Aim for 60% quality only.`,
  nextSteps: () => [
    "Set a 5-minute limit",
    "Do not edit while creating",
    "Ship or save when timer ends",
  ],
},

avoidance: {
  premium: true,
  reframe: "Avoidance fades when exposure begins.",
  firstBite: (task) => `Open "${task}" and stare at it for 30 seconds. That’s it.`,
  nextSteps: () => [
    "Write one messy line",
    "Stand up and take one breath",
    "Return and write one more messy line",
  ],
},

low_dopamine: {
  premium: true,
  reframe: "Motivation follows motion.",
  firstBite: (task) => `Change your environment before touching "${task}" (stand up, change room, light, or music).`,
  nextSteps: () => [
    "Set a 3-minute micro sprint",
    "Reward yourself with movement",
    "Repeat once",
  ],
},

distracted: {
  premium: true,
  reframe: "Attention improves when friction is removed.",
  firstBite: (task) => `Remove one distraction before starting "${task}". Just one.`,
  nextSteps: () => [
    "Put phone in another room",
    "Close one browser tab",
    "Start timer immediately",
  ],
},

};

