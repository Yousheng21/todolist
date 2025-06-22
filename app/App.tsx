import React from 'react';
import { SafeAreaView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { TaskList } from './components';
import { Provider } from 'react-redux';
import store from './store/store';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App() {
  const { width } = useWindowDimensions();

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={[styles.container, { width }]}>
            <TaskList />
          </View>
        </SafeAreaView>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
    padding: 35,
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});

export default App;
