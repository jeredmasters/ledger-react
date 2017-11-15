import React from 'react'
import PropTypes from 'prop-types'

import Back from 'components/Form/Back'
import Button from 'components/Form/Button'
import EditMode from './EditMode'
class InfoContent extends React.Component {
  static propTypes = {
    InfoContent: PropTypes.object,
    handle: PropTypes.string.isRequired
  }
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)

    this.state = {
      editing: false
    }
  }
  handleClick () {
    this.setState({editing: true})
  }
  render () {
    if (this.state.editing) {
      return <EditMode handle={this.props.handle} InfoContent={this.props.InfoContent} />
    }
    const content = this.props.InfoContent ? this.props.InfoContent.content : 'no content'
    const title = this.props.InfoContent ? this.props.InfoContent.title : 'no content'
    return (
      <div className="content">
        <Back />
        <h1>{title}</h1>
        <hr />
        <div className="row">
          <div className="col-sm-12">
            <div dangerouslySetInnerHTML={{__html:content}} />
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 text-right">
            <Button onClick={this.handleClick}>Edit</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default InfoContent
