import React, { Component, PropTypes } from 'react'
import { routeActions } from 'react-router-redux'
import { connect } from 'react-redux';
// import {
//   fetchExperiments,
//   // setVisibilityFilter
// } from '../actions/experiments';
import { VisibilityFilters } from '../constants';
import { ExpList } from '../components/ExpList';

class ExpListScreen extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    // dispatch(fetchExperiments())
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch } = this.props
    // dispatch(fetchExperiments())
  }

  render() {
    const { dispatch, visibleExperiments, visibilityFilter, isFetching } = this.props

    return (
      <div className="row">
        <div className="small-6 columns">

          {isFetching && visibleExperiments.length === 0 &&
            <h2>Loading...</h2>
          }

          {!isFetching && visibleExperiments.length === 0 &&
            <h2>Empty.</h2>
          }

          {visibleExperiments.length > 0 &&
            <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <ExpList
                experiments={visibleExperiments}
              />
            </div>
          }

        </div>
      </div>
    )

  }
}

ExpListScreen.propTypes = {
  didInvalidate: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  visibleExperiments: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    beeingProcessed: PropTypes.bool,
  })).isRequired,
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}

function selectExperiments(experiments, filter) {
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
    visibleExperiments: selectExperiments(state.experiments.items, state.experimentsVisibilityFilter),
    visibilityFilter: state.experimentsVisibilityFilter
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(ExpListScreen)
