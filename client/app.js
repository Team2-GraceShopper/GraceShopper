import React from 'react'
import {Header, StickyFooter} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Header />
      <Routes />
      <StickyFooter />
    </div>
  )
}

export default App
