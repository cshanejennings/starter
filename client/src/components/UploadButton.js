import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

import {
} from '@material-ui/core/';

const get_styles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const UploadButton = (props) => {
  const { update, updating, label, exit } = props;
  const classes = get_styles();
  const [pending, setPending] = React.useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: pending,
  });

  const handleButtonClick = () => {
    if (!updating) {
      setPending(false);
      setTimeout(() => (!pending && exit) ? exit() : '', 1500);
      update();
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab
          aria-label="save"
          color="primary"
          className={buttonClassname}
          onClick={handleButtonClick}
        >
          {pending ? <CheckIcon /> : <SaveIcon />}
        </Fab>
        {updating && <CircularProgress size={68} className={classes.fabProgress} />}
      </div>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={updating}
          onClick={handleButtonClick}
        >
          { label }
        </Button>
        {updating && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
  );
}

UploadButton.defaultProps = {
  message: '',
}

UploadButton.propTypes = {
  update: PropTypes.func.isRequired,
  updating: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  exit: PropTypes.func
}

export default UploadButton;
