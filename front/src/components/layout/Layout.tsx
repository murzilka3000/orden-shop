import s from "./Layout.module.scss"

const Layout = ({children} : {children: React.ReactNode}) => {
  return (
    <div className={s.wrapper}>
        {children}
    </div>
  )
}

export default Layout