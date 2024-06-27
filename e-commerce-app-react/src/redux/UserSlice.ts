
/**
 * This slice is define user is login and store a userid
 */
import { createSlice } from '@reduxjs/toolkit';

//user state
interface UserState {
  isLoggedIn: boolean;
}

//intial data is logout 
const initialState: UserState = {
  isLoggedIn: false,
};

// create a slice 
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
