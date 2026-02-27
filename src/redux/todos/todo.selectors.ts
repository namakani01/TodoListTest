import { RootState } from '../../app/rootReducer';
import { Todo } from './todo.types';

// Basic selector to get entire todo state slice
export const selectTodoState = (s: RootState) => s.todos;

// Returns total count and completed count of todos
export const selectCounts = (s: RootState) => {
  const total = s.todos.items.length;
  const done = s.todos.items.filter(t => t.completed).length;
  return { total, done };
};

export const selectVisibleTodos = (s: RootState): Todo[] => {
  const { items, filter, sort } = s.todos;

  let filtered = items;
  // Apply filter based on selected tab
  if (filter === 'ACTIVE') filtered = items.filter(t => !t.completed);
  if (filter === 'DONE') filtered = items.filter(t => t.completed);

  // Make a copy before sorting so original state is not changed
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'ID') return a.id - b.id;

    const at = Date.parse(a.updated_at || a.created_at);
    const bt = Date.parse(b.updated_at || b.created_at);
    return bt - at;
  });

  return sorted;
};
