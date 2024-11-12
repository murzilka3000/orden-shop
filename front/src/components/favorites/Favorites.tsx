import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import productsData from '../../data/products.json';
import { Product } from '../../types/Type';

const FavoritesList: React.FC = () => {
    const { state } = useFavorites();
    
    const favoriteProducts: Product[] = productsData.filter(product => state.items.includes(product.id));

    if (favoriteProducts.length === 0) {
        return <p>Your favorites list is empty.</p>;
    }

    return (
        <div>
            <h2>Your Favorites</h2>
            <ul>
                {favoriteProducts.map(product => (
                    <li key={product.id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavoritesList;