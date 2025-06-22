import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import React, { useMemo, useState } from 'react';
import { Task } from './Task';
import { Filters } from './Filters';
import { useSelector } from 'react-redux';
import { selectTasks } from '../store/slices/task.slice';
import { Modal } from './Modal';
import { type ITask } from '../interfaces/task.interface';
import { colors, fontSize } from '../theme';

export const TaskList = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectTask, setSelectTask] = useState<ITask | undefined>(undefined);

  const { tasks, filter } = useSelector(selectTasks);

  const filterTasks = useMemo(() => {
    if (filter === 'important') {
      return tasks.filter((i) => i.type === 'important');
    } else {
      return tasks;
    }
  }, [tasks, filter]);

  const handlePressTask = (arg: ITask | undefined) => {
    setSelectTask(arg);
    setIsVisible(true);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
    setSelectTask(undefined);
  };

  return (
    <>
      <View style={styles.container}>
        <Filters />
        <FlatList
          contentContainerStyle={styles.list}
          data={filterTasks}
          renderItem={({ item }) => <Task setSelectTask={handlePressTask} selectTask={selectTask} item={item} />}
        />
        <TouchableOpacity style={styles.btn} onPress={() => setIsVisible(true)}>
          <Text style={styles.btnTitle}>Create Task</Text>
        </TouchableOpacity>
      </View>
      <Modal task={selectTask} onClose={handleCloseModal} isVisible={isVisible} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    gap: 30,
  },
  list: {
    justifyContent: 'center',
    paddingRight: 10,
  },
  btn: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
  btnTitle: {
    fontSize: fontSize.large,
    color: colors.textDark,
  },
});
