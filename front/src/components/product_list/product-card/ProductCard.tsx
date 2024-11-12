import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { useFavorites } from "../../../context/FavoritesContext"; // Импортируем контекст избранного
import { Product } from "../../../types/Type";
import s from "./ProductCard.module.scss";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch: cartDispatch } = useCart();
  const { state: favoriteState, dispatch: favoriteDispatch } = useFavorites(); // Подключаем избранное

  // Проверка, находится ли товар в избранном
  const isFavorite = favoriteState.items.includes(product.id);

  const handleAddToCart = () => {
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

    alert('Product added to cart!');


  };

  // Функция для добавления/удаления из избранного
  const toggleFavorite = () => {
    if (isFavorite) {
      favoriteDispatch({ type: 'REMOVE_FROM_FAVORITES', payload: product.id });
    } else {
      favoriteDispatch({ type: 'ADD_TO_FAVORITES', payload: product.id });
    }
  };

  return (
    <div className={s.product_card}>
      {/* Ссылка на страницу товара */}
      <Link to={`/product/${product.id}`}>
        <img className={s.product_image} src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>Price: ${product.price}</p>
      </Link>
      <button onClick={handleAddToCart}>Add to cart</button>
      <button onClick={toggleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default ProductCard;