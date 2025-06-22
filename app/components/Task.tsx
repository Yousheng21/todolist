import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { type FC, useMemo } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import SvgDelete from '../assets/delete.svg';
import SvgTask from '../assets/task.svg';
import SvgTaskSuccess from '../assets/task-success.svg';
import SvgTaskImportant from '../assets/task-important.svg';
import { type ITask } from '../interfaces/task.interface';
import { colors, fontSize } from '../theme';
import { useDispatch } from 'react-redux';
import { edit, remove } from '../store/slices/task.slice';
import { displayToast } from '../utils/toast';

interface IProps {
  item: ITask;
  setSelectTask: (arg?: ITask) => void;
  selectTask?: ITask;
}

export const Task: FC<IProps> = ({ item, setSelectTask, selectTask }) => {
  const dispatch = useDispatch();

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
    <TouchableOpacity
      onPress={() => {
        setSelectTask(item);
      }}
      style={[style.container, selectTask?.id === item.id && { backgroundColor: colors.backdrop }]}
    >
      <View style={{ flexDirection: 'row', gap: 10, flex: 0.75 }}>
        {icon}
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={[item.isCompleted && { textDecorationLine: 'line-through' }, style.textTitle]}>
            {item.title}
          </Text>
          <Text numberOfLines={1} style={[item.isCompleted && { textDecorationLine: 'line-through' }, style.textDesc]}>
            {item.description}
          </Text>
        </View>
      </View>
      <View style={style.options}>
        <BouncyCheckbox
          style={{ width: 30 }}
          isChecked={item.isCompleted}
          size={25}
          onPress={(isCompleted) => dispatch(edit({ id: item.id, isCompleted }))}
        />
        <TouchableOpacity
          onPress={() => {
            dispatch(remove(item.id));
            displayToast('success', 'Success', `Task ${item.title} is remove`);
          }}
        >
          <SvgDelete width={32} height={32} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.main,
    padding: 10,
    paddingTop: 30,
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    flex: 0.25,
  },
  textTitle: {
    fontSize: fontSize.extra,
    width: '70%',
  },
  textDesc: {
    fontSize: fontSize.small,
    width: '70%',
    fontStyle: 'italic',
  },
});
