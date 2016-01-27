import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import {
  fetchExperiments,
  // setVisibilityFilter
} from '../actions/experiments';
import { VisibilityFilters } from '../constants';

class ExpDetailsScreen extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchExperiments())
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(fetchExperiments())
  }

  render() {
    const { dispatch, experiment, isFetching } = this.props

    return (
      <div className="row">
        <div className="small-6 columns">

          {isFetching &&
            <h2>Loading...</h2>
          }

          {!isFetching &&
            <h2>None created.</h2>
          }

          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            { experiment }
          </div>

        </div>
      </div>
    )

  }
}

// ExpDetailsScreen.propTypes = {
//   isFetching: PropTypes.bool.isRequired,
//   visibleExperiments: PropTypes.array.isRequired,
//   visibilityFilter: PropTypes.oneOf([
//     'SHOW_ALL',
//     'SHOW_COMPLETED',
//     'SHOW_ACTIVE'
//   ]).isRequired
// }

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
function select(state, ownProps) {
  return {
    experiment: ownProps.params.expId,
    isFetching: state.experiments.isFetching,
    visibleExperiments: selectExperiments(state.experiments.items, state.experimentsVisibilityFilter),
    visibilityFilter: state.experimentsVisibilityFilter
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(ExpDetailsScreen)
