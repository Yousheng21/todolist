import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import { colors, fontSize } from '../theme';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, selectTasks } from '../store/slices/task.slice';
import { TFilter } from '../interfaces/task.interface';

export const Filters = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector(selectTasks);

  const renderItem = (type: TFilter) => {
    const isSelect = filter === type;

    return (
      <TouchableOpacity
        style={[style.btn, isSelect && { backgroundColor: colors.main }]}
        onPress={() => dispatch(changeFilter(type))}
      >
        <Text style={[style.text, isSelect && { color: colors.textLight }]}>{type}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={style.container}>
      {renderItem('all')}
      {renderItem('important')}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    gap: 3,
  },
  btn: {
    borderColor: colors.main,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  text: {
    color: colors.textDark,
    fontSize: fontSize.normal,
    textTransform: "capitalize"
  },
});
