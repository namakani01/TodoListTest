import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Todo } from '../redux/todos/todo.types';

type Props = {
  visible: boolean;
  todo: Todo | null;
  onClose: () => void;
  onSave: (id: number, title: string) => void;
};

export default function EditTodoModal({
  visible,
  todo,
  onClose,
  onSave,
}: Props) {
  const [text, setText] = useState('');

  useEffect(() => {
    setText(todo?.title ?? '');
  }, [todo]);

  const handleSave = () => {
    if (!todo) return;
    const t = text.trim();
    if (!t) return;
    onSave(todo.id, t);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Edit Todo</Text>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Enter todo..."
            placeholderTextColor="#777"
            style={styles.input}
          />

          <View style={styles.row}>
            <Pressable onPress={onClose} style={[styles.btn, styles.btnGhost]}>
              <Text style={[styles.btnText, styles.btnGhostText]}>Cancel</Text>
            </Pressable>

            <Pressable onPress={handleSave} style={styles.btn}>
              <Text style={styles.btnText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#0b0b0b',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#222',
    padding: 14,
  },
  title: { color: '#fff', fontSize: 16, fontWeight: '800', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 12,
    padding: 12,
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 12,
  },
  btn: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  btnText: { color: '#000', fontWeight: '800' },
  btnGhost: { backgroundColor: '#000', borderWidth: 1, borderColor: '#fff' },
  btnGhostText: { color: '#fff' },
});
