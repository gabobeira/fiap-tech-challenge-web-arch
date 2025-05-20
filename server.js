/* eslint-disable @typescript-eslint/no-require-imports */

const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const crypto = require("crypto");
const middlewares = jsonServer.defaults();
const port = 5000;

const config = {
  secret: crypto.randomBytes(16).toString("hex"),
  tokenExpiration: 1800000,
  saltLength: 16,
  maxLoginAttempts: 7,
  lockTime: 120000,
};

let attemptsLoginFails = new Map();

function verifyAttemptsLimit(ip) {
  const attempts = attemptsLoginFails.get(ip) || {
    count: 0,
    firstLockTime: Date.now(),
  };

  if (attempts.count >= config.maxLoginAttempts) {
    const timeLeft = Math.ceil(
      (config.lockTime - (Date.now() - attempts.firstLockTime)) / 1000
    );

    return { allowed: false, lockTime: timeLeft };
  }

  if (config.lockTime < Date.now() - attempts.firstLockTime) {
    attempts.count = 0;
    attempts.firstLockTime = Date.now();
  }

  attempts.count++;
  attemptsLoginFails.set(ip, attempts);

  return { allowed: true };
}

setInterval(() => {
  attemptsLoginFails.forEach((attempts, ip) => {
    if (config.lockTime < Date.now() - attempts.firstLockTime) {
      attemptsLoginFails.delete(ip);
    }
  });
}, config.lockTime);

function encryptToken(token) {
  const salt = crypto.randomBytes(config.saltLength).toString("hex");
  const hash = crypto.createHmac("sha256", salt).update(token).digest("hex");

  const expiresAt = Date.now() + config.tokenExpiration;

  return {
    token: `${salt}:${hash}`,
    expiresAt,
  };
}

const generateToken = (user) => {
  const tokenUser = {
    userId: user.id,
    email: user.email,
    password: user.password,
    expirationTime: Date.now() + config.tokenExpiration,
    token: crypto.randomBytes(16).toString("hex"),
    timestampLogin: Date.now(),
  };

  const token = encryptToken(JSON.parse(tokenUser));

  return token;
};

server.post("/auth/login", (req, res) => {
  const ip = req.ip;
  const { allowed, timeLeft } = verifyAttemptsLimit(ip);

  if (!allowed) {
    return res.status(429).json({
      message: `Too many login attempts. Please try again in ${timeLeft} seconds.`,
    });
  }

  const { email, password } = req.body;
  const db = router.db;
  const user = db.get("users").find({ email, password }).value();

  if (user) {
    const { token, expiresAt } = generateToken(user);

    res.jsonp({
      token,
      expiresAt,
    });

    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

server.use(middlewares);
server.use(router);
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
