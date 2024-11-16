// App.tsx

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import CartPage from "./pages/cart_page/CartPage";
import Shop from "./pages/shop/Shop";
import CheckoutPage from "./pages/checkout_page/CheckoutPage";
import FavoritesPage from "./pages/favorites_page/FavoritesPage";
import ProductDetail from "./components/product_detail/ProductDetail";
import { FavoritesProvider } from "./context/FavoritesContext";
import AdminPanel from "./components/admin/AdminPanel";
import Login from "./components/login/Login";
import { AuthProvider } from "./context/AuthContext";
import Register from './components/register/Register'; 
import DiscountPrice from "./components/discountPrice/DiscountPrice";
import PrivateRoute from "./components/PrivateRoute"; // Импортируем PrivateRoute
import "./App.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FavoritesProvider>
          <CartProvider>
            <Header />
            <Routes>
              {/* Публичные маршруты */}
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/discount-price" element={<DiscountPrice />} />
              <Route path="/register" element={<Register />} />

              {/* Защищённые маршруты */}
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <AdminPanel />
                  </PrivateRoute>
                }
              />

              {/* Перенаправление на главную по умолчанию */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
          </CartProvider>
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;