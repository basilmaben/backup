import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { NotFoundPage } from "./containers";

class RouteComponent extends React.Component {
  render() {
    const { route, isAuthenticated, ...rest } = this.props; //checking props
    const { auth, component: Component, authPage = "/login" } = route; //destruct
    const show = !auth || isAuthenticated; //show route if theres no key
    return show ? <Component {...rest} /> : <Redirect to={authPage} />; //if yes then redirect to login page
  }
}

const Routes = (props) => {
  /*  */

  const { routes } = props; /* destruct  */

  const { isAuthenticated /* access isauth or not */ } = useSelector(
    (state) => state.auth
  );
  /* to display if auth or not */
  const toRouteComponent = (route) => {
    /* route elements returns new route */
    return (
      <Route
        key={route.name} /* name in route config */
        path={route.path} /* path in " " */
        render={(routeProps /* history */) => (
          <RouteComponent
            {...routeProps} /* passing history location */
            route={route} /* route */
            isAuthenticated={isAuthenticated}
          />
        )}
      />
    );
  };

  // Routes needs to be in props so
  // react is is not rerendering page component
  return (
    <Switch>
      {/* wrapping in switch */}
      {routes.map(toRouteComponent)} {/* passing to route comp */}
      <Route component={NotFoundPage} /> {/* no key directly notfoundpage */}
    </Switch>
  );
};

export default Routes;
