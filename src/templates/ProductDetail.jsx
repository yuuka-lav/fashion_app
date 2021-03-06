import React, { useState, useEffect, useCallback } from 'react';
import { db, FirebaseTimestamp } from '../firebase/index';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { ImageSwiper, SizeTable } from '../components/Products';
import { addProductToCart, addProductToFavorite } from '../reducks/users/operations';
import HTMLReactParser from 'html-react-parser';

const useStyle = makeStyles((theme) => ({
  sliderBox: {
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 24px auto',
      height: 320,
      width: 320
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 400,
      width: 400
    }
  },
  detail: {
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 16px auto',
      height: 320,
      width: 320
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 'auto',
      width: 400
    }
  },
  price: {
    fontSize: 36
  }
}))

const returnCodeToBr = (description) => {
  if (description === "") {
    return description
  } else {
    return HTMLReactParser(description.replace(/\r?\n/g, '<br/>'))
  }
}

const ProductDetail = () => {
  const classes = useStyle()
  const selector = useSelector((state) => state)
  const path = selector.router.location.pathname
  const id = path.split('/product/')[1]
  // 上の3行で現在のstateからidのみ取り出している
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch()
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    db.collection('products').doc(id).get()
      .then(doc => {
        const data = doc.data()
        setProduct(data)
      })
  },[])

const addProduct = useCallback((selectedSize) => {
  const timestamp = FirebaseTimestamp.now()
  dispatch(addProductToCart({
    added_at: timestamp,
    description: product.description,
    gender: product.gender,
    images: product.images,
    name: product.name,
    price: product.price,
    productId: product.id,
    quantity: 1,
    size: selectedSize
  }))
  
},[product])

const addFavorite = useCallback((size) => {
  const timestamp = FirebaseTimestamp.now()
    dispatch(addProductToFavorite({
      added_at: timestamp,
      description: product.description,
      gender: product.gender,
      images: product.images,
      name: product.name,
      price: product.price,
      productId: product.id,
      quantity: 1,
      size: size,
      fovorited: true
    }))
  setIsFavorited((prev)=> !prev)
},[product])

const toggleLike = useCallback((selectedSize) => {
  addFavorite(selectedSize)
  setIsFavorited((prev)=> !prev)
},[setIsFavorited]);

  return(
    <section className="c-section-wrapin">
      { product && (
        <div className="p-grid__row">
          <div className={classes.sliderBox}>
            <ImageSwiper images={ product.images }/>
          </div>
          <div className={classes.detail}>
            <h2 className="u-text__headline">{product.name}</h2>
            <p className={classes.price}>{product.price.toLocaleString()}</p>
            <div className="module-spacer--small"/>
            <SizeTable 
              addProduct={ addProduct } 
              addFavorite={ addFavorite } 
              sizes={ product.sizes }
              isFavorited={isFavorited}
              />
            <div className="module-spacer--small"/>
            <p>{returnCodeToBr(product.description)}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductDetail