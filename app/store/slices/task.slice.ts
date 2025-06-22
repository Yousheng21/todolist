import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type ITask, type TFilter } from '../../interfaces/task.interface';

interface IInitialState {
  tasks: ITask[];
  filter: TFilter;
}

const initialState: IInitialState = {
  tasks: [
    { id: '3213199', title: 'fkjsdhfjhsdgfjkhgs', description: 'sdjhgfkhjsgdkfjhsdf', isCompleted: true, type: 'usual' },
    { id: '3123123', title: 'name', description: 'Desc', isCompleted: false, type: 'important' },
  ],
  filter: 'all',
};

const taskSlice = createSlice({
  name: 'taskSlice',
  initialState,
  reducers: {
    create: (state, action: PayloadAction<ITask>) => {
      state.tasks = [action.payload, ...state.tasks];
    },
    remove: (state, action: PayloadAction<string>) => {
      state.tasks = [...state.tasks].filter((i) => i.id !== action.payload);
    },
    edit: (state, action: PayloadAction<Partial<ITask>>) => {
      state.tasks = state.tasks.map((i) => {
        if (i.id === action.payload.id) return { ...i, ...action.payload };
        return i;
      });
    },
    changeFilter: (state, action: PayloadAction<TFilter>) => {
      state.filter = action.payload;
    },
  },
});

export const { create, remove, edit, changeFilter } = taskSlice.actions;

export const selectTasks = (state: { taskState: IInitialState }) => state.taskState;

export default taskSlice.reducer;
