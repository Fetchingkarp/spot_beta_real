import { Platform, Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeaderBar } from '@/components/ui/header-bar';

import { PetBubble } from '@/components/pet-bubble';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useState } from 'react';

export default function PetScreen() {
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  // Open the modal
  const openCustomizeModal = () => {
    setShowCustomizeModal(true);
  };
  // Close the modal
  const closeCustomizeModal = () => {
    setShowCustomizeModal(false);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.headerSection}>
          <HeaderBar></HeaderBar>
        </ThemedView>

        <ThemedView style={styles.heroSection}>
          <PetBubble></PetBubble>

          <ThemedView style={styles.statsContainer}>
            <Text>NAME</Text>
          </ThemedView>

          <ThemedView style={styles.buttonsContainer}>
            {/**Change Pets button */}
            <Pressable style={styles.changePetsButton}>
              <Text>Change Pet</Text>
            </Pressable>
            {/**Customise button */}
            <Pressable style={styles.customizeButton}>
              <Text>Customize</Text>
            </Pressable>
          </ThemedView>
        </ThemedView>


        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },

  safeArea: {
    flex: 1,
    width: '100%',
    paddingHorizontal: Spacing.four,
    alignItems: 'stretch', // Changed from center
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },

  headerSection: {
    alignItems: 'center',
    width: '100%',
    height: '12%',
    borderStyle: 'solid',
    borderColor: 'red',
    borderWidth: 5,
  },

  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%', // IMPORTANT
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
    flexDirection: 'column',
  },

  statsContainer: {
    flex: 8,
    width: '100%', // IMPORTANT
    borderTopColor: 'black',
    borderTopWidth: 4,
    borderBottomColor: 'black',
    borderBottomWidth: 4,
    backgroundColor: '#92D80F',
    flexDirection: 'column',
  },

  buttonsContainer: {
    flex: 1,
    width: '100%', // IMPORTANT
    flexDirection: 'row', // Buttons side by side
    gap: Spacing.three,
  },

  changePetsButton: {
    borderColor: '#BD009B',
    borderWidth: 6,
    flex: 1,
  },

  customizeButton: {
    borderColor: '#BD009B',
    borderWidth: 6,
    flex: 2,
  },
});
