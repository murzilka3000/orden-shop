import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import axios from 'axios';
import s from './cart.module.scss';
import { Link } from 'react-router-dom';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

const Cart: React.FC = () => {
    const { state, dispatch } = useCart();
    const [products, setProducts] = useState<Product[]>([]);

    // Загружаем данные о продуктах с сервера
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/products'); // URL вашего products-server
                setProducts(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке товаров:', error);
            }
        };
        fetchProducts();
    }, []);

    // Рассчитываем общую сумму корзины
    const totalPrice = state.items.reduce((total, item) => {
        const product = products.find(p => p.id === item.productId);
        return total + (product ? item.quantity * product.price : 0);
    }, 0);

    const handleRemoveToCart = (productId: number) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    };

    const handleClearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const handleIncreaseQuantity = (productId: number) => {
        dispatch({ type: 'INCREASE_QUANTITY', payload: productId });
    };

    const handleDecreaseQuantity = (productId: number) => {
        dispatch({ type: 'DECREASE_QUANTITY', payload: productId });
        if (state.items.find(item => item.productId === productId)?.quantity === 1) {
            handleRemoveToCart(productId);
        }
    };

    return (
        <div className={s.cart_block}>
            <h2>Cart</h2>
            <div className={s.cart_container}>
                {state.items.map((item, index) => {
                    const product = products.find(p => p.id === item.productId);
                    return product ? (
                        <div className={s.cart_item} key={index}>
                            <img src={product.image} alt={product.name} />
                            <div>
                                <p>{product.name}</p>
                                <p>${product.price}</p>
                                <div className={s.quantity_container}>
                                    <button onClick={() => handleDecreaseQuantity(item.productId)}>-</button>
                                    <p>{item.quantity}</p>
                                    <button onClick={() => handleIncreaseQuantity(item.productId)}>+</button>
                                </div>
                                <button onClick={() => handleRemoveToCart(item.productId)}>remove</button>
                            </div>
                        </div>
                    ) : null;
                })}
            </div>
            <p>Total: ${totalPrice}</p>
            <Link to={'/checkout'}>
                <button>Checkout</button>
            </Link>
            <button onClick={handleClearCart}>Clear cart</button>
            {state.items.length === 0 && 
            <div>
                <p>Your cart is empty</p>
            </div>
            }
        </div>
    );
};

export default Cart;