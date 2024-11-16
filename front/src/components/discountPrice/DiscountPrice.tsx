import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../../types/Type'; // Предполагается, что типы для продукта определены
import s from './DiscountPrice.module.scss';
import Layout from '../layout/Layout';

const DiscountPrice: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // Массив товаров
  const [loading, setLoading] = useState<boolean>(true); // Состояние загрузки
  const [error, setError] = useState<string | null>(null); // Состояние ошибки

  // Делаем запрос к серверу для получения товаров
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch {
        setError('Ошибка при загрузке товаров');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Пустой массив зависимостей, чтобы запрос выполнялся только один раз при монтировании компонента

  // Фильтруем товары с положительной скидкой
  const discountedProducts = products.filter((product) => product.discountPrice !== null && product.discountPrice !== 0);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Layout>
      <h2>Товары со скидкой</h2>
      {discountedProducts.length > 0 ? (
        <ul className={s.discount_price_list}>
          {discountedProducts.map((product) => (
            <li key={product._id} className={s.discount_price_item}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Цена: ${product.price}</p>
              <p>Скидка: ${product.discountPrice}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Товары со скидкой не найдены.</p>
      )}
      </Layout>
    </div>
  );
};

export default DiscountPrice;