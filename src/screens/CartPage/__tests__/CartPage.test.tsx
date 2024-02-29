import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CartPage from '../CartPage';
import store from '../../../redux/store';

const Stack = createNativeStackNavigator();

test('is increment button working?', async () => {
  const {queryByTestId, getByTestId} = render(
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="CartPage" component={CartPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>,
  );

  const addButton = getByTestId('addProduct');
  const removeButton = getByTestId('removeProduct');
  const countText = getByTestId('countText');

  if (!addButton && !removeButton && !countText) {
    expect(getByTestId('emptyCartText')).toBeTruthy();
  } else {
    expect(countText).toHaveTextContent('1');

    fireEvent.press(addButton);
    expect(countText).toHaveTextContent('2');

    fireEvent.press(removeButton);
    expect(countText).toHaveTextContent('1');
  }
});
