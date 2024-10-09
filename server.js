const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // La URL de tu frontend (React)
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions)); // Permite las solicitudes del frontend Y CON EL options lo limito solo a mi front
app.use(express.json()); // Habilita la lectura de JSON en las solicitudes

// Define una ruta de ejemplo
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Define otra ruta de ejemplo para recibir datos desde React
app.post('/api/user/registry', (req, res) => {
  const { name , surname, username, birthDate, email, password } = req.body;

  res.json({ message: `Hello, ${name} ${surname} ${username} ${birthDate} ${email} ${password} !` });
});
 

// Define otra ruta de ejemplo para recibir datos desde React
app.post('/api/user/login', (req, res) => {
  const { username, password } = req.body;
  // Authentication logic
  if (username === 'test' && password === 'mica') {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
});

// Inicia el servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

