import React, { memo, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Todo } from '../redux/todos/todo.types';

type Props = {
  item: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
};

function TodoItemInner({ item, onToggle, onDelete, onEdit }: Props) {
  const handleToggle = useCallback(
    () => onToggle(item.id),
    [item.id, onToggle],
  );
  const handleDelete = useCallback(
    () => onDelete(item.id),
    [item.id, onDelete],
  );
  const handleEdit = useCallback(() => onEdit(item), [item, onEdit]);

  return (
    <View style={styles.row}>
      <Pressable
        onPress={handleToggle}
        style={[styles.checkbox, item.completed && styles.checkboxDone]}
      >
        {item.completed ? <Text style={styles.check}>✓</Text> : null}
      </Pressable>

      <Pressable style={styles.mid} onPress={handleEdit}>
        <Text
          numberOfLines={1}
          style={[styles.title, item.completed && styles.titleDone]}
        >
          {item.title}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          id: {item.id} • updated: {new Date(item.updated_at).toLocaleString()}
        </Text>
      </Pressable>

      <Pressable onPress={handleEdit} style={styles.smallBtn}>
        <Text style={styles.smallBtnText}>Edit</Text>
      </Pressable>

      <Pressable
        onPress={handleDelete}
        style={[styles.smallBtn, styles.danger]}
      >
        <Text style={[styles.smallBtnText, styles.dangerText]}>Del</Text>
      </Pressable>
    </View>
  );
}

export const TodoItem = memo(TodoItemInner);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#222',
    backgroundColor: '#0b0b0b',
    padding: 12,
    borderRadius: 12,
    gap: 10,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: { backgroundColor: '#fff' },
  check: { color: '#000', fontWeight: '900' },
  mid: { flex: 1 },
  title: { color: '#fff', fontSize: 15, fontWeight: '700' },
  titleDone: { textDecorationLine: 'line-through', opacity: 0.6 },
  meta: { color: '#bbb', fontSize: 11, marginTop: 3 },
  smallBtn: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  smallBtnText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  danger: { borderColor: '#888' },
  dangerText: { color: '#ddd' },
});
