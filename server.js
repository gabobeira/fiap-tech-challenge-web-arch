/* eslint-disable @typescript-eslint/no-require-imports */

const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const crypto = require("crypto");
const middlewares = jsonServer.defaults();
const port = 5000;

const oneHourMs = 60 * 60 * 1000;
const tokenExpirationMs = 30 * 60 * 1000;
const oneMinute = 60 * 1000;

const config = {
  secret: crypto.randomBytes(16).toString("hex"),
  tokenExpiration: tokenExpirationMs,
  saltLength: 16,
  maxLoginAttempts: 7,
  lockTime: oneHourMs,
};

let attemptsLoginFails = new Map();
let activeTokens = new Map();

function verifyAttemptsLimit(ip) {
  const attempts = attemptsLoginFails.get(ip) || {
    count: 0,
    firstLockTime: Date.now(),
  };

  const elapsed = Date.now() - attempts.firstLockTime;

  if (attempts.count >= config.maxLoginAttempts) {
    if (elapsed >= config.lockTime) {
      attempts.count = 1;
      attempts.firstLockTime = Date.now();
      attemptsLoginFails.set(ip, attempts);
      return { allowed: true };
    } else {
      const timeLeft = Math.ceil((config.lockTime - elapsed) / oneMinute);
      return { allowed: false, timeLeft };
    }
  }

  if (elapsed >= config.lockTime) {
    attempts.count = 1;
    attempts.firstLockTime = Date.now();
  } else {
    attempts.count++;
  }

  attemptsLoginFails.set(ip, attempts);
  return { allowed: true };
}

setInterval(() => {
  const now = Date.now();
  attemptsLoginFails.forEach((attempts, ip) => {
    if (config.lockTime < Date.now() - attempts.firstLockTime) {
      attemptsLoginFails.delete(ip);
    }
  });

  activeTokens.forEach((tokenUser, tokenKey) => {
    if (tokenUser.expirationTime < now) {
      activeTokens.delete(tokenKey);
    }
  });
}, config.lockTime);

function encryptToken(token) {
  const salt = crypto.randomBytes(config.saltLength).toString("hex");
  const hash = crypto.createHmac("sha256", salt).update(token).digest("hex");

  return {
    token: `${salt}:${hash}::${token}`,
  };
}

const generateToken = (user) => {
  const tokenUser = {
    id: user.id,
    email: user.email,
    expirationTime: Date.now() + config.tokenExpiration,
    token: crypto.randomBytes(16).toString("hex"),
    timestampLogin: Date.now(),
  };

  const token = encryptToken(JSON.stringify(tokenUser));

  activeTokens.set(tokenUser.token, tokenUser);

  return token;
};

server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  if (req.path === "/auth/login" || req.path === "/auth/register") {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token não informado." });
  }

  const token = authHeader.split(" ")[1];

  if (!activeTokens.has(token)) {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }

  next();
});

server.post("/auth/login", (req, res) => {
  const ip = req.ip;
  const { allowed, timeLeft } = verifyAttemptsLimit(ip);

  if (!allowed) {
    return res.status(429).json({
      message: `Muitas tentativas de login. Tente novamente em ${timeLeft} segundos.`,
    });
  }

  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password;
  const db = router.db;

  const user = db
    .get("auth")
    .find(
      (u) => u.email.trim().toLowerCase() === email && u.password === password
    )
    .value();

  if (user) {
    const { token } = generateToken(user);

    res.jsonp({
      token,
    });

    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ message: "Email ou senha inválidos." });
  }
});

server.get("/transactions/account/:id", (req, res) => {
  const { id } = req.params;
  const db = router.db;

  const transactions = db
    .get("transactions")
    .filter({ idAccount: Number(id) })
    .value();

  if (transactions && transactions.length > 0) {
    const newBalance = transactions.reduce(
      (acc, t) => acc + (Number(t.value) || 0),
      0
    );

    db.get("accounts")
      .find({ id: Number(id) })
      .assign({ balance: newBalance })
      .write();
  }

  res.status(200).json({ data: transactions });
});

server.get("/accounts/user/:idUser", (req, res) => {
  const { idUser } = req.params;
  const db = router.db;

  const accounts = db
    .get("accounts")
    .filter({ idUser: Number(idUser) })
    .value();

  accounts.forEach((account) => {
    const transactions = db
      .get("transactions")
      .filter({ idAccount: account.id })
      .value();

    if (transactions && transactions.length > 0) {
      const newBalance = transactions.reduce(
        (acc, t) => acc + (Number(t.value) || 0),
        0
      );
      account.balance = newBalance;

      db.get("accounts")
        .find({ id: account.id })
        .assign({ balance: newBalance })
        .write();
    }
  });

  res.status(200).json({ data: accounts });
});

server.post("/auth/register", (req, res) => {
  const db = router.db;
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Dados obrigatórios não informados." });
  }

  const existingUser = db
    .get("auth")
    .find({ email: email.trim().toLowerCase() })
    .value();

  if (existingUser) {
    return res.status(409).json({ message: "E-mail já cadastrado." });
  }

  const lastUser = db.get("auth").orderBy("id", "desc").first().value();
  const newUserId = lastUser ? lastUser.id + 1 : 1;

  const newUser = {
    id: newUserId,
    name,
    email: email.trim().toLowerCase(),
    password,
  };
  db.get("auth").push(newUser).write();

  const lastAccount = db.get("accounts").orderBy("id", "desc").first().value();
  const newAccountId = lastAccount ? lastAccount.id + 1 : 1;

  const newAccount = {
    id: newAccountId,
    fullName: name,
    firstName: name.split(" ")[0],
    balance: 0,
    currency: "R$",
    idUser: newUserId,
  };
  db.get("accounts").push(newAccount).write();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json({ user: userWithoutPassword, account: newAccount });
});

server.use(middlewares);
server.use(router);
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
