import type { NextPage } from 'next'
import style from './layout.module.scss'

const Layout: NextPage = function({ children }) {
  return (
    <>
      <div className={`container ${style.layout}`}>{children}</div>
    </>
  )
}

export default Layout