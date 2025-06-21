import { configureStore } from '@reduxjs/toolkit';
import TaskReducer from './slices/task.slice';

const store = configureStore({
  reducer: {
    taskState: TaskReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof configureStore>;
export type AppDispatch = AppStore['dispatch'];
