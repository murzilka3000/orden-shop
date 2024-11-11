import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import productsData from "../../data/products.json";
import s from './ProductDetail.module.scss'
import Layout from "../layout/Layout";

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { dispatch } = useCart(); // Получите dispatch из useCart

  // Найдите продукт по productId
  const product = productsData.find(p => p.id === parseInt(productId || '', 10));
  if (!product) {
    return <p>Product not found</p>;
  }

  // Обработчик для добавления товара в корзину
  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        productId: product.id,
        quantity: 1,
        price: product.price,
        name: product.name,
        image: product.image,
      },
    });
    navigate('/cart'); // Переход в корзину после добавления
  };

  return (
    <div>
      <Layout>
        <div className={s.product_detail}>
          <h2>{product.name}</h2>
          <img src={product.image} alt={product.name} />
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </Layout>
    </div>
  );
};

export default ProductDetail;