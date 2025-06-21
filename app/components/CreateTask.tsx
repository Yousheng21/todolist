import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import uuid from 'react-native-uuid';
import { ITask } from '../interfaces/task.interface';
import { useDispatch } from 'react-redux';
import { create } from '../store/slices/task.slice';

const template: ITask = {
  id: '',
  title: '',
  description: '',
  isCompleted: false,
  type: 'usual',
};

export const CreateTask = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState<ITask>(template);

  const handleData = (name: keyof ITask, value: string | boolean) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = () => {
    dispatch(create({ ...data, id: uuid.v4() }));
    setData(template);
  };
  console.log(data);
  
  return (
    <View style={style.container}>
      <View style={style.inputList}>
        <TextInput value={data.title} onChangeText={(text) => handleData('title', text)} placeholder="Name" />
        <TextInput
          value={data.description}
          onChangeText={(text) => handleData('description', text)}
          placeholder="Descpription"
        />
        <BouncyCheckbox
          text="important"
          textStyle={{ textDecorationLine: 'none' }}
          size={20}
          isChecked={data.type === "important"}
          onPress={(isChecked) => handleData('type', isChecked ? 'important' : 'usual')}
        />
      </View>

      <TouchableOpacity style={style.btn} onPress={handleCreate}>
        <Text>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    gap: 10,
  },
  inputList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    alignSelf: 'center',
  },
});
