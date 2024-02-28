import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {screenWidth} from '../utils/uiHelpers';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackScreenParamList} from '../types/NavigationTypes';
import {Product} from '../types/ProductTypes';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {
  addToFavourites,
  removeFromFavourites,
} from '../redux/slices/FavouritesSlice/FavouritesSlice';
import {addToCart} from '../redux/slices/CartSlice/CartSlice';

const Products = ({item}: {item: Product}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackScreenParamList>>();
  const dispatch = useAppDispatch();
  const {favouriteItems} = useAppSelector(state => state.favourites);

  const addFavourite = (item: Product) => {
    dispatch(addToFavourites(item));
  };

  const removeFavourite = (item: Product) => {
    dispatch(removeFromFavourites(item));
  };

  const addCart = (item: Product) => {
    dispatch(addToCart(item));
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('ProductDetail', {item: item, name: item.name})
      }>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          testID="favouriteButton"
          style={styles.starIcon}
          onPress={() => {
            favouriteItems.some(favItem => favItem.id === item.id)
              ? removeFavourite(item)
              : addFavourite(item);
          }}>
          <Icon
            name="star"
            size={24}
            color={
              favouriteItems.some(favItem => favItem.id === item.id)
                ? '#ffb503'
                : 'white'
            }
          />
        </TouchableOpacity>
        <Image source={{uri: item.image}} style={styles.image} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.priceText}>{item.price} ₺ </Text>
        <Text style={styles.name} numberOfLines={2} adjustsFontSizeToFit>
          {item.name}
        </Text>
      </View>
      <TouchableOpacity
        testID="addToCartButton"
        style={styles.button}
        onPress={() => addCart(item)}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    width: screenWidth / 2 - 40,
    margin: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    width: screenWidth / 2 - 55,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  imageContainer: {
    width: screenWidth / 2 - 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  image: {
    width: screenWidth / 2 - 55,
    height: 140,
  },
  name: {
    fontSize: 12,
  },
  priceText: {
    fontSize: 14,
    color: '#1c56ff',
    marginVertical: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c56ff',
    width: screenWidth / 2 - 55,
    padding: 10,
    borderRadius: 3,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
  },
  starIcon: {
    position: 'absolute',
    zIndex: 1,
    right: 10,
    top: 5,
  },
});
