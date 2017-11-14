
import React from 'react'
import PropTypes from 'prop-types'

class Checkbox extends React.Component {
  static propTypes = {
    children: PropTypes.any
  }
  handleBack () {
    window.history.back()
  }
  render () {
    return (
      <div className="checkbox-wrapper">
        <label><input type="checkbox" /> {this.props.children}</label>
      </div>
    )
  }
}

export default Checkbox
