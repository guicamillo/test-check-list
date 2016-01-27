import React from 'react'
import { render } from 'react-dom'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import createBrowserHistory   from 'history/lib/createBrowserHistory';
import { Router, Route, browserHistory } from 'react-router'
import DevTools from './containers/DevTools'
import ExpListScreen from './containers/ExpListScreen'
import ExpDetailsScreen from './containers/ExpDetailsScreen'

const store = configureStore({})

let rootElement = document.getElementById('app_root')

render(
  <Provider store={store}>
    {/* empty div as only on child required and we need devtools */}
    <div>
      <Router history={browserHistory}>
        <Route path="/" name="index" component={ExpListScreen} />
        <Route path="/:expId" name="exp_ditails" component={ExpDetailsScreen} />
      </Router>
      <DevTools />
    </div>
  </Provider>,
  rootElement
)
