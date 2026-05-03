const hits = new Map<string, { count: number; resetTime: number }>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_HITS = 5; // 5 emails per hour per IP

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetTime) {
    hits.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return { allowed: true };
  }

  if (entry.count >= MAX_HITS) {
    const retryAfterSeconds = Math.ceil((entry.resetTime - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  entry.count++;
  return { allowed: true };
}
