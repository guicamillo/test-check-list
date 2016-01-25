import {
  ADD_EXPERIMENT,
  SET_EXPERIMENTS_VISIBILITY_FILTER,
  REQUEST_EXPERIMENTS, RECEIVE_EXPERIMENTS,
  INVALIDATE_EXPERIMENTS,
  UPDATE_EXPERIMENT,
  DELETE_EXPERIMENT
} from '../constants/experiments'

import { VisibilityFilters } from '../constants'

const { SHOW_ALL } = VisibilityFilters

function experimentsVisibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_EXPERIMENTS_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function experiments(
  state = {
    isFetching: true,
    didInvalidate: false,
    items: []
  }, action) {
  switch (action.type) {
    case INVALIDATE_EXPERIMENTS:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_EXPERIMENTS:
      return REQUEST_TESTS.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_EXPERIMENTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.items,
        lastUpdated: action.receivedAt
      })
    case UPDATE_EXPERIMENT:
      let newItems = state.items.map(item => {
        if (item.id === action.id) {
          return action.test
        }
        return item;
      });

      return Object.assign({}, state, {
        items: newItems
      })
    case ADD_EXPERIMENT:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: [
          ...state.items,
          action.test,
        ]
      })
    case DELETE_EXPERIMENT:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: state.items.filter(item => item.id !== action.id)
      })
    default:
      return state
  }
}

export {
  experiments,
  experimentsVisibilityFilter
}