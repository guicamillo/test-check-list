import React, { Component, PropTypes } from 'react'
import { routeActions } from 'react-router-redux'
import { connect } from 'react-redux';
// import {
//   safeDeleteTodo,
//   safeUpdateTodo,
//   addTodo,
//   fetchTodos,
//   setVisibilityFilter
// } from '../actions';
import { VisibilityFilters } from '../constants';

class ExpList extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    // dispatch(fetchTodos())
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(fetchTodos())
  }

  renderExpItem (exp, index) {
    return (
      <a
        hrer="#"
        onClick={() => dispatch(routeActions.push(```/${exp_name}```))}
        key={index}
      >
        {'hi exp'}
      </a>
    )
  }

  render() {
    const { dispatch, visibleExperiments, visibilityFilter, isFetching } = this.props

    return (
      <div>
        {
          visibleExperiments && visibleExperiments.map((exp, index) =>
           this.renderExpItem(exp, index)
          )
        }

        {'hi again!'}

        {this.props.children}
      </div>
    )
  }
}

// ExpList.propTypes = {
//   didInvalidate: PropTypes.bool.isRequired,
//   isFetching: PropTypes.bool.isRequired,
//   visibleExperiments: PropTypes.arrayOf(PropTypes.shape({
//     text: PropTypes.string.isRequired,
//     completed: PropTypes.bool.isRequired,
//     beeingProcessed: PropTypes.bool,
//   })).isRequired,
//   visibilityFilter: PropTypes.oneOf([
//     'SHOW_ALL',
//     'SHOW_COMPLETED',
//     'SHOW_ACTIVE'
//   ]).isRequired
// }

function selectTodos(experiments, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return experiments
    case VisibilityFilters.SHOW_COMPLETED:
      return experiments.filter(experiment => experiment.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return experiments.filter(experiment => !experiment.completed)
  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return {
    isFetching: state.experiments.isFetching,
    didInvalidate: state.experiments.didInvalidate,
    visibleExperiments: selectTodos(state.experiments.items, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(ExpList)
