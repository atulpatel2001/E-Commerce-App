import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1/users';

const requestOptions = {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  

export const registerUser = async (name: string, email: string, password: string, phone: string) => {
  const response = await axios.post(`${API_URL}/register`, { name, email, password, phone },requestOptions);
  console.log(response)
  return response.data;
};


export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password },requestOptions);
  return response.data.data;
};


 export const logOut = async (token:string
    |undefined
 ) => {
    try {
      const response = await axios.get(`${API_URL}/logout`, {withCredentials: true});
      
      console.log('Logout successful:', response.data.message);
    } catch (error) {
    
    }
  };
