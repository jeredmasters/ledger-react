import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// import PropTypes from 'prop-types'

// Components
import InfoContent from './InfoContent'
import Loading from 'components/Loading'

// Redux
import { fetchInfo } from 'store/actions/info'

class Info extends React.Component {
  static propTypes = {
    InfoContent: PropTypes.object,
    Info: PropTypes.array,
    Ready: PropTypes.bool,
    fetchInfo: PropTypes.func,
    Index: PropTypes.bool,
    handle: PropTypes.string
  }
  componentWillMount () {
    if (!this.props.Ready) {
      this.props.fetchInfo()
    }
  }
  render () {
    if (!this.props.Ready) {
      return <Loading />
    }
    if (this.props.Index) {
      return (
        <div>
          <h1>House Info</h1>
          <ul>
            {this.props.Info.map(info => <li key={info.id}><Link to={'/info/' + info.handle} >{info.title}</Link></li>)}
          </ul>
        </div>
      )
    }
    return (<InfoContent handle={this.props.handle} InfoContent={this.props.InfoContent} />)
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
    Ready: state.Info !== null,
    Index: ownProps.handle === null || ownProps.handle === undefined,
    Info: state.Info,
    InfoContent: state.Info !== null ? state.Info.find(item => item.handle === ownProps.handle) : null
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchInfo
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)
