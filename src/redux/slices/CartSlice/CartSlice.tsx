import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Product} from '../../../types/ProductTypes';

interface CartState {
  cartItems: Product[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      state.cartItems.push(action.payload);
    },
    removeFromCart(state, action: PayloadAction<Product>) {
      const indexToRemove = state.cartItems.findIndex(
        item => item.id === action.payload.id,
      );
      if (indexToRemove !== -1) {
        state.cartItems.splice(indexToRemove, 1);
      }
    },
  },
});

export const {addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;
