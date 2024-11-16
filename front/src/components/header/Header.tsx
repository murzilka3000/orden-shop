import { Link } from "react-router-dom"
import s from "./Header.module.scss"
import Layout from "../layout/Layout"

// TODO:сделать акции 

const Header = () => {
  return (
    <header className={s.header}>
      <Layout>
        <div className={s.header_wrapper}>
        <Link to="/">
          <img src="/images/icons/logo.svg" alt="" />
        </Link>
        <div>
          <Link to="/shop">
            <button>
              <img src="/images/icons/header_catalog.svg" alt="" />
              <span>Каталог</span>
            </button>
          </Link>
         
          <Link to="#">
            <button>
                <img src="/images/icons/header_sale.svg" alt="" />
                <span>Акции</span>
              </button>
          </Link>
        </div>
        <div className={s.header_right}>
          <Link to="/cart">
            <img src="/images/icons/cart.svg" alt="cart" />
          </Link>
          <Link to="/favorites">
            <img src="/images/icons/favoitites.svg" alt="cart" />
          </Link>
        </div>
        </div>
      </Layout>
    </header>
  )
}

export default Header