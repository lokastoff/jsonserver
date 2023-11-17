const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const port = 3000;

server.use(jsonServer.bodyParser);
server.use(middlewares);

// Регистрация нового пользователя
server.post('/register', (req, res) => {
    const { email, password } = req.body;
  
    // Проверка наличия email и password в запросе
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }
  
    // Проверка наличия пользователя с таким email в базе данных
    const db = router.db;
    const existingUser = db.get('users').find({ email }).value();
  
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }
  
    // Добавление нового пользователя в базу данных
    db.get('users').push({ email, password }).write();
  
    return res.status(201).json({ message: 'User registered successfully' });
  });
  

server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});