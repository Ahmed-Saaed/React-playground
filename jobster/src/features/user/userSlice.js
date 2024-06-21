import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import {
  clearStoreThunk,
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
} from './userThunk';
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPi) => {
    return registerUserThunk('/auth/register', user, thunkAPi);
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPi) => {
    return loginUserThunk('/auth/login', user, thunkAPi);
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPi) => {
    return updateUserThunk('/auth/updateUser', user, thunkAPi);
  }
);

export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state, {payload}) => {
      state.user = null;
      removeUserFromLocalStorage();
      if (payload) {
        toast.info(payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, {payload}) => {
        const {user} = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Hello there ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, {payload}) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, {payload}) => {
        const {user} = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Hello there ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, {payload}) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, {payload}) => {
        const {user} = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`user updated`);
      })
      .addCase(updateUser.rejected, (state, {payload}) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(clearStore.rejected, () => {
        toast.error('there was an error..');
      });
  },
});

export const {logoutUser} = userSlice.actions;
export default userSlice.reducer;
