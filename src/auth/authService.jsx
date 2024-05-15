// authService.js

import axios from "axios";

axios.defaults.withCredentials = true;

const checkSession = async () => {
  try {
    // console.log("Logging");
    await axios.post(`${process.env.REACT_APP_MONGO_BASE_URL}/api/session`);
    return true; // Session is valid
  } catch (error) {
    return false; // Session is not valid
  }
};

export default checkSession;
