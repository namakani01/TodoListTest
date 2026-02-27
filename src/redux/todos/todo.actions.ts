import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../app/rootReducer';
import {
  TODO_FETCH_START,
  TODO_FETCH_SUCCESS,
  TODO_FETCH_ERROR,
  TODO_ADD,
  TODO_TOGGLE,
  TODO_DELETE,
  TODO_EDIT,
  TODO_SET_FILTER,
  TODO_SET_SORT,
  Todo,
  FilterType,
  SortType,
} from './todo.types';
import { fetchTodosApi } from '../../api/todosApi';
import { nowISO } from '../../utils/time';

type ThunkResult<R> = ThunkAction<R, RootState, undefined, AnyAction>;

export const fetchTodos = (): ThunkResult<Promise<void>> => async dispatch => {
  dispatch({ type: TODO_FETCH_START });

  try {
    const data = await fetchTodosApi();
    const ts = nowISO();

    const mapped: Todo[] = data.map(t => ({
      id: t.id,
      title: t.title,
      completed: t.completed,
      created_at: ts,
      updated_at: ts,
    }));

    dispatch({ type: TODO_FETCH_SUCCESS, payload: mapped });
  } catch (e: any) {
    dispatch({
      type: TODO_FETCH_ERROR,
      payload: e?.message ?? 'Something went wrong',
    });
  }
};

export const addTodo = (title: string): AnyAction => {
  const ts = nowISO();

  const id = Date.now();

  return {
    type: TODO_ADD,
    payload: {
      id,
      title: title.trim(),
      completed: false,
      created_at: ts,
      updated_at: ts,
    } satisfies Todo,
  };
};

export const toggleTodo = (id: number): AnyAction => ({
  type: TODO_TOGGLE,
  payload: { id, updated_at: nowISO() },
});

export const deleteTodo = (id: number): AnyAction => ({
  type: TODO_DELETE,
  payload: { id },
});

export const editTodo = (id: number, title: string): AnyAction => ({
  type: TODO_EDIT,
  payload: { id, title: title.trim(), updated_at: nowISO() },
});

export const setFilter = (filter: FilterType): AnyAction => ({
  type: TODO_SET_FILTER,
  payload: filter,
});

export const setSort = (sort: SortType): AnyAction => ({
  type: TODO_SET_SORT,
  payload: sort,
});
