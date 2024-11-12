
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type FavoriteState = {
    items: number[]; // Массив id товаров
};

type FavoriteAction = 
    | { type: 'ADD_TO_FAVORITES'; payload: number }
    | { type: 'REMOVE_FROM_FAVORITES'; payload: number };

const initialState: FavoriteState = {
    items: []
};

// Редуктор для управления состоянием избранного
function favoritesReducer(state: FavoriteState, action: FavoriteAction): FavoriteState {
    switch (action.type) {
        case 'ADD_TO_FAVORITES':
            return { ...state, items: [...state.items, action.payload] };
        case 'REMOVE_FROM_FAVORITES':
            return { ...state, items: state.items.filter(id => id !== action.payload) };
        default:
            return state;
    }
}

const FavoritesContext = createContext<{ state: FavoriteState; dispatch: React.Dispatch<FavoriteAction> } | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(favoritesReducer, initialState);
    return <FavoritesContext.Provider value={{ state, dispatch }}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
};