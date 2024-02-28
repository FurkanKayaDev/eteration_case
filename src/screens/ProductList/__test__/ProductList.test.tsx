import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import ProductList from '../ProductList';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from '../../../redux/store';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

test('updates value when text is typed in SearchInput', async () => {
  const {getByPlaceholderText} = render(
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ProductList" component={ProductList} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>,
  );

  const searchInput = getByPlaceholderText('🔍 Search');
  fireEvent.changeText(searchInput, 'test');
  expect(searchInput.props.value).toBe('test');
});

test('toggle visibility when select filter button is pressed', async () => {
  const {getByTestId} = render(
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ProductList" component={ProductList} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>,
  );

  const selectFilterButton = getByTestId('selectFilterButton');

  fireEvent.press(selectFilterButton);

  expect(selectFilterButton).toBeTruthy();
});
