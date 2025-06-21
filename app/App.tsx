import { SafeAreaView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { CreateTask, TaskList } from './components';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  const { width } = useWindowDimensions();

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.container, { width }]}>
          <CreateTask />
          <TaskList />
        </View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
    padding: 35,
  },
});

export default App;
