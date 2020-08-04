import React, { useCallback } from 'react';
import List from '@material-ui/core/List';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsInCart } from '../reducks/users/selectors';
import { CartListItem } from '../components/Products';
import { PrimaryButton, GrayButton } from '../components/UIkit';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    maxWidth: 512,
    width: '100%'
  }
})

const CartList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const productInCart = getProductsInCart(selector)

  const goToOrder = useCallback(() => {
    dispatch(push('/order/confirm'))
  },[])

  const backToHome = useCallback(() => {
    dispatch(push('/'))
  },[])
  return(
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">
        ショッピングカート
      </h2>
      <List className={classes.root}>
        { productInCart.length > 0 && (
          productInCart.map(product => <CartListItem key={ product.cartId } product={ product }/>)
        ) }
      </List>
      <div className="module-spacer--medium" />
      <div className="p-grid__column">
        <PrimaryButton 
          label={"購入へ進む"}
          onClick={ goToOrder }
        />
        <div className="module-spacer--extra-small" />
        <GrayButton
          label={"ショッピングを続ける"}
          onClick={ backToHome }
        />
      </div>
    </section>
  )
}

export default CartList