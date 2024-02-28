import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Product} from '../../../types/ProductTypes';

interface FavouritesState {
  favouriteItems: Product[];
}

const initialState: FavouritesState = {
  favouriteItems: [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addToFavourites(state, action: PayloadAction<Product>) {
      state.favouriteItems.push(action.payload);
    },
    removeFromFavourites(state, action: PayloadAction<Product>) {
      state.favouriteItems = state.favouriteItems.filter(
        item => item.id !== action.payload.id,
      );
    },
  },
});

export const {addToFavourites, removeFromFavourites} = favouritesSlice.actions;
export default favouritesSlice.reducer;
