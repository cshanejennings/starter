import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button
} from '@material-ui/core/';

const get_styles = makeStyles(theme => ({
  root: {}
}));

const ConfirmDialog = (props) => {
  const classes = get_styles();
  const { question, confirm_text, cancel_text, confirm, cancel, open } = props;
  // React.useEffect(() => { }, [ ]);
  // const [state_var, set_state_var] = React.useState(0)

    return (
      <Dialog className={ classes.root }
        open={ open }
        onClose={ cancel }
        aria-labelledby="max-width-dialog-title"
        >
        <DialogTitle id="max-width-dialog-title">Please Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            { question }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ cancel } color="primary">
            { cancel_text }
          </Button>
          <Button onClick={ confirm } color="primary" autoFocus>
            { confirm_text }
          </Button>
        </DialogActions>
        </Dialog>
    );
}

ConfirmDialog.defaultProps = {
  question: "Are you sure?",
  confirm_text: "Yes",
  cancel_text: "No",
}

ConfirmDialog.propTypes = {
  question: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  confirm_text: PropTypes.string.isRequired,
  cancel_text: PropTypes.string.isRequired,
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
}

export default ConfirmDialog;
