
import { combineReducers } from 'redux';
import { todoReducer } from '../redux/todos/todo.reducer';

export const rootReducer = combineReducers({
  todos: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;