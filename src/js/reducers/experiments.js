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
    items: []
  }, action) {
  switch (action.type) {
    case REQUEST_EXPERIMENTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_EXPERIMENTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
        lastUpdated: action.receivedAt
      })
    case UPDATE_EXPERIMENT:
      let newItems = state.items.map(item => {
        if (item.id === action.id) {
          return action.experiment
        }
        return item;
      });

      return Object.assign({}, state, {
        items: newItems
      })
    case ADD_EXPERIMENT:
      return Object.assign({}, state, {
        isFetching: false,
        items: [
          ...state.items,
          action.experiment,
        ]
      })
    case DELETE_EXPERIMENT:
      return Object.assign({}, state, {
        isFetching: false,
        items: state.items.filter(experiment => experiment.id !== action.id)
      })
    default:
      return state
  }
}

export {
  experiments,
  experimentsVisibilityFilter
}
