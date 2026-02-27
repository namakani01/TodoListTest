import React, { memo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

type Option<T extends string> = { label: string; value: T };

type Props<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (v: T) => void;
};

function SegmentedInner<T extends string>({
  options,
  value,
  onChange,
}: Props<T>) {
  return (
    <View style={styles.wrap}>
      {options.map(o => {
        const active = o.value === value;
        return (
          <Pressable
            key={o.value}
            onPress={() => onChange(o.value)}
            style={[styles.btn, active && styles.btnActive]}
          >
            <Text style={[styles.txt, active && styles.txtActive]}>
              {o.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
export const Segmented = memo(SegmentedInner) as typeof SegmentedInner;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  btn: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#000' },
  btnActive: { backgroundColor: '#fff' },
  txt: { color: '#fff', fontWeight: '600' },
  txtActive: { color: '#000' },
});
