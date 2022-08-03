import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getErrorMassage, handleError, handlePending } from "common/helpers";
import { TCartState } from "redux/types";
import { Basket, BasketDTO, BasketService } from "swagger/services";

export const fetchCart = createAsyncThunk<
  Basket,
  string,
  { rejectValue: string }
>(
  'cart/fetchCart',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      return await BasketService.findBasketById({ basketId: payload });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const createCart = createAsyncThunk<
  Basket,
  undefined,
  { rejectValue: string }
>(
  'cart/createCart',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      return await BasketService.createBasket();
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const updateCart = createAsyncThunk<
  Basket,
  BasketDTO,
  { rejectValue: string }
>(
  'cart/updateCart',
  async function (payload: BasketDTO, { rejectWithValue }): Promise<any> {
    try {
      const basketId = localStorage.getItem('basketId') ?? '';

      return await BasketService.updateBasket({ basketId, body: payload });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);


const initialState: TCartState = {
  cart: null,
  loading: false,
};

const cartSlicer = createSlice({
  name: 'cart',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      //fetchCart
      .addCase(fetchCart.pending, handlePending)
      .addCase(
        fetchCart.fulfilled,
        (state, action) => {
          state.cart = action.payload;
          state.loading = false;
          console.log('fulfilled');
        },
      )
      .addCase(fetchCart.rejected, handleError)
      //createCart
      .addCase(createCart.pending, handlePending)
      .addCase(
        createCart.fulfilled,
        (state, action) => {
          state.cart = action.payload;
          localStorage.setItem('basketId', action.payload.id!);
          state.loading = false;
          console.log('fulfilled');
        },
      )
      .addCase(createCart.rejected, handleError)
      //updateCart
      .addCase(updateCart.pending, handlePending)
      .addCase(
        updateCart.fulfilled,
        (state, action) => {
          state.cart = action.payload;
          localStorage.setItem('basketId', action.payload.id!);
          state.loading = false;
          console.log('fulfilled');
        },
      )
      .addCase(updateCart.rejected, handleError)
  },
});

export const { } = cartSlicer.actions;

export default cartSlicer.reducer;