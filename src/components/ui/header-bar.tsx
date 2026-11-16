import { SymbolView } from 'expo-symbols';
import { PropsWithChildren, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function HeaderBar() {
  return (
    <ThemedView style={styles.header}>
      <Pressable
        style={styles.logo}>
        <ThemedText type="small">HEADER</ThemedText>
      </Pressable>

      <Pressable
        style={styles.notifTest}>
        <ThemedText type="small">NOTIF</ThemedText>
      </Pressable>

      <Pressable
        style={styles.friendTest}>
        <ThemedText type="small">FRIEND</ThemedText>
      </Pressable>

      <Pressable
        style={styles.profileTest}>
        <ThemedText type="smallBold">PROFILE</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    width: '100%',
    height: '100%',

    borderColor: 'white',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  logo: {
    width: '20%',
    height: '100%',
    backgroundColor: 'green',
  },
  notifTest: {
    width: '10%',
    height: '50%',
    backgroundColor: 'green',
  },
  friendTest: {
    width: '10%',
    height: '50%',
    backgroundColor: 'green',
  },
  profileTest: {
    width: '15%',
    height: '70%',
    backgroundColor: 'green',
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  pressedHeading: {
    opacity: 0.7,
  },
  button: {
    width: Spacing.four,
    height: Spacing.four,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginTop: Spacing.three,
    borderRadius: Spacing.three,
    marginLeft: Spacing.four,
    padding: Spacing.four,
  },
});
