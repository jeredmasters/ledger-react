import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { confirmAlert } from 'react-confirm-alert' // Import

// Components
import Button from 'components/Form/Button'
import TextField from 'components/Fields/TextField'
import EditorField from 'components/Fields/EditorField'
import SelectField from 'components/Fields/SelectField'
import Back from 'components/Form/Back'

// Store 
import {saveInfo, deleteInfo} from 'store/actions/info'

class EditMode extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    saveInfo: PropTypes.func,
    Info: PropTypes.array,
    New: PropTypes.bool,
    handle: PropTypes.string,
    deleteInfo: PropTypes.func
  }
  constructor (props) {
    super(props)

    this.handleSave = this.handleSave.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  handleSave (e) {
    e.preventDefault()
    this.props.handleSubmit(this.props.saveInfo)()
  }
  handleDelete () {
    confirmAlert({
      title: 'Deleting...',                        // Title dialog
      message: 'Are you sure you wish to delete?',               // Message dialog
      confirmLabel: 'Delete',                           // Text button confirm
      cancelLabel: 'Cancel',                             // Text button cancel
      onConfirm: () => this.props.deleteInfo(this.props.handle),    // Action after Confirm
      onCancel: () => alert('Action after Cancel')      // Action after Cancel
    })
  }
  render () {
    const infos = this.props.Info.map(i => ({label: i.title, value: i.handle}))
    infos.unshift({label:'none', value: null})
    return (
      <div className="content">
        <Back />
        <form onSubmit={this.handleSave}>
          {this.props.New
            ? <div className="row">
              <div className="col-sm-12">
                <Field component={TextField} name="handle" label="Handle" required />
              </div>
            </div>
            : null
          }
          <div className="row">
            <div className="col-sm-6">
              <Field component={TextField} name="title" label="Title" required />
            </div>
            <div className="col-sm-6">
              <Field
                component={SelectField}
                name="parent"
                label="Parent"
                options={infos}
              />
            </div>
            <div className="col-sm-12">
              <Field component={EditorField} name="content" label="Content" required />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 text-right">
              <Button danger onClick={this.handleDelete}>Delete</Button>
              <Button submit>Save</Button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const validate = values => {
  const errors = {}
  if (!values.handle) {
    errors.handle = 'Required'
  } else if (values.handle.length < 4) {
    errors.handle = 'Must be 4 characters or more'
  }
  if (!values.title) {
    errors.title = 'Required'
  } else if (values.title.length < 4) {
    errors.title = 'Must be 4 characters or more'
  }
  if (!values.content) {
    errors.content = 'Required'
  } else if (values.content.length < 20) {
    errors.content = 'Must be 20 characters or more'
  }
  return errors
}

const EditModeForm = reduxForm({
  form: 'EditModeForm',
  validate
})(EditMode)

export const mapStateToProps = (state, ownProps) => {
  return {
    Info: state.Info,
    New: !ownProps.InfoContent,
    initialValues: ownProps.InfoContent || {
      id: 'new',
      handle: ownProps.handle !== 'new' ? ownProps.handle : '',
      title: '',
      content: '',
      parent: null
    }
  }
}
export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    saveInfo,
    deleteInfo
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModeForm)
