import React, { Component, PropTypes } from 'react'
import { routeActions } from 'react-router-redux'

window.ol = routeActions

class ExpList extends Component {
  constructor () {
    super()
    this.renderExpItem = this.renderExpItem.bind(this)
  }

  renderExpItem (experiment) {
    const { dispatch } = this.props

    return (
      <li
        key={experiment.id}
      >
        <a
          href="#"
          className="simple-link"
          onClick={() => dispatch(routeActions.push(`/${experiment.get('name')}`))}
        >
          {experiment.get('name')}
        </a>
      </li>
    )
  }

  render() {
    const { dispatch } = this.props

    return (
      <div>
        <ul className="no-list-styling">
          {this.props.experiments.map((experiment, index) =>
            this.renderExpItem(experiment)
          )}
        </ul>
      </div>
    )
  }
}

ExpList.propTypes = {
  experiments: PropTypes.array.isRequired
}

export default ExpList
