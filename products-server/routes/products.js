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

// Добавление нового товара (если требуется)
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Ошибка при добавлении товара', error });
  }
});

module.exports = router;