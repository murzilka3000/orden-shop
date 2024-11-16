// routes/admin.js
const express = require('express');
const isAdmin = require('../middleware/checkAdminRole'); // Подключаем middleware
const router = express.Router();

router.get('/admin', isAdmin, (req, res) => {
  // Если сюда дошли, значит пользователь авторизован и является администратором
  res.status(200).json({ message: 'Добро пожаловать в админ-панель' });
});

module.exports = router;