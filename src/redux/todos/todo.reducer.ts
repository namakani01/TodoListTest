import { AnyAction } from 'redux';
import {
  TodoState,
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
} from './todo.types';

const initialState: TodoState = {
  items: [],
  loading: false,
  error: null,
  filter: 'ALL',
  sort: 'RECENT',
};

export function todoReducer(
  state = initialState,
  action: AnyAction,
): TodoState {
  switch (action.type) {
    case TODO_FETCH_START:
      return { ...state, loading: true, error: null };

    case TODO_FETCH_SUCCESS:
      return { ...state, loading: false, items: action.payload };

    case TODO_FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };

    case TODO_ADD:
      return { ...state, items: [action.payload as Todo, ...state.items] };

    case TODO_TOGGLE: {
      const { id, updated_at } = action.payload;
      return {
        ...state,
        items: state.items.map(t =>
          t.id === id ? { ...t, completed: !t.completed, updated_at } : t,
        ),
      };
    }

    case TODO_EDIT: {
      const { id, title, updated_at } = action.payload;
      return {
        ...state,
        items: state.items.map(t =>
          t.id === id ? { ...t, title, updated_at } : t,
        ),
      };
    }

    case TODO_DELETE:
      return {
        ...state,
        items: state.items.filter(t => t.id !== action.payload.id),
      };

    case TODO_SET_FILTER:
      return { ...state, filter: action.payload };

    case TODO_SET_SORT:
      return { ...state, sort: action.payload };

    default:
      return state;
  }
}
