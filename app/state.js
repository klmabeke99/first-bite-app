const STORAGE_KEY = "firstBiteState_v1";

const defaultState = {
  task: "",
  emotion: "overwhelmed",
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

