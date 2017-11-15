import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import PropTypes from 'prop-types'

// Redux

// Components
import Checkbox from 'components/Form/Checkbox'

class Cleanup extends React.Component {
  renderRow (text, index) {
    return (
      <tr key={index}>
        <td>
          <Checkbox>{text}</Checkbox>
        </td>
      </tr>
    )
  }
  render () {
    const steps = [
      'Cleanup all the things'
    ]
    return (
      <div>
        <h1>Cleanup</h1>
        <div className="cleanup-form">
          <div className="row">
            <div className="col-sm-12">
              <table className="table table-striped">
                <tbody>
                  {steps.map(this.renderRow)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cleanup)
