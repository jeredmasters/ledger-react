
// Vendor
import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select-2'

// Helpers
import Helpers from 'utils/Helpers'

class MultiSelectField extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    className: PropTypes.string,
    options: PropTypes.array,
    input: PropTypes.object
  }

  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleBlur = this.handleBlur.bind(this)

    this.state = {
      editing: false
    }
  }

  handleClick (vals) {
    const input = this.props.input
    input.onChange(vals.map(i => i.value))
  }
  handleBlur () {
    const input = this.props.input
    input.onBlur(input.value)
  }

  render () {
    const {input, id, className, options} = this.props
    const {value} = input
    const values = (Helpers.Empty(value) ? [] : value.map((item) => options.find(i => i.value === item)))
    return (
      <div className={'input-row ' + (className !== undefined ? className : '')}>
        <Select
          {...input}
          id={id}
          value={values || ''}
          options={options}
          openOnFocus
          onBlur={this.handleBlur}
          onChange={this.handleClick}
          multi
        />
      </div>
    )
  }
}

export default MultiSelectField
