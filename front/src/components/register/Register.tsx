import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api'; // Настроенный axios

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { username, password });
      setSuccess('Регистрация прошла успешно! Теперь вы можете войти.');
      setTimeout(() => navigate('/login'), 2000); // Перенаправление через 2 секунды
    } catch {
      setError('Ошибка при регистрации. Попробуйте снова.');
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default Register;