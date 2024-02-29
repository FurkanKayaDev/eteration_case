import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import Router from './src/router/Router';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store from './src/redux/store';
import {persistStore} from 'redux-persist';

const App = () => {
  const persistor = persistStore(store);
  return (
    <SafeAreaView style={styles.flex}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
