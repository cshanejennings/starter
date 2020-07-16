import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

import {
  Divider,
  Drawer,
  Hidden,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core/';

import { ConnectionProps } from '../models/Connection';
import { UserProps } from '../models/User';


import {
  Sms,
  Settings,
} from '@material-ui/icons/';

import { APP_COMPONENTS } from '../config';
const drawerWidth = APP_COMPONENTS.DRAWER_WIDTH;

const get_styles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

const SideMenu = (props) => {
  const classes = get_styles();
  const theme = useTheme();
  const { window, open, toggle, location } = props;
  const { pathname } = location;
  const { first_name,  email } = props.user_data.account;
  const container = window !== undefined ? () => window().document.body : undefined;
  // React.useEffect(() => { }, [ ]);
  // const [state_var, set_state_var] = React.useState(0)
  const menu = (
    <div>
      <div style={{ textAlign: 'left', display: 'block', width: '100%'}}>
        { /* TODO:// Add avatar image here */}
        <h3 style={{ textAlign: 'left', display: 'block', width: '100%', margin: '0 0 0 10px'}}>{ first_name }</h3>
        <p style={{ textAlign: 'left', display: 'block', width: '100%', margin: '0 0 30px 10px'}}>{ email }</p>
      </div>
      <Divider />
      <MenuList>
        <MenuItem component={Link} disabled={ pathname === '/account'} to="/account">
          <ListItemIcon><Settings /></ListItemIcon>
          <ListItemText primary="Account" />
        </MenuItem>
      </MenuList>
      <Divider />
      <div className={classes.toolbar} />
    </div>
  );

    return (
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={ container }
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={open}
            onClose={toggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {menu}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer open variant="permanent" classes={{
              paper: classes.drawerPaper,
            }}
          >{menu}</Drawer>
        </Hidden>
      </nav>
    );
}

SideMenu.defaultProps = {
  message: '',
}

SideMenu.propTypes = {
  user_data: PropTypes.shape({
    connection: ConnectionProps,
    account: UserProps
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
    hash: PropTypes.string.isRequired,
  }),
  toggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default SideMenu;
