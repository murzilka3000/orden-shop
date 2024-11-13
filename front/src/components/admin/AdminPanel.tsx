import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../../types/Type';
import s from './AdminPanel.module.scss';

const AdminPanel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0, image: '' });
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
      setNewProduct({ name: '', description: '', price: 0, image: '' });
    } catch (error) {
      console.error('Ошибка при добавлении товара:', error);
    }
  };

  const handleUpdateProduct = async (product: Product) => {
    try {
      const response = await axios.put(`http://localhost:5002/api/products/${product._id}`, product);
      setProducts(products.map(p => (p._id === product._id ? response.data : p)));
      setEditingProduct(null);
    } catch (error) {
      console.error('Ошибка при обновлении товара:', error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await axios.delete(`http://localhost:5002/api/products/${productId}`);
      setProducts(products.filter(p => p._id !== productId));
    } catch (error) {
      console.error('Ошибка при удалении товара:', error);
    }
  };

  return (
    <div className={s.admin_panel}>
      <h2>Admin Panel</h2>
      <div className={s.add_product}>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <ul className={s.product_list}>
        {products.map((product) => (
          <li key={product._id}>
            {editingProduct?._id === product._id ? (
              <>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                />
                <input
                  type="text"
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                />
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                />
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                />
                <button onClick={() => handleUpdateProduct(editingProduct)}>Save</button>
                <button onClick={() => setEditingProduct(null)}>Cancel</button>
              </>
            ) : (
              <>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <img src={product.image} alt={product.name} />
                <button onClick={() => setEditingProduct(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;