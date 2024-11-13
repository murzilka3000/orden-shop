import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem } from '../types/Type';

// Обновите CartItem, если он использует number для productId в types/Type.ts
// export type CartItem = {
//     productId: string; // Изменено на string
//     quantity: number;
//     price: number; 
//     name: string;
//     image: string;
// };

type CartState = {
    items: CartItem[];
};

type CartAction =
    | { type: 'ADD_TO_CART'; payload: CartItem }
    | { type: 'REMOVE_FROM_CART'; payload: string } // Изменено на string
    | { type: 'CLEAR_CART' }
    | { type: 'INCREASE_QUANTITY'; payload: string } // Изменено на string
    | { type: 'DECREASE_QUANTITY'; payload: string } // Изменено на string

const initialState: CartState = {
    items: []
};

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingItemIndex = state.items.findIndex(item => item.productId === action.payload.productId);

            if (existingItemIndex !== -1) {
                // Если товар уже есть в корзине, увеличиваем его количество
                const updatedItems = state.items.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + action.payload.quantity }
                        : item
                );
                return { ...state, items: updatedItems };
            } else {
                // Если товара нет в корзине, добавляем его как новый элемент
                return { ...state, items: [...state.items, action.payload] };
            }
        }
        case 'REMOVE_FROM_CART':
            return { ...state, items: state.items.filter(item => item.productId !== action.payload) };
        case 'CLEAR_CART':
            return { ...state, items: [] };
        case 'INCREASE_QUANTITY':
            return { 
                ...state, 
                items: state.items.map(item => 
                    item.productId === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                ) 
            };
        case 'DECREASE_QUANTITY':
            return { 
                ...state, 
                items: state.items.map(item => 
                    item.productId === action.payload ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
                ) 
            };
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