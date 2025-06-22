import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { FC, useEffect, useRef, useState } from 'react';
import { BottomSheetModalProvider, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useDispatch } from 'react-redux';
import { ITask } from '../interfaces/task.interface';
import { create, edit } from '../store/slices/task.slice';
import uuid from 'react-native-uuid';
import { colors, fontSize } from '../theme';

const template: ITask = {
  id: '',
  title: '',
  description: '',
  isCompleted: false,
  type: 'usual',
};

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  task?: ITask;
}

export const Modal: FC<IProps> = ({ isVisible, onClose, task }) => {
  const dispatch = useDispatch();

  const [data, setData] = useState<ITask>(task ? task : template);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (isVisible) {
      bottomSheetModalRef.current?.present();
    }
  }, [isVisible]);

  useEffect(() => {
    if (task) {
      setData(task);
    }
  }, [task]);

  const handleData = (name: keyof ITask, value: string | boolean) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!data.title.trim() || !data.description.trim()) return;

    if (task) {
      dispatch(edit(data));
    } else {
      dispatch(create({ ...data, id: uuid.v4() }));
    }
    handleClose();
  };

  const handleClose = () => {
    setData(template);
    bottomSheetModalRef.current?.dismiss();
    onClose();
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        onDismiss={handleClose}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        ref={bottomSheetModalRef}
        style={styles.modal}
        enableDismissOnClose
      >
        <BottomSheetView style={styles.container}>
          <Text style={styles.title}>{task ? 'Editing task' : 'Creating task'}</Text>
          <View style={styles.inputWrapper}>
            <Text style={{ flex: 0.3 }}>Name: </Text>
            <TextInput
              style={styles.input}
              value={data.title}
              onChangeText={(text) => handleData('title', text)}
              placeholder="Name"
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={{ flex: 0.3 }}>Description: </Text>
            <TextInput
              value={data.description}
              onChangeText={(text) => handleData('description', text)}
              placeholder="Descpription"
              style={styles.input}
              multiline
            />
          </View>

          <View style={styles.row}>
            <BouncyCheckbox
              text="important"
              textStyle={{ textDecorationLine: 'none' }}
              size={30}
              style={{ width: 150 }}
              isChecked={data.type === 'important'}
              onPress={(isChecked) => handleData('type', isChecked ? 'important' : 'usual')}
            />
            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
              <Text style={{ color: colors.textLight }}>{task ? 'Edit' : 'Create'}</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  modal: {
    shadowColor: colors.shadow,
    shadowRadius: 20,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
  },
  container: {
    flex: 1,
    padding: 36,
    paddingTop: 10,
    gap: 10,
  },
  title: {
    alignSelf: 'center',
    fontSize: fontSize.extra,
    marginBottom: 30,
  },
  inputWrapper: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  input: {
    padding: 5,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderColor: colors.main,
    flex: 0.7,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  btn: {
    backgroundColor: colors.main,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
