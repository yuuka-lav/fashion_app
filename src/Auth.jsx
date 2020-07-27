import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIsSinedIn } from './reducks/users/selectors';
import { listenAuthState } from './reducks/users/operations';

const Auth = ({ children }) => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state);
  const isSinedIn = getIsSinedIn(selector);
  
  useEffect(()=>{
    if (!isSinedIn) {
      dispatch(listenAuthState())
    }
  },[])

  if (!isSinedIn) {
    return <></>
  } else {
    return children
  }
}

export default Auth;