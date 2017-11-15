import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// import PropTypes from 'prop-types'

// Components
import InfoContent from './InfoContent'
import Loading from 'components/Loading'
import Button from 'components/Form/Button'

// Redux
import { fetchInfo } from 'store/actions/info'

class Info extends React.Component {
  static propTypes = {
    InfoContent: PropTypes.object,
    Info: PropTypes.array,
    Ready: PropTypes.bool,
    fetchInfo: PropTypes.func,
    Index: PropTypes.bool,
    handle: PropTypes.string,
    Admin: PropTypes.bool
  }
  componentWillMount () {
    if (!this.props.Ready) {
      this.props.fetchInfo()
    }
  }
  renderInfoList (infos) {
    if (infos === null || infos === undefined || infos.length === 0) {
      return null
    }
    return (
      <ul>
        {infos.map(info =>
          (<li key={info.id}>
            <Link to={'/info/' + info.handle} >{info.title}</Link>
            {this.renderInfoList(this.props.Info.filter(i => i.parent === info.handle))}
          </li>))
        }
      </ul>
    )
  }
  render () {
    if (!this.props.Ready) {
      return <Loading />
    }
    if (this.props.Index) {
      return (
        <div className="info-wrapper">
          <h1>House Info</h1>
          <hr />
          {this.renderInfoList(this.props.Info.filter(i => i.parent === null))}
          <hr />
          {this.props.Admin
            ? <div className="row">
              <div className="col-sm-12 text-right">
                <Link to="/info/new" ><Button>New</Button></Link>
              </div>
            </div>
            : null
          }

        </div>
      )
    }
    return (<InfoContent handle={this.props.handle} InfoContent={this.props.InfoContent} />)
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
    Ready: state.Info !== null,
    Admin: state.User.access.toString() === '3',
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
