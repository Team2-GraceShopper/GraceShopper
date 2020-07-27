import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import {SnackbarProvider} from 'notistack'

// establishes socket connection
import './socket'

if (window.location.href.includes('maisoncorona.herokuapp.com')) {
  window.location.replace('https://maisonq.herokuapp.com')
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
)
