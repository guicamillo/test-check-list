import { combineReducers } from 'redux'
import { routeReducer as routing } from 'react-router-redux'
import { experimentsVisibilityFilter, experiments } from './experiments'

const mainApp = combineReducers({
  experimentsVisibilityFilter,
  experiments,
  routing
})

export default mainApp