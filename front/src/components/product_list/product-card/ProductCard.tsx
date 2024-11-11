import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { Product } from "../../../types/Type";
import s from "./ProductCard.module.scss";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        productId: product.id,
        quantity: 1,
        price: product.price,
        name: product.name,
        image: product.image,
      },
    });
  };

  return (
    <div className={s.product_card}>
      {/* Ссылка на страницу товара */}
      <Link to={`/product/${product.id}`}>
        <img className={s.product_image} src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
      </Link>
      <button onClick={handleAddToCart}>Add to cart</button>
    </div>
  );
};

export default ProductCard;