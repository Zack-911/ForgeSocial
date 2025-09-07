export function redact(value: string, visible = 3) {
  if (typeof value !== 'string') return String(value);
  if (value.length <= visible) return '*'.repeat(value.length);
  return value.slice(0, visible) + '*'.repeat(value.length - visible);
}