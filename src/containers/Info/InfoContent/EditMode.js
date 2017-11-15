import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Components
import Button from 'components/Form/Button'
import TextField from 'components/Fields/TextField'
import EditorField from 'components/Fields/EditorField'
import Back from 'components/Form/Back'

// Store 
import {saveInfo} from 'store/actions/info'

class EditMode extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    saveInfo: PropTypes.func
  }
  constructor (props) {
    super(props)

    this.handleSave = this.handleSave.bind(this)
  }
  handleSave (e) {
    e.preventDefault()
    this.props.handleSubmit(this.props.saveInfo)()
  }
  render () {
    return (
      <div className="content">
        <Back />
        <form onSubmit={this.handleSave}>
          <div className="row">
            <div className="col-sm-12">
              <Field component={TextField} name="title" label="Title" />
              <Field component={EditorField} name="content" />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 text-right">
              <Button submit>Save</Button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
const EditModeForm = reduxForm({
  form: 'EditModeForm'
})(EditMode)

export const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: ownProps.InfoContent || {
      id: 'new',
      handle: ownProps.handle,
      title: 'asdf',
      content: 'rrrrr'
    }
  }
}
export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    saveInfo
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModeForm)
