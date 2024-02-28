import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductDetail from '../ProductDetail';
import store from '../../../redux/store';

const Stack = createNativeStackNavigator();

test('is add to cart button working?', async () => {
  const mockItem = {
    id: '1',
    name: 'Test Product',
    price: '10',
    description: 'Test description',
    image: 'https://example.com/test.jpg',
  };

  const {getByTestId} = render(
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetail}
            initialParams={{item: mockItem}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>,
  );

  const addToCartButton = getByTestId('addToCartButton');

  fireEvent.press(addToCartButton);

  const state = store.getState();
  const addedItem = state.cart.cartItems.find(item => item.id === mockItem.id);

  expect(addedItem).toBeTruthy();
});
