import React from 'react'
import { render } from 'react-dom'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import DevTools from './containers/DevTools'
import ExpList from './containers/ExpListContainer'

const store = configureStore({})

let rootElement = document.getElementById('app_root')

render(
  <Provider store={store}>
    {/* empty div as only on child required and we need devtools */}
    <div>
      <Router history={browserHistory}>
        <Route path="/" name="index" component={ExpList} />
      </Router>
      <DevTools />
    </div>
  </Provider>,
  rootElement
)
