import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../../types/Type';
import s from './AdminPanel.module.scss';
import Layout from '../layout/Layout';

const AdminPanel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    image: '',
    discountPrice: null, // Используем null вместо undefined
    category: '',
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке товаров:', error);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post('http://localhost:5002/api/products', newProduct);
      setProducts([...products, response.data]);
      setNewProduct({ name: '', description: '', price: 0, image: '', discountPrice: null, category: '' });
    } catch (error) {
      console.error('Ошибка при добавлении товара:', error);
    }
  };

  const handleUpdateProduct = async (product: Product) => {
    try {
      const response = await axios.put(`http://localhost:5002/api/products/${product._id}`, product);
      setProducts(products.map((p) => (p._id === product._id ? response.data : p)));
      setEditingProduct(null);
    } catch (error) {
      console.error('Ошибка при обновлении товара:', error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await axios.delete(`http://localhost:5002/api/products/${productId}`);
      setProducts(products.filter((p) => p._id !== productId));
    } catch (error) {
      console.error('Ошибка при удалении товара:', error);
    }
  };

  // Общая функция для обработки изменения полей
  const handleInputChange = (key: keyof typeof newProduct, value: string) => {
    setNewProduct((prev) => ({
      ...prev,
      [key]: key === 'price' || key === 'discountPrice' ? parseFloat(value) || null : value,
    }));
  };

  return (
    <div className={s.admin_panel}>
      <Layout>
        <h2>Admin Panel</h2>
        <div className={s.add_product}>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
          <select
            value={newProduct.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
          >
            <option value="">Select category</option>
            <option value="shoes">обувь</option>
            <option value="clothes">одежда</option>
            <option value="accessories">аксессуары</option>
            <option value="bags">сумки</option>
          </select>
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price || ''}
            onChange={(e) => handleInputChange('price', e.target.value)}
          />
          <input
            type="number"
            placeholder="Discount Price"
            value={newProduct.discountPrice ?? ''}
            onChange={(e) => handleInputChange('discountPrice', e.target.value)}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) => handleInputChange('image', e.target.value)}
          />
          <button onClick={handleAddProduct}>Add Product</button>
        </div>

        <ul className={s.product}>
          {products.map((product) => (
            <li key={product._id}>
              {editingProduct?._id === product._id ? (
                <>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={editingProduct.description}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, description: e.target.value })
                    }
                  />
                  <select
                    value={editingProduct.category}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, category: e.target.value })
                    }
                  >
                    <option value="">Select category</option>
                    <option value="shoes">обувь</option>
                    <option value="clothes">одежда</option>
                    <option value="accessories">аксессуары</option>
                    <option value="bags">сумки</option>
                  </select>
                  <input
                    type="number"
                    value={editingProduct.price || ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                  <input
                    type="number"
                    value={editingProduct.discountPrice ?? ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        discountPrice: parseFloat(e.target.value) || null,
                      })
                    }
                  />
                  <input
                    type="text"
                    value={editingProduct.image}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, image: e.target.value })
                    }
                  />
                  <button onClick={() => handleUpdateProduct(editingProduct)}>Save</button>
                  <button onClick={() => setEditingProduct(null)}>Cancel</button>
                </>
              ) : (
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Category: {product.category}</p>
                  <p>Price: ${product.price}</p>
                  {product.discountPrice && (
                    <p>
                      Discount Price: ${product.discountPrice}
                    </p>
                  )}
                  <img className={s.product_image} src={product.image} alt={product.name} />
                  <button onClick={() => setEditingProduct(product)}>Edit</button>
                  <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </Layout>
    </div>
  );
};

export default AdminPanel;