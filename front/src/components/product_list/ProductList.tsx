import { useEffect, useState } from "react";
import { Product } from "../../types/Type";
import productsData from "../../data/products.json";
import ProductCard from "./product-card/ProductCard";
import s from "./ProductList.module.scss"
import Layout from "../layout/Layout";


const ProductList: React.FC = () => {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(productsData); // Установка данных продуктов один раз при монтировании компонента
  }, []); 


  return (
    <div>
      <Layout>
        <div className={s.product_list}>
          {
          products.map(product => {
            return (
              <ProductCard
              key={product.id}
              product={product}
              />
            )
          })
        }
        </div>
      </Layout>
    </div>
  )
}

export default ProductList