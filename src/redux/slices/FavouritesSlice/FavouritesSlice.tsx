import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initialState = {
  favouriteItems: [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addToFavourites(state, action: PayloadAction<string>) {
      state.favouriteItems.push(action.payload);
    },
    removeFromFavourites(state, action: PayloadAction<string>) {
      state.favouriteItems = state.favouriteItems.filter(
        item => item !== action.payload,
      );
    },
  },
});

export const {addToFavourites, removeFromFavourites} = favouritesSlice.actions;
export default favouritesSlice.reducer;
