
// Vendor
import React from 'react'
import PropTypes from 'prop-types'

class SelectField extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    className: PropTypes.string,
    options: PropTypes.array,
    input: PropTypes.object,
    meta: PropTypes.any
  }

  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleBlur = this.handleBlur.bind(this)

    this.state = {
      editing: false
    }
  }

  handleClick (event) {
    const val = event.target.value
    const input = this.props.input
    input.onChange(val !== null ? val : null)
  }
  handleBlur () {
    const input = this.props.input
    input.onBlur(input.value)
  }
  render () {
    const {input, id, className, label, options, meta: {touched, error}} = this.props
    const {value, onBlur, onChange, ...inputField} = input
    return (
      <div className={'input-row ' + (className !== undefined ? className : '')}>
        <label>{label}</label>
        <select
          {...inputField}
          id={id}
          onBlur={this.handleBlur}
          onChange={this.handleClick}
          className="form-control"
          value={value}
        >
          {options.map(i => <option key={i.value} value={i.value} >{i.label}</option>)}
        </select>
        {touched && error && <span>{error}</span>}
      </div>
    )
  }
}

export default SelectField
