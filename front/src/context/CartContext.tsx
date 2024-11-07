import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem } from '../types/Type';

//TODO: вынести хук

type CartState = {
    items: CartItem[];
};

type CartAction =
    | { type: 'ADD_TO_CART'; payload: CartItem }
    | { type: 'REMOVE_FROM_CART'; payload: number };

const initialState: CartState = {
    items: []
};

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_TO_CART':
            return { ...state, items: [...state.items, action.payload] };
        case 'REMOVE_FROM_CART':
            return { ...state, items: state.items.filter(item => item.productId !== action.payload) };
        default:
            return state;
    }
}

const CartContext = createContext<{ state: CartState; dispatch: React.Dispatch<CartAction> } | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};