
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { PetBubble } from '@/components/pet-bubble';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';


import { useRouter } from 'expo-router';

export default function SessionResults() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>

      {/* TOP HALF */}
      <ThemedView style={styles.topSection}>
        {/** Title */}
        <Text style={{fontSize: 45}}>Session Results</Text>
        {/* Pet */}
        <ThemedView style={styles.petBubbleSection}>
          <PetBubble />
        </ThemedView>

      </ThemedView>

      {/* BLACK DIVIDER */}
      <ThemedView style={styles.divider} />

      {/* BOTTOM HALF */}

      {/* In-Activity Screen */}
      <View style={styles.bottomSection}>

        {/* Bonus box */}
        <View style={styles.bonusesSection}>
        </View>
        
        {/* Play / Pause Section */}
        <View style={styles.playSection}>

          <Image
          source={require('@/assets/images/battery_2.png')}
          style={{
            width: 170,
            height: 190,
          }}
          resizeMode="contain"
          />

          <Image
          source={require('@/assets/images/pipe_2.png')}
          style={{
            width: 100,
            height: 170,
          }}
          resizeMode="contain"
          />

          <Pressable onPress={() => router.replace('/(tabs)')}>
            <Image
              source={require('@/assets/images/back_home_icon.png')}
              style={{
                width: 100,
                height: 100,
              }}
              resizeMode="contain"
            />
          </Pressable>
        </View>

      </View>

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
  bonusesSection: {
    flex: 1,
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'space-evenly',
    paddingHorizontal: 10,

    alignSelf: 'center',

    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 5,
    borderRadius: 40,
    backgroundColor: 'white'
  },

  // BEGIN BUTTON
  beginSection: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  // Play / Pause / Stop buttons
  playSection: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,

    display: 'flex',
    flexDirection: 'row',
  }
});
