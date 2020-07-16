import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  Button,
} from '@material-ui/core/';

import {
  VolumeUp,
  VolumeOff,
} from '@material-ui/icons/';

import { toggle_audio } from '../util/notification-sounds';

const get_styles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    [theme.breakpoints.down('sm')]: {
      right: 0,
      padding: 10
    },
    [theme.breakpoints.up('md')]: {
      right: 20,
      padding: "5px 10px"
    },
  },
  icon: {
    marginLeft: 8
  }
}));

const EnableAudio = (props) => {
  const classes = get_styles();
  // React.useEffect(() => { }, [ ]);
  const [muted, set_muted] = React.useState(true);
  const toggle = () => set_muted(toggle_audio());

  const icon = (muted) ? (
    <VolumeOff className={classes.icon} />
  ) : (
    <VolumeUp className={classes.icon} />
  );
  const text = (muted) ? "Disabled" : "Enabled";

    return (
        <Button
        onClick={ toggle }
        size="small"
        className={ classes.root }>
        { text }
        { icon }
        </Button>
    );
}

EnableAudio.defaultProps = {
  message: '',
}

EnableAudio.propTypes = {
  message: PropTypes.string,
}

export default EnableAudio;
