import { View, Text, TextInput, StyleSheet, TouchableOpacity, TextInputKeyPressEvent } from 'react-native';
import React, { FC, useMemo } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import SvgDelete from '../assets/delete.svg';
import SvgTask from '../assets/task.svg';
import SvgTaskSuccess from '../assets/task-success.svg';
import SvgTaskImportant from '../assets/task-important.svg';
import { ITask } from '../interfaces/task.interface';
import { fontSize } from '../theme';
import { useDispatch } from 'react-redux';
import { edit, remove } from '../store/slices/task.slice';

interface IProps {
  item: ITask;
}

export const Task: FC<IProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleKeyPress = (e: TextInputKeyPressEvent) => {
    if (e.nativeEvent.key === 'Enter') console.log('3');
  };

  const icon = useMemo(() => {
    if (item.isCompleted) {
      return <SvgTaskSuccess />;
    } else if (item.type === 'important') {
      return <SvgTaskImportant />;
    } else {
      return <SvgTask />;
    }
  }, [item.type, item.isCompleted]);

  return (
    <View style={style.container}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {icon}
        <View>
          <TextInput
            style={[item.isCompleted && { textDecorationLine: 'line-through' }, style.input]}
            value={item.title}
          />
          <TextInput
            style={[item.isCompleted && { textDecorationLine: 'line-through' }, style.input]}
            onKeyPress={handleKeyPress}
            value={item.description}
          />
        </View>
      </View>
      <View style={style.options}>
        <BouncyCheckbox
          style={{ width: 20 }}
          isChecked={item.isCompleted}
          size={20}
          onPress={(isCompleted) => dispatch(edit({ id: item.id, isCompleted }))}
        />
        <TouchableOpacity onPress={() => dispatch(remove(item.id))}>
          <SvgDelete />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    padding: 10,
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  input: {
    fontSize: fontSize.body,
  },
});
