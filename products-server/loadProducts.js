const mongoose = require('mongoose');
const Product = require('./models/Product');
const productsData = require('./data/products.json'); // JSON с товарами

const MONGO_URL = 'mongodb://localhost:27017';

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('Подключение к базе данных установлено');

  // Очистка коллекции товаров
  await Product.deleteMany({});
  console.log('Старая коллекция товаров очищена');

  // Загрузка товаров
  await Product.insertMany(productsData);
  console.log('Товары успешно загружены');
  
  mongoose.disconnect();
})
.catch((error) => {
  console.error('Ошибка загрузки данных:', error);
});