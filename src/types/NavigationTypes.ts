interface Product {
  id: string;
  brand: string;
  model: string;
  name: string;
  price: string;
  description: string;
  image: string;
  createdAt: string;
}

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
