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
import "./App.css";
import Login from "./components/login/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Register from './components/register/Register'; // Импорт компонента регистрации

// Приватный маршрут
const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Проверяем авторизацию из контекста

  return isAuthenticated ? children : <Navigate to="/login" />;
};


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
              <Route path="/register" element={<Register />} /> {/* Новый маршрут для регистрации */}

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