import React from 'react'
import PropTypes from 'prop-types'

const Button = (props) =>  (<span className="btn btn-info" {...props} />)
Button.propTypes = {
  children: PropTypes.any
}

export default Button
