import {Product} from './ProductTypes';

export type TabScreenParamList = {
  FavouritesPage: undefined;
  ProductList: undefined;
  CartPage: undefined;
  ProfilePage: undefined;
};

export type StackScreenParamList = {
  TabNavigator: undefined;
  ProductDetail: {item: Product; name: string};
};
