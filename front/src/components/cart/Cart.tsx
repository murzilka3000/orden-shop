import React from 'react';
import { useCart } from '../../context/CartContext';
import s from './cart.module.scss'
import { Link } from 'react-router-dom';
import productsData from "../../data/products.json";


const Cart: React.FC = () => {
    const { state, dispatch } = useCart();

    const totalPrice = state.items.reduce((total, item) => {
        const product = productsData.find(p => p.id === item.productId);
        return total + (product ? item.quantity * product.price : 0);
    }, 0);



    const handleRemoveToCart = (productId: number) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    }

    const handleClearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    }

    const handleIncreaseQuantity = (productId: number) => {
        dispatch({ type: 'INCREASE_QUANTITY', payload: productId });
    }

    const handleDecreaseQuantity = (productId: number) => {
        dispatch({ type: 'DECREASE_QUANTITY', payload: productId });
        if (state.items.find(item => item.productId === productId)?.quantity === 1) {
            handleRemoveToCart(productId);
        }
    }

    return (
        <div className={s.cart_block}>
            <h2>Cart</h2>
            <div className={s.cart_container}>
                {state.items.map((item, index) => (
                    <div className={s.cart_item} key={index}>
                        <img src={item.image} alt="" />
                        <div>
                            <p>{item.name}</p>
                            <div className={s.quantity_container}>
                                <button onClick={() => handleDecreaseQuantity(item.productId)}>-</button>
                                <p>{item.quantity}</p>
                                <button onClick={() => handleIncreaseQuantity(item.productId)}>+</button>
                            </div>
                            <button onClick={() => handleRemoveToCart(item.productId)}>remove</button>
                        </div>
                    </div>
                ))}
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