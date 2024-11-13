import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import axios from "axios";
import s from './ProductDetail.module.scss';
import Layout from "../layout/Layout";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [product, setProduct] = useState<Product | null>(null); // Состояние для хранения данных продукта
  const [loading, setLoading] = useState<boolean>(true); // Состояние загрузки

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке товара:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Если товар не найден
  if (!loading && !product) {
    return <p>Product not found</p>;
  }

  // Обработчик для добавления товара в корзину
  const handleAddToCart = () => {
    if (product) {
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          productId: product._id,
          quantity: 1,
          price: product.price,
          name: product.name,
          image: product.image,
        },
      });
      navigate('/cart'); // Переход в корзину после добавления
    }
  };

  return (
    <div>
      <Layout>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className={s.product_detail}>
            <h2>{product?.name}</h2>
            <img src={product?.image} alt={product?.name} />
            <p>{product?.description}</p>
            <p>Price: ${product?.price}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default ProductDetail;