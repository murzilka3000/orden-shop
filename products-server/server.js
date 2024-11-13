const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URL = 'mongodb://localhost:27017';

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Подключение к базе данных установлено'))
.catch((error) => console.error('Ошибка подключения к базе данных:', error));

// Запуск сервера
const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Products-сервер запущен на порту ${PORT}`);
});

const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);