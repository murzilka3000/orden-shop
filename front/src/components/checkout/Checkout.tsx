import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios'; // Импортируем AxiosError

const Checkout: React.FC = () => {
    const { state, dispatch } = useCart();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        email: '',
        phone: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            console.log('Отправка данных на сервер:', { formData, cartItems: state.items });
            
            // Отправка данных на сервер
            await axios.post('http://localhost:5001/checkout', {
                formData,
                cartItems: state.items,
            });

            // Очистка корзины после успешной отправки
            dispatch({ type: 'CLEAR_CART' });
            navigate('/'); // Перенаправление на главную страницу

            alert('Ваш заказ успешно оформлен!');
        } catch (error) {
            // Проверка типа error как AxiosError
            if (error instanceof AxiosError) {
                console.error('Ошибка при отправке заказа:', error.message);
                console.error('Подробности:', error.response ? error.response.data : error.message);
            } else if (error instanceof Error) {
                console.error('Произошла неизвестная ошибка:', error.message);
            } else {
                console.error('Произошла ошибка неизвестного типа:', error);
            }
            alert('Ошибка при оформлении заказа, попробуйте снова.');
        }
    };

    return (
        <div>
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Phone:
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

export default Checkout;