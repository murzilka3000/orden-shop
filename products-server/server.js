const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Маршруты авторизации
const productRoutes = require('./routes/products'); // Маршруты продуктов
const authenticateToken = require('./middleware/authenticateToken'); // Middleware для проверки токена

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URL = 'mongodb://localhost:27017/productsDB';

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Подключение к базе данных установлено'))
.catch((error) => console.error('Ошибка подключения к базе данных:', error));

// Подключение маршрутов для авторизации и продуктов
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); // Продукты не требуют токена

// Пример защищённого маршрута
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Это защищённый маршрут', user: req.user });
});

// Запуск сервера
const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Products-сервер запущен на порту ${PORT}`);
});