import React, { useEffect, useState } from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import axios from 'axios';
import { Product } from '../../types/Type';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Notification from '../notification/Notification';

const FavoritesList: React.FC = () => {
    const { state, dispatch: favoriteDispatch } = useFavorites();
    const { dispatch: cartDispatch } = useCart();
    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([]); // Состояние для всех товаров
    const [notification, setNotification] = useState<string | null>(null); // Состояние для уведомления

    // Загрузка данных о продуктах с сервера
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/products'); // Запрос к API
                setProducts(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке товаров:', error);
            }
        };
        fetchProducts();
    }, []);

    // Фильтрация избранных товаров
    const favoriteProducts: Product[] = products.filter(product => state.items.includes(product.id));

    if (favoriteProducts.length === 0) {
        return <p>Your favorites list is empty.</p>;
    }

    const handleAddToCart = (product: Product) => {
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
        favoriteDispatch({ type: 'REMOVE_FROM_FAVORITES', payload: product.id });

        // Устанавливаем уведомление
        setNotification('Product added to cart!');
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

            {/* Показываем уведомление, если оно установлено */}
            {notification && (
                <Notification 
                    message={notification} 
                    onClose={() => setNotification(null)} 
                />
            )}
        </div>
    );
};

export default FavoritesList;