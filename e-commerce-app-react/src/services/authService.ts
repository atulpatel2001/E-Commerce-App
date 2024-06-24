/**
 * in this service define authentication related api call ,like login and register
 */
import axios from "axios";

const API_URL = "http://localhost:4000/api/v1/users";

//Header data
const requestOptions = {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * purpose of this function is register user and store a data in db ,call node js api
 * @param name
 * @param email
 * @param password
 * @param phone
 * @returns response.data
 */
export const registerUser = async (
  name: string,
  email: string,
  password: string,
  phone: string
) => {
  const response = await axios.post(
    `${API_URL}/register`,
    { name, email, password, phone },
    requestOptions
  );
  console.log(response);
  return response.data;
};

/**
 * purpose of this function is authorize user and provide permission
 * @param email
 * @param password
 * @returns response.data.data
 */
export const loginUser = async (email: string, password: string) => {
  console.log(email+" "+password)
  const response = await axios.post(
    `${API_URL}/login`,
    { email, password },
    requestOptions
  );
  return response.data.data;
};

/**
 * purpose of this function is logout from current session and remove token form localstorage
 * @param token 
 */
export const logOut = async (token: string | undefined) => {
  try {
    const response = await axios.get(`${API_URL}/logout`, {
      withCredentials: true,
    });

    console.log("Logout successful:", response.data.message);
  } catch (error) {}
};
