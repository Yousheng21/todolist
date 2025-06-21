export interface ITask {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  type: 'important' | 'usual';
}

export type TFilter = 'all' | 'important';
