import { createSelector } from 'reselect';

const usersSelector = (state) => state.users;

export const getIsSinedIn = createSelector(
  [usersSelector],
  state => state.isSignedIn
)

export const getProductsInCart = createSelector(
  [usersSelector],
  state => state.cart
)

export const getProductsInFavorite = createSelector(
  [usersSelector],
  state => state.favorite
)

export const getOrdersHistory = createSelector(
  [usersSelector],
  state => state.orders
)


export const getUserId = createSelector(
  [usersSelector],
  state => state.uid
)

export const getUsername = createSelector(
  [usersSelector],
  state => state.username
)