import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextInput = (props) => {
  return(
    <TextField 
      fullWidth={ props.fullWidth }
      label={ props.label }
      margin="dense"
      multiline={ props.multiline }
      rows={ props.rows }
      value={ props.value }
      type={ props.type }
      required={ props.required }
      onChange={ props.onChange }
    />
  )
}

export default TextInput