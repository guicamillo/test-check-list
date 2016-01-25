import React, { Component, PropTypes } from 'react'

class ExpList extends Component {

  renderExpItem (experiment, index) {
    return (
      <a
        hrer="#"
        onClick={() => dispatch(routeActions.push(```/${experiment.name}```))}
        key={index}
      >
        {'hi exp'}
      </a>
    )
  }

  render() {
    return (
      <div>
        <h3>Todos:</h3>
        <ul className="no-list-styling">
          {this.props.experiments.map((experiment, index) =>
            this.renderTodoItem(experiment, index)
          )}
        </ul>
      </div>
    )
  }
}

ExpList.propTypes = {
  experiments: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    beeingProcessed: PropTypes.bool,
  }).isRequired).isRequired
}

export default ExpList
