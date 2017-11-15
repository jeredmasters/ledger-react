import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Back from 'components/Form/Back'
import Button from 'components/Form/Button'
import EditMode from './EditMode'
class InfoContent extends React.Component {
  static propTypes = {
    InfoContent: PropTypes.object,
    handle: PropTypes.string.isRequired,
    Admin: PropTypes.bool
  }
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)

    this.state = {
      editing: props.handle === 'new'
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
        {this.props.Admin
          ? <div className="row">
            <div className="col-sm-12 text-right">
              <Button onClick={this.handleClick}>Edit</Button>
            </div>
          </div>
          : null}
      </div>
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
    Admin: state.User.access.toString() === '3'
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoContent)
