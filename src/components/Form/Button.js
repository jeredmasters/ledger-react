import React from 'react'
import PropTypes from 'prop-types'

const Button = (props) =>  {
  const {submit, ...fieldProps} = props
  return (<button className="btn btn-info" {...fieldProps} type={props.submit ? 'submit' : 'button'} />)
}
Button.propTypes = {
  submit: PropTypes.bool
}

export default Button
