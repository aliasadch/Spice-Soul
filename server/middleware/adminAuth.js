const crypto = require('node:crypto');

const TOKEN_LIFETIME_SECONDS = 8 * 60 * 60;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_LOGIN_ATTEMPTS = 10;
const loginAttempts = new Map();

function getConfiguration() {
  const { ADMIN_PASSWORD, ADMIN_TOKEN_SECRET } = process.env;
  if (!ADMIN_PASSWORD || ADMIN_PASSWORD.length < 12 || !ADMIN_TOKEN_SECRET || ADMIN_TOKEN_SECRET.length < 32) {
    return null;
  }
  return { password: ADMIN_PASSWORD, secret: ADMIN_TOKEN_SECRET };
}

function safeEqual(left, right) {
  const leftHash = crypto.createHash('sha256').update(left).digest();
  const rightHash = crypto.createHash('sha256').update(right).digest();
  return crypto.timingSafeEqual(leftHash, rightHash);
}

function sign(payload, secret) {
  return crypto.createHmac('sha256', secret).update(payload).digest('base64url');
}

function loginAdmin(req, res) {
  const config = getConfiguration();
  if (!config) {
    return res.status(503).json({ error: 'Admin sign-in is not configured on the server.' });
  }

  const now = Date.now();
  const clientKey = req.ip;
  const attempt = loginAttempts.get(clientKey);
  if (attempt && now - attempt.startedAt < LOGIN_WINDOW_MS && attempt.count >= MAX_LOGIN_ATTEMPTS) {
    const retryAfter = Math.ceil((LOGIN_WINDOW_MS - (now - attempt.startedAt)) / 1000);
    res.set('Retry-After', String(retryAfter));
    return res.status(429).json({ error: 'Too many sign-in attempts. Try again later.' });
  }

  if (typeof req.body?.password !== 'string' || !safeEqual(req.body.password, config.password)) {
    if (!attempt || now - attempt.startedAt >= LOGIN_WINDOW_MS) {
      loginAttempts.set(clientKey, { startedAt: now, count: 1 });
    } else {
      attempt.count += 1;
    }
    return res.status(401).json({ error: 'Incorrect admin password.' });
  }

  loginAttempts.delete(clientKey);
  const payload = Buffer.from(JSON.stringify({
    exp: Math.floor(now / 1000) + TOKEN_LIFETIME_SECONDS
  })).toString('base64url');
  const token = `${payload}.${sign(payload, config.secret)}`;
  return res.json({ token, expiresIn: TOKEN_LIFETIME_SECONDS });
}

function requireAdmin(req, res, next) {
  const config = getConfiguration();
  if (!config) {
    return res.status(503).json({ error: 'Admin sign-in is not configured on the server.' });
  }

  const authorization = req.get('authorization') || '';
  const match = authorization.match(/^Bearer ([A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)$/);
  if (!match) {
    return res.status(401).json({ error: 'Admin sign-in required.' });
  }

  const [payload, signature] = match[1].split('.');
  const expectedSignature = sign(payload, config.secret);
  if (!safeEqual(signature, expectedSignature)) {
    return res.status(401).json({ error: 'Admin session is invalid or expired.' });
  }

  try {
    const claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    const now = Math.floor(Date.now() / 1000);
    if (!Number.isInteger(claims.exp) || claims.exp <= now || claims.exp > now + TOKEN_LIFETIME_SECONDS) {
      return res.status(401).json({ error: 'Admin session is invalid or expired.' });
    }
  } catch {
    return res.status(401).json({ error: 'Admin session is invalid or expired.' });
  }

  next();
}

module.exports = { loginAdmin, requireAdmin };
