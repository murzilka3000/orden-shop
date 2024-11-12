import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import productsData from '../../data/products.json';
import { Product } from '../../types/Type';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const FavoritesList: React.FC = () => {
    const { state, dispatch: favoriteDispatch } = useFavorites();
    const { dispatch: cartDispatch } = useCart();
    const navigate = useNavigate();

    // Находим избранные товары
    const favoriteProducts: Product[] = productsData.filter(product => state.items.includes(product.id));

    if (favoriteProducts.length === 0) {
        return <p>Your favorites list is empty.</p>;
    }

    // Функция добавления товара в корзину и удаления из избранного
    const handleAddToCart = (product: Product) => {
      // Добавляем товар в корзину
      cartDispatch({
        type: 'ADD_TO_CART',
        payload: {
          productId: product.id,
          quantity: 1,
          price: product.price,
          name: product.name,
          image: product.image,
        },
      });
      // Удаляем товар из избранного
      favoriteDispatch({ type: 'REMOVE_FROM_FAVORITES', payload: product.id });
      // Переход в корзину после добавления
      navigate('/cart');
    };

    return (
        <div>
            <h2>Your Favorites</h2>
            <ul>
                {favoriteProducts.map(product => (
                    <li key={product.id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavoritesList;