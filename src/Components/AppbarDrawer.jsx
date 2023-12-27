import * as React from 'react';
import PropTypes from 'prop-types';
import { deepOrange } from '@mui/material/colors';
import {  Link, useLocation } from 'react-router-dom';
import STLIND from "../Assets/images/STLIND.jpg"
import {Avatar,AppBar,Box,Collapse,Divider ,Drawer,IconButton,List,ListItem,ListItemText,ListItemIcon,Toolbar,Typography} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';


const drawerWidth = 240;

function AppBarDrawer(props) {

  const location = useLocation();

  const [examOpen,setExamOpen] = React.useState(false);
  const [runtimeOpen,setRuntimeOpen] = React.useState(false);

  

  const drawer = (
    <div>
      {/* logo image */}
      <Toolbar>
        <img 
          src={STLIND}
          alt="Logo"
          style={{height:'65px',width:'100%'}} 
        />
      </Toolbar> 
      <Divider />

      {/* menu bar */}
          <List>
            <ListItem 
            button 
            key= 'dashboard' 
            component={Link} 
            to="/dashboard"
            selected = {location.pathname === '/dashboard'}
            className="ListItem"
            >
              <ListItemIcon className='ListIcon'>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItem>
            <ListItem 
            button 
            onClick={() => setExamOpen(!examOpen)}
            key= "test"
            component={Link} 
            to="#"
            className="ListItem"
            >
              <ListItemIcon className='ListIcon'>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary='Test' />
              {examOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            <Collapse in={examOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem 
                button 
                key= 'sync' 
                component={Link} 
                to="/sync"
                className="ListItem"
                sx={{ pl: 4 }}
                >
                  <ListItemIcon className='ListIcon'>
                    <KeyboardDoubleArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sync" />
                </ListItem>
                <ListItem 
                button 
                key= 'manage' 
                component={Link} 
                to="/manage"
                selected = {location.pathname === '/manage'}
                className="ListItem"
                sx={{ pl: 4 }}
                >
                  <ListItemIcon className='ListIcon'>
                    <KeyboardDoubleArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText primary='Manage' />
                </ListItem>
              </List>
            </Collapse>
            <ListItem 
            button 
            onClick={() => setRuntimeOpen(!runtimeOpen)}
            name= "runtime"
            component={Link} 
            to="#"
            className="ListItem"
            >
              <ListItemIcon className='ListIcon'>
                <SettingsSuggestIcon />
              </ListItemIcon>
              <ListItemText primary='Run Time' />
              {0 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            <Collapse in={runtimeOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem 
                button 
                key= 'mattempt' 
                component={Link} 
                to="#"
                className="ListItem"
                sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <KeyboardDoubleArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="Proctoring" />
                </ListItem>
              </List>
            </Collapse>
          </List>
    </div>
  );

  return (
    <>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` }
          }}
        >
        <Toolbar sx={{paddingRight:'0px'}}>

          {/* oraganisation name */}
          <Typography variant="h5" noWrap>
            Silicon Techlab Pvt Ltd
          </Typography>

          {/* profile */}
          <Box sx={{marginLeft:'auto'}}>
              <IconButton
                size="small"
                sx={{ ml: 2 }}
              >
                <Avatar
                  sx={{ bgcolor: deepOrange[500] }}
                />
              </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{ boxShadow:"0px 0px 0px 5px #6E6E6E",
            display: { xs: 'none', sm: 'block',   },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}

AppBarDrawer.propTypes = {
  window: PropTypes.func,
};

export default AppBarDrawer;
