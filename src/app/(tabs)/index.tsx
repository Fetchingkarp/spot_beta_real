
import { Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NewSession } from '@/components/new_session';
import { HeaderBar } from '@/components/ui/header-bar';
import { NewSessionModal } from '@/components/ui/new_session_modal';

import { PetBubble } from '@/components/pet-bubble';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';

import {
  calculateLevel,
  experienceToNextLevel,
  getUserById,
} from '@/data/users';

import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useState } from 'react';

export default function HomeScreen() {
  const [showActivityModal, setShowActivityModal] = useState(false);

  // Load sample user Alex
  const currentUser = getUserById('user001');

  // Calculate level and experience progress
  const experience = currentUser?.experience ?? 0;
  const level = calculateLevel(experience);

  const experienceInLevel = experience % 100;
  const experienceNeeded = 100;
  const experienceRemaining = experienceToNextLevel(experience);

  const progress = experienceInLevel / experienceNeeded;

  // Open and close modal
  const openActivityModal = () => {
    setShowActivityModal(true);
  };

  const closeActivityModal = () => {
    setShowActivityModal(false);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>

        {/* HEADER */}
        <ThemedView style={styles.headerSection}>
          <HeaderBar />
        </ThemedView>

        {/* PET SECTION */}
        <ThemedView style={styles.heroSection}>

          <PetBubble />

          {/* LEVEL INDICATOR */}
          <View style={styles.levelSection}>
            <Text style={styles.levelText}>
              LEVEL {level}
            </Text>
          </View>

          {/* EXPERIENCE BAR */}
          <View style={styles.experienceSection}>

            <View style={styles.experienceLabels}>
              <Text style={styles.experienceText}>
                {experienceInLevel} / {experienceNeeded} XP
              </Text>

              <Text style={styles.experienceText}>
                {experienceRemaining} XP to next level
              </Text>
            </View>

            <View style={styles.experienceBarBackground}>
              <View
                style={[
                  styles.experienceBarFill,
                  { width: `${progress * 100}%` },
                ]}
              />
            </View>

          </View>

        </ThemedView>

        {/* NEW SESSION BUTTON */}
        <View style={styles.newSessionPosition}>
          <NewSession setOpen={openActivityModal} />
        </View>

        {/* NEW SESSION MODAL */}
        {showActivityModal && (
          <NewSessionModal setClose={closeActivityModal} />
        )}

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
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
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
    width: '100%',
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },

  // LEVEL
  levelSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  levelText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },

  // EXPERIENCE
  experienceSection: {
    width: '85%',
    gap: 8,
  },

  experienceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  experienceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555555',
  },

  experienceBarBackground: {
    height: 18,
    width: '100%',
    backgroundColor: '#E0E0E0',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 20,
    overflow: 'hidden',
  },

  experienceBarFill: {
    height: '100%',
    backgroundColor: '#92D80F',
    borderRadius: 20,
  },

  // NEW SESSION BUTTON
  newSessionPosition: {
    position: 'absolute',
    bottom: 15,
    right: 10,
    zIndex: 5,
  },

});
