import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Dispatch} from '@reduxjs/toolkit';
import {openModal} from '../modal/modalSlice';

const url = 'https://course-api.com/react-useReducer-cart-project';

interface initialStateProp {
  cartItems: any[];
  amount: number;
  total: number;
  isLoading: boolean;
}

type AsyncThunkConfig = {
  /** return type for `thunkApi.getState` */
  state?: unknown;
  /** type for `thunkApi.dispatch` */
  dispatch?: Dispatch;
  /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
  extra?: unknown;
  /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
  rejectValue?: unknown;
  /** return type of the `serializeError` option callback */
  serializedErrorType?: unknown;
  /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
  pendingMeta?: unknown;
  /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
  fulfilledMeta?: unknown;
  /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
  rejectedMeta?: unknown;
};

const initialState: initialStateProp = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk<
  any[],
  string,
  {
    extra: {
      dispatch: Dispatch;
      name: string;
    };
  }
>('cart/getCartItems', async (name, thunkAPI) => {
  try {
    console.log(name);
    // console.log(thunkAPI);
    // console.log(thunkAPI.getState());
    // thunkAPI.dispatch(openModal());
    const resp = await axios(url);

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId); // you can mutate only in here as toolkit uses immer
    },
    increase: (state, {payload}) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, {payload}) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: (builder) => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },
});

// console.log(cartSlice);
export const {clearCart, removeItem, increase, decrease, calculateTotals} =
  cartSlice.actions;

export default cartSlice.reducer;
