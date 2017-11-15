
// Vendor
import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select-2'

class SingleSelectField extends React.Component {
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

  handleClick (val) {
    const input = this.props.input
    input.onChange(val !== null ? val.value : null)
  }
  handleBlur () {
    const input = this.props.input
    input.onBlur(input.value)
  }
  render () {
    const {input, id, className, label, options, meta: {touched, error}} = this.props
    const {value, onBlur, onChange, ...inputField} = input
    const selectedOption = options.find(i => i.value === value)
    return (
      <div className={'input-row ' + (className !== undefined ? className : '')}>
        <label>{label}</label>
        <Select
          {...inputField}
          id={id}
          value={selectedOption || ''}
          options={options}
          openOnFocus
          onBlur={this.handleBlur}
          onChange={this.handleClick}
        />
        {touched && error && <span>{error}</span>}
      </div>
    )
  }
}

export default SingleSelectField
