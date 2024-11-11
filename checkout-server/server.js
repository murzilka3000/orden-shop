const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

console.log('Сервер запущен и готов принимать запросы...');

// Настройка транспортера с использованием Gmail SMTP сервера
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nikolayzhidkov37ooo@gmail.com', // Ваш Gmail адрес
    pass: 'ziab jucc llgt mvws'  // Пароль приложения
  }
});

// Проверка подключения к Gmail SMTP серверу
transporter.verify((error, success) => {
  if (error) {
    console.error('Ошибка подключения к SMTP серверу Gmail:', error.message);
  } else {
    console.log('Подключение к SMTP серверу Gmail успешно:', success);
  }
});

// Маршрут для обработки заказа
app.post('/checkout', (req, res) => {
  console.log('Получен запрос на /checkout');
  console.log('Данные запроса:', req.body);

  const { formData, cartItems } = req.body;

  // Проверка на наличие данных
  if (!formData || !cartItems || cartItems.length === 0) {
    console.error('Ошибка: отсутствуют данные формы или товары в корзине');
    return res.status(400).json({ message: 'Отсутствуют данные формы или товары в корзине' });
  }

  // Составляем содержимое письма
  const emailContent = `
    <h2>Новый заказ</h2>
    <p><strong>Имя:</strong> ${formData.name}</p>
    <p><strong>Адрес:</strong> ${formData.address}</p>
    <p><strong>Email:</strong> ${formData.email}</p>
    <p><strong>Телефон:</strong> ${formData.phone}</p>
    <h3>Товары:</h3>
    <ul>
      ${cartItems.map(item => `<li>${item.name} x ${item.quantity} — $${item.price * item.quantity}</li>`).join('')}
    </ul>
    <p><strong>Итоговая сумма:</strong> $${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
  `;

  // Параметры email
  const mailOptions = {
    from: 'nikolayzhidkov37ooo@gmail.com', // Ваш Gmail адрес
    to: 'nikolayzhidkov@icloud.com', // Ваш email для получения заказа
    subject: 'Новый заказ',
    html: emailContent
  };

  console.log('Подготовка к отправке email...');
  console.log('Параметры email:', mailOptions);

  // Отправка email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Ошибка при отправке email:', error);
      return res.status(500).json({ message: 'Ошибка при отправке заказа', error: error.message });
    }

    console.log('Email успешно отправлен:', info.messageId);
    res.status(200).send('Заказ успешно отправлен');
  });
});

// Запуск сервера
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});