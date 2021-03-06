import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {useDispatch, useSelector} from "react-redux";
import { getIsSinedIn } from "../../reducks/users/selectors";
import logo from "../../assets/img/icons/logo.png";
import {push} from "connected-react-router"
import {HeaderMenu, MenuDrawer} from "./index"

const useStyles = makeStyles({
  root: {
    flexGrow:1,
  },
  memuBar: {
    backgroundColor: "#fff",
    color: '#444',
  },
  toolBar: {
    margin: '0 auto',
    maxWidth: 1300,
    width: '100%'
  },
  iconButtons: {
    margin: '0 0 0 auto'
  }
})

const Header = (props) => {
  const classes = useStyles()
  const selector = useSelector((state) => state)
  const isSignedIn = getIsSinedIn(selector)
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = useCallback((event)=>{
    if (event.type === "keydown" || (event.key === "Tab" || event.key === 'Shift')){
        return
      }
    setOpen(!open)
},[setOpen, open])

  return(
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.memuBar}>
        <Toolbar className={classes.toolBar}>
          <img 
            src={logo} alt="yuuka logo" width="128px"
            onClick={() => dispatch(push('/'))}
          />
          {isSignedIn && (
            <div className={classes.iconButtons}>
              <HeaderMenu handleDrawerToggle={handleDrawerToggle}/>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <MenuDrawer open={open} onClose={handleDrawerToggle}/>
    </div>
  )

}

export default Header