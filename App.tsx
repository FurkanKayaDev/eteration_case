import {SafeAreaView} from 'react-native';
import React from 'react';
import Router from './src/router/Router';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store from './src/redux/store';
import {persistStore} from 'redux-persist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  const persistor = persistStore(store);
  return (
    <SafeAreaView style={{flex: 1}}>
      <GestureHandlerRootView style={{flex: 1}}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router />
          </PersistGate>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default App;
