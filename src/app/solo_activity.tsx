
import { useEffect, useState } from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { PetBubble } from '@/components/pet-bubble';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';

import { useRouter } from 'expo-router';

export default function SoloActivity() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);

  // Exercise statistics
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);

  const router = useRouter();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 10);
      }, 10);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const handlePetTap = () => {
    if (!sessionStarted || !isRunning) return;

    setSteps((prev) => prev + 10);

    setDistance((prev) =>
      Number((prev + 0.01).toFixed(2))
    );
  };

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);

    return (
      `${String(minutes).padStart(2, '0')} : ` +
      `${String(seconds).padStart(2, '0')} : ` +
      `${String(ms).padStart(2, '0')}`
    );
  };

  const handleStartSession = () => {
    console.log('start session');

    setTimer(0);
    setSteps(0);
    setDistance(0);

    setSessionStarted(true);
    setIsRunning(true);
  };
  const handleStopSession = () => {
    console.log("ending session")
    const experienceGained = (steps / 100) + (distance * 40);

    router.push({
      pathname: '/session_results',
      params: {
        experience: experienceGained.toString(),
      },
    });
  };

  return (
    <ThemedView style={styles.container}>

      {/* TOP HALF */}
      <ThemedView style={styles.topSection}>

        {/* Timer */}
        <ThemedView style={styles.timerSection}>
          <Text style={styles.timerText}>
            {formatTime(timer)}
          </Text>
        </ThemedView>

        {/* Pet */}
        <ThemedView style={styles.petBubbleSection}>
          <Pressable
            onPress={handlePetTap}
            style={styles.petBubblePressable}
          >
            <PetBubble />
          </Pressable>
        </ThemedView>

      </ThemedView>

      {/* BLACK DIVIDER */}
      <ThemedView style={styles.divider} />

      {/* BOTTOM HALF */}

      {/* Begin Screen */}
      {!sessionStarted && <View style={styles.bottomSection}>

        {/* Info boxes */}
        <View style={styles.infoSection}>
          <View style={styles.infoBox}>
            <Image
            source={require('@/assets/images/steps.png')}
            style={{
              width: 60,
              height: 60,
            }}
            resizeMode="contain"
            />
          </View>
          <View style={styles.infoBox}>
            <Image
            source={require('@/assets/images/distance.png')}
            style={{
              width: 60,
              height: 60,
            }}
            resizeMode="contain"
            />
          </View>
          <View style={styles.infoBox} />
          <View style={styles.infoBox} />
        </View>
        {/* Begin button */}
        <View style={styles.beginSection}>
          <Pressable
            style={styles.beginButton}
            onPress={handleStartSession}
          >
            <Text style={styles.beginText}>BEGIN</Text>
          </Pressable>
        </View>

      </View>}

      {/* In-Activity Screen */}
      {sessionStarted && <View style={styles.bottomSection}>

        {/* Info boxes */}
        <View style={styles.infoSection}>
          <View style={styles.infoBox}>
            <Image
              source={require('@/assets/images/steps.png')}
              style={{
                width: 60,
                height: 60,
              }}
              resizeMode="contain"
            />

            <Text style={styles.infoText}>
              {steps}
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Image
              source={require('@/assets/images/distance.png')}
              style={{
                width: 60,
                height: 60,
              }}
              resizeMode="contain"
            />

            <Text style={styles.infoText}>
              {distance.toFixed(2)} km
            </Text>
          </View>
          <View style={styles.infoBox} />
          <View style={styles.infoBox} />
        </View>
        
        {/* Play / Pause Section */}
        <View style={styles.playSection}>
          {isRunning && <Pressable onPress={() => setIsRunning(false)}>
            <Image
            source={require('@/assets/images/pause.png')}
            style={{
              width: 170,
              height: 170,
            }}
            resizeMode="contain"
            />
          </Pressable>}
          {!isRunning && <Pressable onPress={() => setIsRunning(true)}>
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
  petBubblePressable: {
    justifyContent: 'center',
    alignItems: 'center',
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
      
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    infoText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: 'black',
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
