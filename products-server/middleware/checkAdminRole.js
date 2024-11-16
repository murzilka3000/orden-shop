const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = 'your_jwt_secret';

const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Извлекаем токен из заголовка

  if (!token) {
    return res.status(401).json({ message: 'Нет авторизации' });
  }

  try {
    // Декодируем токен и получаем пользователя
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Доступ запрещён. Необходима роль администратора.' });
    }

    req.user = user; // Добавляем информацию о пользователе в запрос
    next(); // Переходим к следующему обработчику
  } catch (error) {
    res.status(401).json({ message: 'Ошибка авторизации', error });
  }
};

module.exports = isAdmin;