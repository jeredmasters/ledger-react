import React from 'react'
import PropTypes from 'prop-types'

const Button = (props) =>  {
  const {danger, submit, ...fieldProps} = props
  return (<button className={'btn ' + (danger ? 'btn-danger' : 'btn-info')}  {...fieldProps} type={props.submit ? 'submit' : 'button'} />)
}
Button.propTypes = {
  submit: PropTypes.bool,
  danger: PropTypes.bool
}

export default Button
