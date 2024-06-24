
/**
 * This slice is define user is login and store a userid
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//user state
interface UserState {
  isLoggedIn: boolean;
  userId: string | null;
}

//intial data is logout 
const initialState: UserState = {
  isLoggedIn: false,
  userId: null,
};

// create a slice 
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.userId = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
