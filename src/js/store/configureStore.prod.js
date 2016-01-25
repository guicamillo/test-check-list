import { createStore, applyMiddleware, compose } from 'redux'
import { syncHistory } from 'react-router-redux'
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const reduxRouterMiddleware = syncHistory(browserHistory)

const finalCreateStore = compose(
  applyMiddleware(reduxRouterMiddleware),
  applyMiddleware(thunk)
)(createStore)

export default function configureStore(initialState) {
  const sctore = finalCreateStore(rootReducer, initialState)
  
  // Required for replaying actions from devtools to work
  reduxRouterMiddleware.listenForReplays(store)
  
  return store;
}