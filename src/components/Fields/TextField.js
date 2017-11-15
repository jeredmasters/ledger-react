// Vendor
import React from 'react'

class CheckboxField extends React.Component {
  render () {
    const field = this.props
    return (
      <div className="form-group">
        <label htmlFor={field.id} className={(field.className || '')}>
          {field.label}
        </label>
        <input {...field.input} type="text" id={field.id} checked={field.input.value} />
      </div>
    )
  }
}

export default CheckboxField
