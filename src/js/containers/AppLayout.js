import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class AppLayout extends Component {
  render() {
    return (
      <div>
        {/* in case i will need something common for all views */}
        {this.props.children}
      </div>
    )
  }
}

export default AppLayout
