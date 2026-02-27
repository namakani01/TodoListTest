import React, { memo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SortType } from '../redux/todos/todo.types';

type Props = {
  value: SortType;
  onChange: (v: SortType) => void;
};

function SortBarInner({ value, onChange }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>Sort:</Text>

      <Pressable
        style={[styles.chip, value === 'RECENT' && styles.chipActive]}
        onPress={() => onChange('RECENT')}
      >
        <Text
          style={[styles.chipText, value === 'RECENT' && styles.chipTextActive]}
        >
          Most Recent
        </Text>
      </Pressable>

      <Pressable
        style={[styles.chip, value === 'ID' && styles.chipActive]}
        onPress={() => onChange('ID')}
      >
        <Text
          style={[styles.chipText, value === 'ID' && styles.chipTextActive]}
        >
          By ID
        </Text>
      </Pressable>
    </View>
  );
}

export const SortBar = memo(SortBarInner);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  label: { color: '#fff', fontWeight: '700' },
  chip: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  chipActive: { backgroundColor: '#fff' },
  chipText: { color: '#fff', fontWeight: '600' },
  chipTextActive: { color: '#000' },
});
