// Vendor
import React from 'react'

class CheckboxField extends React.Component {
  render () {
    const field = this.props
    return (
      <div className="form-group checkbox-wrapper">
        <label htmlFor={field.id} className={'checkbox-label ' + (field.className || '')}>
          {field.label}
          <input {...field.input} type="checkbox" id={field.id} checked={field.input.value} />
        </label>
      </div>
    )
  }
}

export default CheckboxField
