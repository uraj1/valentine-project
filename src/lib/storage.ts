const KEY = "love-portal-premium-v1";

export type LovePortalState = {
  herName?: string;
  ourSongUrl?: string;
  metAtISO?: string;
  yesClicked?: boolean;
};

export function loadState(): LovePortalState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveState(next: LovePortalState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}
