import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import reduxStorage from './reduxStorage';
import cartReducer from './slices/CartSlice/CartSlice';
import favouritesReducer from './slices/FavouritesSlice/FavouritesSlice';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from 'redux-persist';
import DataSlice from './slices/DataSlice/DataSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  favourites: favouritesReducer,
  data: DataSlice,
});

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['favourites', 'cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
