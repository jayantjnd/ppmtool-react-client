import axios from "axios";
import setJWTInHeader from "../securityUtils/setJWTInHeader";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history) => async (dispatch) => {
  try {
    await axios.post("/api/users/register", newUser);
    history.push("/login");
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const login = (loginRequest) => async (dispatch) => {
  try {
    // post => Login request
    const res = await axios.post("/api/users/login", loginRequest);

    // extract token from res.data
    const { token } = res.data;

    // store the token in the localStorage
    localStorage.setItem("jwtToken", token);

    // set our token in the headers
    setJWTInHeader(token);
    // decode the token
    const decodedToken = jwt_decode(token);

    // dispatch to our security reducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decodedToken,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};
