
import { Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NewSession } from '@/components/new_session';
import { HeaderBar } from '@/components/ui/header-bar';
import { NewSessionModal } from '@/components/ui/new_session_modal';

import { PetBubble } from '@/components/pet-bubble';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';

import { useLocalSearchParams } from 'expo-router';

import {
  calculateLevel,
  experienceToNextLevel,
  getUserById,
} from '@/data/users';

import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useEffect, useRef, useState } from 'react';

export default function HomeScreen() {
  const [showActivityModal, setShowActivityModal] = useState(false);

  // Load sample user Alex
  const currentUser = getUserById('user001');

  // Calculate level and experience progress
  const actualExperience = currentUser?.experience ?? 0;

// Start from the previous XP if returning from a session
  const [displayedExperience, setDisplayedExperience] = useState(
    () => xpFrom !== undefined
      ? Number(xpFrom)
      : actualExperience
  );
  const lastAnimationId = useRef<string | null>(null);

  const level = calculateLevel(displayedExperience);

  const experienceInLevel = displayedExperience % 100;
  const experienceNeeded = 100;

  const experienceRemaining = experienceToNextLevel(
    displayedExperience
  );

  const progress = experienceInLevel / experienceNeeded;

  const {
    xpFrom,
    xpTo,
    xpAnimationId,
  } = useLocalSearchParams<{
    xpFrom?: string;
    xpTo?: string;
    xpAnimationId?: string;
  }>();

  // Open and close modal
  const openActivityModal = () => {
    setShowActivityModal(true);
  };

  const closeActivityModal = () => {
    setShowActivityModal(false);
  };

  useEffect(() => {
    if (!xpAnimationId || !xpFrom || xpTo === undefined) {
      return;
    }

    // Prevent the same animation from playing twice
    if (lastAnimationId.current === xpAnimationId) {
      return;
    }

    lastAnimationId.current = xpAnimationId;

    const startXP = Number(xpFrom);
    const endXP = Number(xpTo);

    const duration = 2500; // Animation duration in milliseconds
    const startTime = Date.now();

    // Start at the old experience
    setDisplayedExperience(startXP);

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      // Progress from 0 to 1
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out animation (starts fast, finishes slowly)
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      // Calculate current displayed XP
      const currentXP = Math.round(
        startXP + (endXP - startXP) * easedProgress
      );

      setDisplayedExperience(currentXP);

      // Stop when the target is reached
      if (progress >= 1) {
        setDisplayedExperience(endXP);
        clearInterval(interval);
      }

    }, 16);

    return () => clearInterval(interval);

  }, [xpAnimationId, xpFrom, xpTo]);
  

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>

        {/* HEADER */}
        <ThemedView style={styles.headerSection}>
          <HeaderBar />
        </ThemedView>

        {/* PET SECTION */}
        <ThemedView style={styles.heroSection}>

          <PetBubble animState='idle'/>
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
    alignItems: 'center',
    gap: Spacing.three,
    maxWidth: MaxContentWidth,
  },

  headerSection: {
    alignItems: 'center',
    width: '100%',
    height: '12%',
  },

  heroSection: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    width: '100%',
    gap: Spacing.four,
  },

  // LEVEL
  levelSection: {
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    fontSize: 16,
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
    bottom: 30,
    right: 50,
    zIndex: 5,
  },

});
