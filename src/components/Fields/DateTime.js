
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import moment from 'moment'
import DateTime from 'react-datetime'

const DateTimeField = ({tooltip, tooltipPlacement, disabled, input, label, placeholder, meta: {valid, touched, error}, ...props}) => {
  const classes = classNames('form-group', {
    'has-error': (touched && !valid),
    'has-success': (touched && valid)
  })
  console.log(input.value)

  return (<div className={classes}>
    {label &&
    <label htmlFor={input.name}>{label}</label>
    }
    <DateTime
      name={input.name}
      // value={input.value}
      locale="en"
      dateFormat="MM/DD/YYYY"
      timeFormat="hh:mm A"
      onChange={param => {
        console.log(param)
        input.onChange(param)
      }}
      disabled={disabled}
    />
    {(!valid && touched) &&
      <p className="help-block">{error}</p>
    }
  </div>)
}

DateTimeField.propTypes = {
  disabled: PropTypes.bool,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  tooltip: PropTypes.string,
  tooltipPlacement: PropTypes.string
}
export default DateTimeField
