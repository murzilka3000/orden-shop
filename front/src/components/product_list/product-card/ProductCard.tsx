import { useCart } from "../../../context/CartContext";
import { Product } from "../../../types/Type";
import s from "./ProductCard.module.scss"


type ProductCardProps = {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {

  const {dispatch} = useCart();

  const handleAddToCart = () => {
    // Пример кода, где добавляется товар в корзину
    dispatch({ type: 'ADD_TO_CART', payload: { productId: product.id, quantity: 1, price: product.price, name: product.name, image: product.image } });
  }

  return (
    <div className={s.product_card}>
      <img src={product.image} alt="" />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Prise: {product.price}</p>
      <button onClick={handleAddToCart}>Add to cart</button>
    </div>
  )
}

export default ProductCard