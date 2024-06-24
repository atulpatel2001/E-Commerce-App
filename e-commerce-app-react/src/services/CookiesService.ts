import Cookies from 'js-cookie';


/**
 * get token from client cokkies
 * @returns token
 */
export const getToken = () => {
  return Cookies.get('token');
};
