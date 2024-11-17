import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Product } from '../../types/Type';
import s from './BrandProductsPage.module.scss';
import ProductCard from '../product_list/product-card/ProductCard';

const BrandProductsPage: React.FC = () => {
  const { brandName } = useParams<{ brandName: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/products/brand/${brandName}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке товаров бренда:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [brandName]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={s.brand_products}>
      <h2>Товары бренда: {brandName}</h2>
      <div className={s.products}>
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product._id} product={product} />)
        ) : (
          <p>No products found for this brand.</p>
        )}
      </div>
    </div>
  );
};

export default BrandProductsPage;