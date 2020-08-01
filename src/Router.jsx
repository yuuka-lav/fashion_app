import React from 'react';
import { Route, Switch } from 'react-router';
import { SignIn, ProductList, SignUp, Reset, ProductEdit } from './templates';
import Auth from './Auth';

const Router = () => {
  return(
    <Switch>
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/signin/reset"} component={Reset} />
      <Auth>
        <Route exact path={"(/)?"} component={ProductList} />
        <Route path={"/product/edit(/:id)?"} component={ProductEdit} />
      </Auth>
    </Switch>
  )
}

export default Router;