import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../navigation/types';
import { AppDispatch } from '../app/store';
import { addTodo } from '../redux/todos/todo.actions';

type Props = NativeStackScreenProps<RootStackParamList, 'AddTodo'>;

export default function AddTodoScreen({ navigation }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [text, setText] = useState('');

  const handleAdd = () => {
    const t = text.trim();
    if (!t) {
      Alert.alert('Validation', 'Please enter a todo title.');
      return;
    }
    // Dispatch action to add todo in redux store
    dispatch(addTodo(t));
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={styles.safe}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Add Todo</Text>
        </View>
        <Text style={styles.label}>Todo title</Text>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Eg: Buy groceries"
          placeholderTextColor="#777"
          style={styles.input}
        />

        <Pressable style={styles.btn} onPress={handleAdd}>
          <Text style={styles.btnText}>Add</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: { flex: 1, padding: 14, backgroundColor: '#000' },
  header: {
    paddingVertical: 10,
    alignItems: 'center',
  },

  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
  },
  label: { color: '#fff', fontWeight: '800', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 12,
    padding: 12,
    color: '#fff',
  },
  btn: {
    marginTop: 14,
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnText: { color: '#000', fontWeight: '900', fontSize: 16 },
});
