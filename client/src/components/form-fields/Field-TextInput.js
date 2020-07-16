import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core/';

const get_styles = makeStyles(theme => ({
  input_fields: {
    margin: theme.spacing(1),
  },
  no_attempt: {},
  failure_attempt: {
    "& input": {
      background: '#fff2f2',
      color: '#990000'
    },
  },
  error_msg: {
    width: '90%',
    margin: '0 auto 20px auto',
    color: '#990000',
  },
}));

const TextInputField = (props) => {
  const classes = get_styles();
  const { on_change, error_msg, value, label } = props;
  const id = label.toLowerCase().replace(' ', '_');
  const field_class = (error_msg) ? classes.failure_attempt : classes.no_attempt;

  const handle_change = e => on_change(e.target.value);

    return (
      <FormControl fullWidth className={ classes.input_fields } variant="outlined">
        <InputLabel className={ field_class } htmlFor={ id }>{ label }</InputLabel>
        <OutlinedInput className={ field_class } id={ id }
          type='text'
          labelWidth={110}
          onChange={ handle_change }
          value={ value }
        />
      </FormControl>
    );
}

TextInputField.defaultProps = {
  error_msg: '',
  value: '',
}

TextInputField.propTypes = {
  error_msg: PropTypes.string.isRequired,
  on_change: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default TextInputField;
