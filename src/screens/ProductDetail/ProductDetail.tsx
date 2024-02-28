import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Product} from '../../types/ProductTypes';
import {useRoute} from '@react-navigation/native';
import {screenHeight} from '../../utils/uiHelpers';
import {useAppDispatch} from '../../redux/store';
import {addToCart} from '../../redux/slices/CartSlice/CartSlice';
interface RouteParams {
  item: Product;
}

const ProductDetail = () => {
  const route = useRoute();
  const {item} = route.params as RouteParams;
  const dispatch = useAppDispatch();

  const addCart = () => {
    dispatch(addToCart(item));
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View style={styles.informationContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.description}>{item.description}</Text>
          </ScrollView>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <View>
          <Text style={styles.priceText}>Price:</Text>
          <Text style={styles.price}>{item.price} ₺</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={addCart}>
          <Text style={styles.btnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  body: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: screenHeight * 0.25,
    marginTop: 20,
    backgroundColor: 'red',
  },
  informationContainer: {
    marginTop: 20,
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginTop: 10,
  },
  scrollView: {
    height: screenHeight * 0.35,
  },
  footerContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priceText: {
    fontSize: 18,
    color: '#1c56ff',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    width: 150,
    height: 40,
    backgroundColor: '#1c56ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
  },
});
