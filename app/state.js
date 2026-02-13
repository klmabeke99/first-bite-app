const STORAGE_KEY = "firstBiteState_v1";

const defaultState = {
  task: "",
  emotion: "overwhelmed",
  sessionsCompleted: 0,

  focusRemaining: 300,
  focusRunning: false,
  focusLastTick: null
};


export function getState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultState };
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return { ...defaultState };
  }
}

export function setState(patch) {
  const current = getState();
  const next = { ...current, ...patch };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function resetState() {
  localStorage.removeItem(STORAGE_KEY);
}

/* 👇 ADD IT HERE — AT THE VERY BOTTOM */

export function incrementSessions() {
  const current = getState();
  const nextCount = (current.sessionsCompleted || 0) + 1;
  setState({ sessionsCompleted: nextCount });
  return nextCount;
}


