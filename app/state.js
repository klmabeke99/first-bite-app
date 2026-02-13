const STORAGE_KEY = "firstBiteState_v1";

const defaultState = {
  task: "",
  emotion: "overwhelmed",
  sessionsCompleted: 0,
  streakDays: 0,
  lastSessionDate: null,

  focusRemaining: null,
  focusRunning: false,
  focusLastTick: null,

  premiumUnlocked: false, // 👈 NEW
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

function todayKey() {
  // Local date in YYYY-MM-DD
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function isYesterday(dateKey) {
  if (!dateKey) return false;

  const [y, m, d] = dateKey.split("-").map(Number);
  const last = new Date(y, m - 1, d);
  const now = new Date();

  // Normalize to midnight local time
  const lastMid = new Date(last.getFullYear(), last.getMonth(), last.getDate());
  const nowMid = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffDays = Math.round((nowMid - lastMid) / (1000 * 60 * 60 * 24));
  return diffDays === 1;
}

export function applyDailyStreak() {
  const state = getState();
  const today = todayKey();

  // Already counted today → no change
  if (state.lastStreakDate === today) {
    return state.streakDays || 0;
  }

  // If last date was yesterday → streak continues, else reset to 1
  const nextStreak = isYesterday(state.lastStreakDate) ? (state.streakDays || 0) + 1 : 1;

  setState({
    streakDays: nextStreak,
    lastStreakDate: today,
  });

  return nextStreak;
}

