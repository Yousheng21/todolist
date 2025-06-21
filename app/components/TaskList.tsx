import { View, FlatList, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import { Task } from './Task';
import { Filters } from './Filters';
import { useSelector } from 'react-redux';
import { selectTasks } from '../store/slices/task.slice';

export const TaskList = () => {
  const { tasks, filter } = useSelector(selectTasks);

  const filterTasks = useMemo(() => {
    if (filter === 'important') {
      return tasks.filter((i) => i.type === 'important');
    } else {
      return tasks;
    }
  }, [tasks, filter]);
  console.log(tasks);
  
  return (
    <View style={styles.container}>
      <Filters />
      <FlatList
        contentContainerStyle={styles.list}
        data={filterTasks}
        renderItem={({ item }) => <Task item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    gap: 30,
  },
  list: {
    gap: 30,
    justifyContent: 'center',
  },
});
