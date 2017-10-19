
import React from 'react'

class Back extends React.Component {
  handleBack () {
    window.history.back()
  }
  render () {
    return (
      <div className="row">
        <div className="col-sm-12">
          <a href="#" onClick={this.handleBack}><i className="fa fa-chevron-left" aria-hidden="true" /> Back</a>
        </div>
      </div>
    )
  }
}

export default Back
