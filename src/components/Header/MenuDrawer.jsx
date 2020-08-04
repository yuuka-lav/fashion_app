import React, { useState, useCallback, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HistoryIcon from '@material-ui/icons/History';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {push} from "connected-react-router";
import {useDispatch} from "react-redux";
import {signOut} from "../../reducks/users/operations";
import {TextInput} from "../UIkit";
import { db } from "../../firebase/index";

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: 256,
      flexShrink: 0,
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 256
  },
  searchField: {
    alignItems: 'center',
    display: 'flex',
    marginLeft: 32
  }
}))

const MenuDrawer = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {container} = props
  const [keyword, setKeyword] = useState("");

  const inputKeyword = useCallback((event) => {
    setKeyword(event.target.value)
  }, [setKeyword])

  const selectMenu = (event, path) => {
    dispatch(push(path))
    props.onClose(event)
  }

  const [filters, setFilters] = useState([
    { func: selectMenu, label: "全て", id: "all", value: "/"},
    { func: selectMenu, label: "メンズ", id: "man", value: "/?gender=man"},
    { func: selectMenu, label: "レディース", id: "woman", value: "/?gender=woman"},
  ])
  const menus = [
    { func: selectMenu, 
      label: "商品登録",
      icon: <AddCircleIcon />,
      id: "register",
      value: "/product/edit"
    },
    { func: selectMenu, 
      label: "注文履歴",
      icon: <HistoryIcon />,
      id: "history",
      value: "/order/history"
    },
    { func: selectMenu, 
      label: "プロフィール",
      icon: <PersonIcon />,
      id: "profile",
      value: "/user/mypage"
    }
  ]

  useEffect(() => {
    db.collection('categories').orderBy('order', 'asc').get()
      .then(snapshots => {
        const list = [];
        snapshots.forEach(snapshot => {
          const category = snapshot.data()
          list.push(
            { func: selectMenu,
              label: category.name,
              id: category.id,
              value: `/?category=${category.id}`}
          )
        })
        setFilters(prevState => [...prevState, ...list])
      })
  },[])

  return(
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant='temporary'
        anchor={'right'}
        open={props.open}
        onClose={(event) => props.onClose(event)}
        classes={{paper: classes.drawerPaper}}
        ModalProps={{keepMounted: true}}
      >
      <div 
        onClose={(event) => props.onClose(event)}
        onKeyDown={(event) => props.onClose(event)}
      >
        <div className={classes.searchField}>
          <TextInput 
            fullWidth={ false }
            label={ "キーワードを入力" }
            multiline={ false }
            rows={ 1 }
            value={ keyword }
            type={ "text" }
            required={ false }
            onChange={ inputKeyword }
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          { menus.map(menu => (
            <ListItem button key={menu.id} onClick={(event) => menu.func(event, menu.value)}>
              <ListItemIcon>
                {menu.icon}
              </ListItemIcon>
              <ListItemText primary={menu.label} />
            </ListItem>
          ))}
          <ListItem 
            button key="logout" 
            onClick={() => dispatch(signOut())}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"ログアウト"} />
          </ListItem>
        </List>
        <Divider/>
        <List>
          {filters.map( filter => (
            <ListItem button key={filter.id} onClick={(event) => filter.func(event, filter.value)}>
              <ListItemText primary={filter.label} />
            </ListItem>
          ))}
        </List>
      </div>
      </Drawer>
    </nav>
  )
}

  export default MenuDrawer