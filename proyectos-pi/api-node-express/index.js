const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const secretKey = 'your-secret-key';

app.use(bodyParser.json());

// Datos de ejemplo (en una app real esto vendría de una base de datos)
const users = [
  { id: 1, username: 'testuser', password: '123456' },
  { id: 2, username: 'admin', password: 'admin123' }
];

// Public route
app.get('/api/data', (req, res) => {
  res.json({ message: 'This is public data' });
});

// Login route (valida usuario y contraseña)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Verificar que se envíen las credenciales
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  // Buscar usuario
  const user = users.find(u => u.username === username && u.password === password);

  // Validar credenciales
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Generar token
  jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '30m' }, (err, token) => {
    if (err) {
      return res.status(500).json({ message: 'Error generating token' });
    }
    res.json({ token });
  });
});

// Protected route
app.get('/api/protected', verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'This is protected data',
        authData
      });
    }
  });
});

// Middleware para verificar token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
