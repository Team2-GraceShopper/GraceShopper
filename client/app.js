import React from 'react'
// import SingleProductView from './components/SingleProductView'
import {Navbar, Header, SingleProduct, AllProducts} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Header />
      <SingleProduct />
      {/* <AllProducts /> */}
      {/* <Navbar /> */}
      <Routes />
    </div>
  )
}

export default App
