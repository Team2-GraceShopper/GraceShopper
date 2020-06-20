import React from 'react'
import {
  Navbar,
  Header,
  StickyFooter,
  SingleProduct,
  AllProducts
} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Header />
      {/* <Navbar /> */}
      <Routes />
      <StickyFooter />
    </div>
  )
}

export default App
