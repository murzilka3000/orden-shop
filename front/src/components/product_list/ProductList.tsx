import { useEffect, useState } from "react";
import axios from "axios"; // Импорт axios для запросов
import { Product } from "../../types/Type";
import ProductCard from "./product-card/ProductCard";
import s from "./ProductList.module.scss";
import Layout from "../layout/Layout";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Функция для получения данных о товарах с сервера
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/products'); // URL API
        setProducts(response.data); // Установка данных продуктов после загрузки
      } catch (error) {
        console.error("Ошибка при получении товаров:", error);
      }
    };

    fetchProducts(); // Вызов функции для загрузки данных
  }, []);

  return (
    <div>
      <Layout>
        <div className={s.product_list}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default ProductList;