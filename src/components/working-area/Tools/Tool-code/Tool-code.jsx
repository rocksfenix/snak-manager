import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

// Editor ACE
import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/mode/css'
import 'brace/mode/html'
import 'brace/theme/monokai'
//import 'brace/theme/snak'

import { updateCode, changeSyntax } from '../../../../actions/snak-actions'

//import Selectlist from '../Selectlist'

class ToolCode extends Component {
  constructor(props){
    super(props)
    this.onChangeCode = this.onChangeCode.bind(this)
    //this.typeSyntax = 'javascript'
  //  this.updateSyntax = this.updateSyntax.bind(this)
  }

  onChangeCode(newCodeValue){
    this.props.dispatch(updateCode(this.props.state.regionInFocus, {
      body : newCodeValue,
      fileType : this.props.state.regionInFocus.code.fileType //this.typeSyntax
    }))
  }

  // updateSyntax(e) {            "fileType": "css"
  //   this.typeSyntax = e.target.value
  //   this.props.dispatch(changeSyntax(this.props.state.regionInFocus, e.target.value))
  // }

  render() {

    return (
      <div className="Tools__panel-code facewin" >
        <AceEditor
          onChange={ this.onChangeCode }
          mode={this.props.state.regionInFocus.code.fileType}
          theme="monokai"
          name="AceCodeEditor"
          fontSize={20}
          width="100%"
          minHeight="100px"
          value={this.props.state.regionInFocus.code.body}
          editorProps={
            {
              $blockScrolling: true,
              mode: 'javascript'
            }
          }
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
        />
      </div>
    )
  }
}

//mode={this.props.state.regionInFocus.code.fileType}
function mapStateToProps(state, props) {
  return {
    state : state.snak
  }
}

export default connect(mapStateToProps)(ToolCode)
