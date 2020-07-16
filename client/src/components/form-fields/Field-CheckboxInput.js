import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  Checkbox,
  FormGroup,
  FormControlLabel
} from '@material-ui/core/';

const get_styles = makeStyles(theme => ({
  root: {},
}));

const CheckboxInputField = (props) => {
  const classes = get_styles();
  const { on_click, value, label } = props;
    return (
      <FormGroup className={ classes.root } row>
        <FormControlLabel
          labelPlacement="start"
          label={ label }
          control={<Checkbox checked={value} onChange={on_click} />}
          />
      </FormGroup>
    );
}

CheckboxInputField.defaultProps = {
  error_msg: ''
}

CheckboxInputField.propTypes = {
  on_click: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
}

export default CheckboxInputField;
