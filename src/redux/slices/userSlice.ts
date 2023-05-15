import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
  provider?: string;
  active?: boolean;
  verified?: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

interface AuthState {
  user?: IUser | null;
  isLoggedIn: boolean;
  token?: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  token: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // ? Logout the user by returning the initial state
    logout: () => initialState,
    // Save the user's info
    setCredentials: (state, { payload }) =>
      // { payload: { user, token } }: PayloadAction<AuthState>
      {
        console.log(payload);

        console.log('problem dey o', payload.user);
        state.token = payload.token;
        state.user = payload.user;
        state.isLoggedIn = true;
      },
    userInfo: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
    }
  }
});

export const { logout, userInfo, setCredentials } = authSlice.actions;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
