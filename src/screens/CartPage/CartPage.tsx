import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import Header from '../../components/Header';
import {Product} from '../../types/ProductTypes';
import {
  addToCart,
  removeFromCart,
} from '../../redux/slices/CartSlice/CartSlice';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackScreenParamList} from '../../types/NavigationTypes';
const CartPage = () => {
  const dispatch = useAppDispatch();
  const {cartItems} = useAppSelector(state => state.cart);
  const navigation =
    useNavigation<NativeStackNavigationProp<StackScreenParamList>>();

  const uniqueItems = Array.from(new Set(cartItems.map(item => item.id))).map(
    id => {
      const filteredItems = cartItems.filter(item => item.id === id);
      return {
        ...filteredItems[0],
        count: filteredItems.length,
      };
    },
  );

  const removeProduct = (item: Product) => {
    dispatch(removeFromCart(item));
  };

  const addProduct = (item: Product) => {
    dispatch(addToCart(item));
  };

  const goDetail = (item: Product) => {
    navigation.navigate('ProductDetail', {
      item: item,
      name: item.name,
    });
  };

  const renderItem = ({item}: {item: Product}) => {
    return (
      <View style={styles.renderContainer}>
        <TouchableOpacity onPress={() => goDetail(item)}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>
            {Number(item.price) *
              cartItems?.filter(cartItem => cartItem.id === item.id)
                .length}{' '}
            ₺
          </Text>
        </TouchableOpacity>
        <View style={styles.counter}>
          <TouchableOpacity
            testID="removeProduct"
            style={styles.btn}
            onPress={() => removeProduct(item)}>
            <Text>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.countBtn}>
            <Text testID="countText" style={styles.countText}>
              {cartItems?.filter(cartItem => cartItem.id === item.id).length}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="addProduct"
            style={styles.btn}
            onPress={() => addProduct(item)}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.products}>
        {cartItems && cartItems.length > 0 ? (
          <View style={styles.content}>
            <View style={styles.body}>
              <FlatList
                data={uniqueItems}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
              />
            </View>
            <View style={styles.footerContainer}>
              <View>
                <Text style={styles.totalText}>Total:</Text>
                <Text style={styles.totalPrice}>
                  {cartItems
                    .map(item => Number(item.price))
                    .reduce((a, b) => a + b)}{' '}
                  ₺
                </Text>
              </View>
              <TouchableOpacity style={styles.completeBtn}>
                <Text style={styles.completeText}>Complete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <Text testID="emptyCartText" style={styles.emptyText}>
              Your cart is empty
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default CartPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  products: {
    flex: 1,
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 16,
  },
  price: {
    fontSize: 14,
    color: '#1c56ff',
  },
  renderContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  counter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btn: {
    width: 40,
    height: 40,
    borderRadius: 2,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countBtn: {
    width: 40,
    height: 40,
    borderRadius: 2,
    backgroundColor: '#1c56ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    color: 'white',
    fontSize: 16,
  },
  totalText: {
    fontSize: 16,
    color: '#1c56ff',
  },
  totalPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  footerContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completeBtn: {
    width: 150,
    height: 40,
    backgroundColor: '#1c56ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  completeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyCard: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 24,
    color: 'grey',
  },
  body: {
    maxHeight: '90%',
  },
  content: {
    height: '100%',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
});
