export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
};

export type FilterType = 'ALL' | 'ACTIVE' | 'DONE';
export type SortType = 'RECENT' | 'ID';

export type TodoState = {
  items: Todo[];
  loading: boolean;
  error: string | null;
  filter: FilterType;
  sort: SortType;
};

export const TODO_FETCH_START = 'TODO/FETCH_START';
export const TODO_FETCH_SUCCESS = 'TODO/FETCH_SUCCESS';
export const TODO_FETCH_ERROR = 'TODO/FETCH_ERROR';

export const TODO_ADD = 'TODO/ADD';
export const TODO_TOGGLE = 'TODO/TOGGLE';
export const TODO_DELETE = 'TODO/DELETE';
export const TODO_EDIT = 'TODO/EDIT';

export const TODO_SET_FILTER = 'TODO/SET_FILTER';
export const TODO_SET_SORT = 'TODO/SET_SORT';