export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export type TaskFilter = 'all' | 'todo' | 'done';