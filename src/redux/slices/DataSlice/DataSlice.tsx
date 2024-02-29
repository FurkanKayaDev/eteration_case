import {createSlice, createAsyncThunk, SerializedError} from '@reduxjs/toolkit';
import axios from 'axios';
import {Product} from '../../../types/ProductTypes';

interface DataState {
  products: Product[];
  loading: boolean;
  error: null | string | SerializedError;
  filterBrands: string[];
  filterModels: string[];
  sort: string;
}

const initialState: DataState = {
  products: [],
  loading: false,
  error: null,
  filterBrands: [],
  filterModels: [],
  sort: '',
};

// Create an async thunk action for fetching products
export const fetchProducts = createAsyncThunk(
  'data/fetchProducts',
  async () => {
    try {
      const response = await axios.get(
        'https://5fc9346b2af77700165ae514.mockapi.io/products',
      );
      return response.data;
    } catch (error) {
      return error;
    }
  },
);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addFilterBrands(state, action) {
      state.filterBrands = action.payload;
    },
    clearFilterBrands(state) {
      state.filterBrands = [];
    },
    addFilterModels(state, action) {
      state.filterModels = action.payload;
    },
    clearFilterModels(state) {
      state.filterModels = [];
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const {
  addFilterBrands,
  clearFilterBrands,
  addFilterModels,
  clearFilterModels,
  setSort,
} = dataSlice.actions;
export default dataSlice.reducer;
