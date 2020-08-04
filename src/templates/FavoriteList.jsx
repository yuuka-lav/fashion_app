import React, { useCallback } from 'react';
import List from '@material-ui/core/List';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsInFavorite } from '../reducks/users/selectors';
import { FavoriteListItem } from '../components/Products';
import { GrayButton } from '../components/UIkit';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    maxWidth: 512,
    width: '100%'
  }
})

const FavoriteList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const productInFavorite = getProductsInFavorite(selector)

  const backToHome = useCallback(() => {
    dispatch(push('/'))
  },[])
  return(
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">
        お気に入りリスト
      </h2>
      <List className={classes.root}>
        { productInFavorite.length > 0 && (
          productInFavorite.map(product => <FavoriteListItem key={ product.favoriteId } product={ product }/>)
        ) }
      </List>
      <div className="module-spacer--medium" />
      <div className="p-grid__column">
        <GrayButton
          label={"ショッピングを続ける"}
          onClick={ backToHome }
        />
      </div>
    </section>
  )
}

export default FavoriteList;