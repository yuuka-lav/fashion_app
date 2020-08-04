import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {useDispatch} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import NoImage from "../../assets/img/src/no_image.png";
import { push } from "connected-react-router";
import { deleteProducts } from "../../reducks/products/operations";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      margin: 8,
      width: 'calc(50% - 12px)'
    },
    [theme.breakpoints.up('sm')]: {
      margin: 16,
      width: 'calc(33.3333% - 32px)'
    }
  },
  content: {
    display: 'flex',
    padding: '16 8',
    textAlign: 'left',
    '&:last-child': {
    paddingBottom: 16
    }
  },
  icon: {
    marginRight: 0,
    marginLeft: 'auto'
  },
  media: {
    height: 0,
    paddingTop: '100%'
  },
  price: {
    color: theme.palette.secondary.dark,
    fontSize: 16
  },
  productName: {
    boxOrient: 'vertical',
    display: '-webkit-box',
    fontSize: 14,
    lineHeight: '18px',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      height: 36,
      lineClamp: 2,
    },
    [theme.breakpoints.up('md')]: {
      height: 18,
      lineClamp: 1,
    }
  }
}))

const ProductCard = (props) => {
  const price = props.price.toLocaleString();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const images = (props.images.length > 0) ? props.images : [NoImage];
  return(
    <Card className={classes.root}>
      <CardMedia 
        className={classes.media}
        image={images[0].path}
        title=""
        onClick={() => dispatch(push('/product/'+ props.id))}
      />
      <CardContent className={classes.content}>
        <div onClick={() => dispatch(push('/product/'+ props.id))}>
        <Typography color="textSecondary" component="p">
          {props.name}
        </Typography>
        <Typography component="p" className={classes.price}>
          ￥{price}
        </Typography>
        </div>
        <IconButton className={classes.icon} onClick={handleClick}>
            <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              dispatch(push('/product/edit/'+ props.id))
              handleClose()
            }}
          >
            編集する
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(deleteProducts(props.id))
              handleClose()
          }}
          >
            削除する
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  )
}

export default ProductCard;