import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import CartPage from "./pages/cart_page/CartPage";
import Shop from "./pages/shop/Shop";
import "./App.css";
import CheckoutPage from "./pages/checkout_page/CheckoutPage";
import FavoritesPage from "./pages/favorites_page/FavoritesPage";
import ProductDetail from "./components/product_detail/ProductDetail";
import { FavoritesProvider } from "./context/FavoritesContext";
import AdminPanel from "./components/admin/AdminPanel";

const App: React.FC = () => {
  return (
      <BrowserRouter>
        <FavoritesProvider>
          <CartProvider>
            <Header/>
              <Routes>
                  <Route path="/"  element={<Home/>}/>
                  <Route path="/cart"  element={<CartPage/>}/>
                  <Route path="/shop"  element={<Shop/>}/>
                  <Route path="/checkout"  element={<CheckoutPage/>}/>
                  <Route path="/favorites"  element={<FavoritesPage/>}/>
                  <Route path="/product/:productId" element={<ProductDetail/>}/>
                  <Route path="/admin" element={<AdminPanel/>}/>
              </Routes>
              <Footer/>
          </CartProvider>
        </FavoritesProvider>
      </BrowserRouter>
  );
};

export default App;