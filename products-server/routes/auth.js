const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = 'your_jwt_secret'; // Секретный ключ для JWT

// Маршрут регистрации
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Проверка на существование пользователя
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание нового пользователя
    const newUser = new User({
      username,
      password: hashedPassword,
      role: role || 'user', // Если роль не указана, будет назначена роль 'user'
    });

    await newUser.save();

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    res.status(500).json({ message: 'Ошибка при регистрации', error });
  }
});

// Маршрут входа
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Поиск пользователя по имени
    const user = await User.findOne({ username });
    if (!user) {
      console.log(`Пользователь с именем ${username} не найден`);
      return res.status(401).json({ message: 'Неверное имя пользователя или пароль' });
    }

    console.log('Найден пользователь:', user);

    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(`Сравнение паролей: ${isPasswordValid}`);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Неверное имя пользователя или пароль' });
    }

    // Создание JWT токена с ролью
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Возвращаем токен и роль
    res.json({ token, role: user.role });
  } catch (error) {
    console.error('Ошибка при входе:', error);
    res.status(500).json({ message: 'Ошибка при входе', error });
  }
});

module.exports = router;