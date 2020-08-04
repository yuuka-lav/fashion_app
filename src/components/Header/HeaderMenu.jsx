import React, { useEffect } from 'react';
import IconButton from "@material-ui/core/IconButton";
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MenuIcon from '@material-ui/icons/Menu';
import { getProductsInCart, getUserId, getProductsInFavorite } from '../../reducks/users/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../../firebase/index';
import { fetchProductsInCart, fetchProductsInFavorite } from '../../reducks/users/operations';
import { push } from 'connected-react-router';

const HeaderMenu = (props) => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const uid = getUserId(selector)
  let productsInCart = getProductsInCart(selector)
  let productsInFavorite = getProductsInFavorite(selector)


  useEffect(()=>{
    const unsubscribe = db.collection('users').doc(uid).collection('cart')
      .onSnapshot( snapshots => {
        snapshots.docChanges().forEach( change => {
          const product = change.doc.data()
          const changeType = change.type

          switch (changeType) {
            case 'added':
              productsInCart.push(product)
              break;
            case 'modified':
              const index = productsInCart.findIndex(product => product.cartId === change.doc.id)
              productsInCart[index] = product
              break;
            case 'removed':
              productsInCart = productsInCart.filter(product => product.cartId !== change.doc.id)
              break;
            default: 
              break;
          }
        })
        dispatch(fetchProductsInCart(productsInCart))
      })
      return () => unsubscribe()
  },[])

  useEffect(()=>{
    const unsubscribe = db.collection('users').doc(uid).collection('favorite')
      .onSnapshot( snapshots => {
        snapshots.docChanges().forEach( change => {
          const product = change.doc.data()
          const changeType = change.type

          switch (changeType) {
            case 'added':
              productsInFavorite.push(product)
              break;
            case 'modified':
              const index = productsInFavorite.findIndex(product => product.favoriteId === change.doc.id)
              productsInFavorite[index] = product
              break;
            case 'removed':
              productsInFavorite = productsInFavorite.filter(product => product.favoriteId !== change.doc.id)
              break;
            default: 
              break;
          }
        })
        dispatch(fetchProductsInFavorite(productsInFavorite))
      })
      return () => unsubscribe()
  },[])

  return(
    <>
      <IconButton onClick={() => dispatch(push('/cart')) }>
        <Badge badgeContent={productsInCart.length} color="secondary">
          <ShoppingCartIcon/>
        </Badge>
      </IconButton>

      <IconButton onClick={() => dispatch(push('/favorite'))}>
        <FavoriteBorderIcon/>
      </IconButton>

      <IconButton onClick={(event)=> props.handleDrawerToggle(event)}>
        <MenuIcon/>
      </IconButton>

    </>
  )
}

export default HeaderMenu