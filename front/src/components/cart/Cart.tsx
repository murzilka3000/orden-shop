import React from 'react';
import { useCart } from '../../context/CartContext';


const Cart: React.FC = () => {
    const { state } = useCart();

    const totalPrice = state.items.reduce((total, item) => total + item.quantity * item.price, 0);
    return (
        <div>
            <h2>Cart</h2>
            {state.items.map((item, index) => (
                <div key={index}>
                    <img src={item.image} alt="" />
                    <p>{item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                </div>
            ))}
            <p>Total: ${totalPrice}</p>
            <button>Checkout</button>
        </div>
    );
};

export default Cart;