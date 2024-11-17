import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BrandsList: React.FC = () => {
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/products/brands');
        setBrands(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке брендов:', error);
      }
    };

    fetchBrands();
  }, []);

  return (
    <div>
      <h2>Brands</h2>
      <ul>
        {brands.map((brand, index) => (
          <li key={index}>
            <Link to={`/brand/${brand}`}>{brand}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandsList;