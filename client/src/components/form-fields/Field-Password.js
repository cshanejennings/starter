import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@material-ui/core/';

import {
  Visibility,
  VisibilityOff,
} from '@material-ui/icons/';

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

const PasswordField = (props) => {
  const classes = get_styles();
  const { error_msg, password, pw_change } = props;

  const [show_pw, set_show_pw] = React.useState(false);
  const toggle_pw = () => set_show_pw(!show_pw);
  const mouse_down = (e) => e.preventDefault();

  const handle_change = e => pw_change(e.target.value);

  const field_class = (error_msg) ? classes.failure_attempt : classes.no_attempt;
  // React.useEffect(() => { }, [ ]);
  // const [state_var, set_state_var] = React.useState(0)

    return (
      <FormControl fullWidth className={ classes.input_fields } variant="outlined">
        <InputLabel className={ field_class } htmlFor="password_input">Password</InputLabel>
        <OutlinedInput className={ field_class } id="password_input"
          type={show_pw ? 'text' : 'password'}
          value={ password }
          onChange={ handle_change }
          labelWidth={75}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={toggle_pw} onMouseDown={mouse_down}>
                { show_pw ? <Visibility /> : <VisibilityOff /> }
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    );
}

PasswordField.defaultProps = {
  message: '',
}

PasswordField.propTypes = {
  error_msg: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  pw_change: PropTypes.func.isRequired,
}

export default PasswordField;
