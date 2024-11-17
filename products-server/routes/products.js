const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Получение всех товаров
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении товаров', error });
  }
});


router.get('/brands', async (req, res) => {
  try {
    const brands = await Product.distinct('brand'); // Получаем уникальные значения поля "brand"
    res.json(brands); // Отправляем данные клиенту
  } catch (error) {
    console.error('Ошибка при получении брендов:', error); // Логируем ошибку для отладки
    res.status(500).json({ message: 'Ошибка при получении брендов', error });
  }
});

// Получение товаров по бренду
router.get('/brand/:brandName', async (req, res) => {
  try {
    const brandName = req.params.brandName; // Получаем имя бренда из URL
    const products = await Product.find({ brand: brandName }); // Фильтруем товары по бренду
    res.json(products);
  } catch (error) {
    console.error('Ошибка при фильтрации товаров по бренду:', error);
    res.status(500).json({ message: 'Ошибка при фильтрации товаров по бренду', error });
  }
});

// Получение товара по ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении товара', error });
  }
});

// Создание нового товара
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Ошибка при добавлении товара', error });
  }
});

// Обновление товара
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Товар не найден' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Ошибка при обновлении товара', error });
  }
});


// Удаление товара
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Товар не найден' });
    }
    res.json({ message: 'Товар успешно удален' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении товара', error });
  }
});

module.exports = router;