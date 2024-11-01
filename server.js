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

var posts = [
  {
    title: "Jimmy Carter at a military flyover for his 100th birthday",
    content: "Jimmy Carter at a military flyover for his 100th birthday...",
    subreddit: "user",
    time: "hace 16 horas",
    created_at: "22/10/2024 12:01:27",
    id:1,
    likes: 19,
    comments: 35

  },
  {
    title: "Foo Fighters Enforced into hiatus",
    content: "Foo Fighters have announced that they are going into indefinite hiatus...",
    subreddit: "/r/music",
    time: "hace 10 horas",
    created_at: "23/10/2024 01:01:27",
    id:2,
    likes: 40,
    comments: 12
  }
];

var comments = [
  {
    
    content: "Jimmy Carter at a military flyover for his 100th birthday hola como...",
    subreddit: "user",
    time: "hace 16 horas",
    created_at: "22/10/2024 12:01:27",
    id:1,
    id_post: 1

  },
  {
    content: "Foo Fighters have announced that they are going into indefinite hiatus estas...",
    subreddit: "user",
    time: "hace 16 horas",
    created_at: "22/10/2024 12:01:27",
    id:2,
    id_post: 1
  }
  // ,
  // {
  //   content: "Prueba mica",
  //   subreddit: "user",
  //   time: "hace 16 horas",
  //   created_at: "22/10/2024 12:01:27",
  //   id:3,
  //   id_post: 2
  // }
];

// Define una ruta de ejemplo
app.get('/api/main/get/post', (req, res) => {
  res.json({ message: posts });
});

// Define otra ruta de ejemplo para recibir datos desde React
app.post('/api/main/create/post', (req, res) => {
  posts.push(req.body);
  res.json({ message: posts });
  // const { title , content, time, created_at, subreddit } = req.body;
  
  // res.json({ message: `Hello, ${title} ${content} ${time}  ${created_at} ${subreddit}!` });
});

app.get('/api/posts/:postId', (req, res) => {
  const postId = parseInt(req.params.postId); // Convertir postId a número
  const post = posts.find((p) => p.id === postId); // Buscar el post en el array

  if (post) {
    res.json({ message: post });
  } else {
    res.status(404).json({ message: 'Post no encontrado' });
  }
});

app.get('/api/comments-post/:postId', (req, res) => {
  const postId = parseInt(req.params.postId); // Convertir postId a número
  const filteredComments = comments.filter((comment) => comment.id_post === postId); // Filtrar los comentarios por id_post

  if (filteredComments.length > 0) {
    res.json({ message: filteredComments });
  } else {
    res.status(404).json({ message: 'No se encontraron comentarios para ese post' });
  }
});

app.post('/api/main/create/comment', (req, res) => {
  comments.push(req.body);
  res.json({ message: comments });
});


// Add this route in server.js
app.get('/api/search-post', (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  // Filter posts based on the search query
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
  );

  res.json({ message: filteredPosts });
});

app.get('/api/search-comments', (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  const filteredPosts = comments.filter(
    (comments) =>
        comments.content.toLowerCase().includes(query.toLowerCase())
  );

  res.json({ message: filteredPosts });
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

