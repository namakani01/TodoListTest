import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';

import { RootStackParamList } from '../navigation/types';
import { AppDispatch } from '../app/store';
import {
  fetchTodos,
  toggleTodo,
  deleteTodo,
  setFilter,
  setSort,
  editTodo,
} from '../redux/todos/todo.actions';
import {
  selectCounts,
  selectTodoState,
  selectVisibleTodos,
} from '../redux/todos/todo.selectors';
import { FilterType, SortType, Todo } from '../redux/todos/todo.types';

import { TodoItem } from '../components/TodoItem';
import { Segmented } from '../components/Segmented';
import { SortBar } from '../components/SortBar';
import EditTodoModal from '../components/EditTodoModal';

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

export default function MainScreen({ navigation }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const state = useSelector(selectTodoState);
  const visibleTodos = useSelector(selectVisibleTodos);
  const counts = useSelector(selectCounts);

  const [editOpen, setEditOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    // Fetch todos once when screen loads
    dispatch(fetchTodos());
  }, [dispatch]);

  // Filter options - memoized so it doesn't recreate array on every render
  const filterOptions = useMemo(
    () => [
      { label: 'All', value: 'ALL' as FilterType },
      { label: 'Active', value: 'ACTIVE' as FilterType },
      { label: 'Done', value: 'DONE' as FilterType },
    ],
    [],
  );

  const onToggle = useCallback(
    (id: number) => dispatch(toggleTodo(id)),
    [dispatch],
  );

  // Delete a todo
  const onDelete = useCallback(
    (id: number) => dispatch(deleteTodo(id)),
    [dispatch],
  );

  // Open edit modal and store selected todo in state
  const onEdit = useCallback((t: Todo) => {
    setEditingTodo(t);
    setEditOpen(true);
  }, []);

  // Save edited todo title
  const onSaveEdit = useCallback(
    (id: number, title: string) => dispatch(editTodo(id, title)),
    [dispatch],
  );

  // Memoized renderItem to avoid unnecessary re-renders in FlatList
  const renderItem = useCallback(
    ({ item }: { item: Todo }) => (
      <TodoItem
        item={item}
        onToggle={onToggle}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    ),
    [onDelete, onEdit, onToggle],
  );

  const keyExtractor = useCallback((item: Todo) => String(item.id), []);

  return (
    <SafeAreaView
      style={styles.safe}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.heading}>Your TODOs</Text>
            <Text style={styles.counts}>
              Total: {counts.total} • Done: {counts.done}
            </Text>
          </View>

          <Pressable
            style={styles.addBtn}
            onPress={() => navigation.navigate('AddTodo')}
          >
            <Text style={styles.addBtnText}>+ Add</Text>
          </Pressable>
        </View>

        <View style={styles.controls}>
          <Segmented
            options={filterOptions}
            value={state.filter}
            onChange={v => dispatch(setFilter(v))}
          />
          <SortBar
            value={state.sort}
            onChange={(v: SortType) => dispatch(setSort(v))}
          />
        </View>

        {/* Conditional rendering based on loading/error/data */}
        {state.loading ? (
          <View style={styles.center}>
            <ActivityIndicator />
            <Text style={styles.centerText}>Loading…</Text>
          </View>
        ) : state.error ? (
          <View style={styles.center}>
            <Text style={styles.errorText}>{state.error}</Text>
            <Pressable
              style={styles.retryBtn}
              onPress={() => dispatch(fetchTodos())}
            >
              <Text style={styles.retryText}>Retry</Text>
            </Pressable>
          </View>
        ) : (
          <FlatList
            data={visibleTodos}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            style={styles.list}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            removeClippedSubviews
            initialNumToRender={12}
            windowSize={7}
            ListFooterComponent={<View style={styles.footerFill} />}
          />
        )}

        <EditTodoModal
          visible={editOpen}
          todo={editingTodo}
          onClose={() => setEditOpen(false)}
          onSave={onSaveEdit}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#000' },
  container: { flex: 1, padding: 14, backgroundColor: '#000' },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: { color: '#fff', fontSize: 20, fontWeight: '900' },
  counts: { color: '#bbb', marginTop: 4 },
  addBtn: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  addBtnText: { color: '#000', fontWeight: '900' },
  controls: { marginTop: 15, gap: 21 },
  list: { flex: 1, backgroundColor: '#000' },
  listContent: {
    paddingTop: 14,
    paddingBottom: 18,
    flexGrow: 1,
    backgroundColor: '#000',
  },
  footerFill: { flex: 1, backgroundColor: '#000' },

  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 },
  centerText: { color: '#bbb' },
  errorText: { color: '#fff', textAlign: 'center' },
  retryBtn: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  retryText: { color: '#fff', fontWeight: '800' },
});
