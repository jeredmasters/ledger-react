import React from 'react'
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'

/* 
 * Simple editor component that takes placeholder text as a prop 
 */
class EditorField extends React.Component {
  constructor (props) {
    super(props)
    this.state = { editorHtml: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleChange (html) {
    this.setState({ editorHtml: html })
  }
  handleBlur () {
    const input = this.props.input
    input.onBlur(input.value)
  }
  render () {
    const {input, label, meta: {touched, error}} = this.props
    const {...inputField} = input

    return (
      <div>
        <label>{label}</label>
        <ReactQuill
          {...inputField}

          theme="snow"
          modules={EditorField.modules}
          formats={EditorField.formats}
          onBlur={this.handleBlur}
          bounds={'.app'}
          placeholder={this.props.placeholder}
        />
        {touched && error && <span>{error}</span>}
      </div>
    )
  }
}

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
EditorField.modules = {
  toolbar: [
    [{'header': '2'}],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'},
      {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
EditorField.formats = [
  'header', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

/* 
 * PropType validation
 */
EditorField.propTypes = {
  placeholder: PropTypes.string,
  input: PropTypes.any,
  label: PropTypes.string,
  meta: PropTypes.any
}

export default EditorField
