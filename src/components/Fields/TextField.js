// Vendor
import React from 'react'

class CheckboxField extends React.Component {
  render () {
    const field = this.props
    const { touched, error } = field.meta
    return (
      <div className="form-group">
        <label htmlFor={field.id} className={(field.className || '')}>
          {field.label}
        </label>
        <input {...field.input} type="text" id={field.id} checked={field.input.value} className="form-control" />
        {touched && error && <span>{error}</span>}
      </div>
    )
  }
}

export default CheckboxField
