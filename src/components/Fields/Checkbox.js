// Vendor
import React from 'react'

export default (field) => {
  return (
    <div className="form-group checkbox-wrapper">
      <label htmlFor={field.id} className={'checkbox-label ' + (field.className || '')}>
        {field.label}
        <input {...field.input} type="checkbox" id={field.id} checked={field.input.value} />
      </label>
    </div>
  )
}
