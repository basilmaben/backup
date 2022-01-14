import { showCurrentUserSuccess } from "./user.duck";

export const AUTH_INFO_SUCCESS = "app/auth/AUTH_INFO_SUCCESS";

export const LOGIN_REQUEST = "app/auth/LOGIN_REQUEST";
export const LOGIN_SUCCESS = "app/auth/LOGIN_SUCCESS";
export const LOGIN_ERROR = "app/auth/LOGIN_ERROR";

export const SIGNUP_REQUEST = "app/auth/SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "app/auth/SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "app/auth/SIGNUP_ERROR";

export const LOGOUT_REQUEST = "app/auth/LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "app/auth/LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "app/auth/LOGOUT_ERROR";

const initialState = {
  /* defining initialstate */
  isAuthenticated: false,

  loginInProgress: false,
  loginError: null,

  signupInProgress: false,
  signupError: null,

  logoutInProgress: false,
  logoutError: null,
};

export default function authReducer(state = initialState, action = {}) {
  const { type, payload } = action; /* destruct */
  switch (type /*  */) {
    case AUTH_INFO_SUCCESS:
      return {
        ...state,
        isAuthenticated:
          !!payload /* if successful action creator, excutes this code in index */,
      };
    /* Checking the conditions  */
    case LOGIN_REQUEST:
      return { ...state, loginInProgress: true, loginError: null };
    case LOGIN_SUCCESS:
      return { ...state, loginInProgress: false, isAuthenticated: true };
    case LOGIN_ERROR:
      return {
        ...state,
        loginInProgress: false,
        loginError: payload,
      }; /* send error msg in payload */

    case SIGNUP_REQUEST:
      return { ...state, signupInProgress: true, signupError: null };
    case SIGNUP_SUCCESS:
      return { ...state, signupInProgress: false, isAuthenticated: true };
    case SIGNUP_ERROR:
      return { ...state, signupInProgress: false, signupError: payload };

    case LOGOUT_REQUEST:
      return { ...state, logoutInProgress: true, logoutError: null };
    case LOGOUT_SUCCESS:
      return { ...state, logoutInProgress: false, isAuthenticated: false };
    case LOGOUT_ERROR:
      return { ...state, logoutInProgress: false, logoutError: payload };
    default:
      return state;
  }
}

export const authInfoSuccess = (user) => ({
  type: AUTH_INFO_SUCCESS,
  payload: user,
});

export const loginRequest = () => ({ type: LOGIN_REQUEST }); /* sending type */
export const loginSuccess = () => ({ type: LOGIN_SUCCESS });
export const loginError = (e) => ({ type: LOGIN_ERROR, payload: e });

export const signupRequest = () => ({ type: SIGNUP_REQUEST });
export const signupSuccess = () => ({ type: SIGNUP_SUCCESS });
export const signupError = (e) => ({ type: SIGNUP_ERROR, payload: e }); //passing error to payload

export const logoutRequest = () => ({ type: LOGOUT_REQUEST });
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });
export const logoutError = (e) => ({ type: LOGOUT_ERROR, payload: e });

export const login = (email, password) => (dispatch, getState, firebase) => {
  dispatch(loginRequest());
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => dispatch(loginSuccess())) /* login successful */
    .catch((e) => {
      dispatch(loginError(e)); /* if error occurs display the payload message */
      throw e;
    });
};
/* extra argument */
export const signup = (params) => (dispatch, getState, firebase) => {
  const { email, password, firstName, lastName } = params; /* signup */
  const fullName = `${firstName} ${lastName}`; /* only fullname by firebase */
  dispatch(signupRequest());
  return firebase
    .auth()
    .createUserWithEmailAndPassword(
      email,
      password
    ) /* only email and password */
    .then((res) =>
      res.user.updateProfile({ displayName: fullName })
    ) /* update the profile name to display */
    .then(() =>
      dispatch(signupSuccess())
    ) /* isAuth changes to true and isLoggin is stopped */
    .catch((e) => {
      dispatch(signupError(e));
      throw e;
    });
};

export const logout = () => (dispatch, getState, firebase) => {
  dispatch(logoutRequest());
  return firebase
    .auth()
    .signOut()
    .then(() => dispatch(logoutSuccess())) /*  upon logout being succesful*/
    .then(() =>
      dispatch(showCurrentUserSuccess(null))
    ) /* if loggedout no need to display the current user */
    .catch((e) => {
      dispatch(logoutError(e)); /* current user if error while loggin out */
      throw e;
    });
};
