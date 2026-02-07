export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function formatTimeSince(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;

  return { days, hours, minutes, seconds };
}

export function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

export function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}
