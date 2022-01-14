import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../ducks/auth.duck";
import { makeStyles, Container, Avatar, Typography } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { LoginForm } from "../../forms";

const useStyles = makeStyles((theme) => ({
  /* importing styles from material ui */
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const LoginPage = (props) => {
  /* render */

  const dispatch = useDispatch(); /* using dispatch as a hook */
  const { loginInProgress, loginError } = useSelector(
    (state) => state.auth
  ); /* update two states */
  const classes = useStyles();

  const handleSubmit = (values) => {
    const { email, password } = values;
    const { history } = props;
    dispatch(login(email, password))
      .then(() => history.push("/todo"))
      .catch(() => {
        /*Already handled */
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        {" "}
        {/* styles */}
        <Avatar className={classes.avatar}>
          {" "}
          {/* styles */}
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <LoginForm /* handling the form */
          onSubmit={handleSubmit}
          inProgress={loginInProgress} /* check the progress */
          onError={loginError} /* check for error */
        />
      </div>
    </Container>
  );
};

export default LoginPage;
