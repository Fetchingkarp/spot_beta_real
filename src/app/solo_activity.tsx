
import { useEffect, useState } from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { PetBubble } from '@/components/pet-bubble';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';

import { useRouter } from 'expo-router';

export default function SoloActivity() {
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(true);

  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionPaused, setSessionPaused] = useState(false);

  const router = useRouter();

  useEffect(() => {
    let interval = null;

    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
    }

    // Cleanup interval on unmount or pause
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const handleStopSession = () => {
    console.log("end session")
    router.push('/session_results');
  }

  return (
    <ThemedView style={styles.container}>

      {/* TOP HALF */}
      <ThemedView style={styles.topSection}>

        {/* Timer */}
        <ThemedView style={styles.timerSection}>
          <Text style={styles.timerText}>{secondsLeft}</Text>
        </ThemedView>

        {/* Pet */}
        <ThemedView style={styles.petBubbleSection}>
          <PetBubble />
        </ThemedView>

      </ThemedView>

      {/* BLACK DIVIDER */}
      <ThemedView style={styles.divider} />

      {/* BOTTOM HALF */}

      {/* Begin Screen */}
      {!sessionStarted && <View style={styles.bottomSection}>

        {/* Info boxes */}
        <View style={styles.infoSection}>
          <View style={styles.infoBox} />
          <View style={styles.infoBox} />
          <View style={styles.infoBox} />
          <View style={styles.infoBox} />
        </View>
        {/* Begin button */}
        <View style={styles.beginSection}>
          <Pressable
            style={styles.beginButton}
            onPress={() => setSessionStarted(true)}
          >
            <Text style={styles.beginText}>BEGIN</Text>
          </Pressable>
        </View>

      </View>}

      {/* In-Activity Screen */}
      {sessionStarted && <View style={styles.bottomSection}>

        {/* Info boxes */}
        <View style={styles.infoSection}>
          <View style={styles.infoBox} />
          <View style={styles.infoBox} />
          <View style={styles.infoBox} />
          <View style={styles.infoBox} />
        </View>
        
        {/* Play / Pause Section */}
        <View style={styles.playSection}>
          {!sessionPaused && <Pressable onPress={() => setSessionPaused(true)}>
            <Image
            source={require('@/assets/images/pause.png')}
            style={{
              width: 170,
              height: 170,
            }}
            resizeMode="contain"
            />
          </Pressable>}
          {sessionPaused && <Pressable onPress={() => setSessionPaused(false)}>
          <Image
            source={require('@/assets/images/play.png')}
            style={{
              width: 170,
              height: 170,
            }}
            resizeMode="contain"
          />
          </Pressable>}

          <Pressable onPress={handleStopSession}>
            <Image
              source={require('@/assets/images/stop_session.png')}
              style={{
                width: 170,
                height: 170,
              }}
              resizeMode="contain"
            />
          </Pressable>
        </View>

      </View>}

      {Platform.OS === 'web' && <WebBadge />}

    </ThemedView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
  },

  // TOP HALF
  topSection: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  timerSection: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  timerText: {
    fontSize: 60,
    fontWeight: 'bold',
  },

  petBubbleSection: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // DIVIDER
  divider: {
    height: 10,
    width: '100%',
    backgroundColor: 'black',
  },

  // BOTTOM HALF
  bottomSection: {
    flex: 1,
    width: '100%',
    backgroundColor: '#92D80F',
  },

  // INFO BOXES
  infoSection: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'space-evenly',
    paddingHorizontal: 10,
  },
    infoBox: {
      width: '43%',
      height: '40%',
      backgroundColor: 'white',
      borderWidth: 3,
      borderColor: 'black',
    },

  // BEGIN BUTTON
  beginSection: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },

  beginButton: {
    flex: 1,
    width: '80%',
    height: '80%',
    backgroundColor: '#BD009B',
    borderWidth: 5,
    borderColor: 'black',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  beginText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },

  // Play / Pause / Stop buttons
  playSection: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,

    display: 'flex',
    flexDirection: 'row',
  }
});
