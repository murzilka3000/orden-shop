import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import CartPage from "./pages/cart_page/CartPage";
import Shop from "./pages/shop/Shop";
import "./App.css";
import CheckoutPage from "./pages/checkout_page/CheckoutPage";

const App: React.FC = () => {
  return (
      <BrowserRouter>
        <CartProvider>
          <Header/>
            <Routes>
                <Route path="/"  element={<Home/>}/>
                <Route path="/cart"  element={<CartPage/>}/>
                <Route path="/shop"  element={<Shop/>}/>
                <Route path="/checkout"  element={<CheckoutPage/>}/>
            </Routes>
            <Footer/>
        </CartProvider>
      </BrowserRouter>
  );
};

export default App;