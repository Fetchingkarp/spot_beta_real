
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { PetBubble } from '@/components/pet-bubble';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';

import { addExperienceToUser, getUserById } from '@/data/users';
import { useLocalSearchParams, useRouter } from 'expo-router';



export default function SessionResults() {
  const router = useRouter();

  // Receive experience from previous screen
  const { experience } = useLocalSearchParams();

  const experienceGained = Number(experience) || 0;
  const handleReturnHome = () => {
    console.log("HOME")
    // Get current experience before updating
    const user = getUserById('user001');

    const oldExperience = user?.experience ?? 0;

    // Update actual user data
    const updatedUser = addExperienceToUser(
      'user001',
      experienceGained
    );

    if (!updatedUser) return;

    const newExperience = updatedUser.experience;

    // Navigate home, passing old and new experience
    router.replace({
      pathname: '/(tabs)',
      params: {
        xpFrom: String(oldExperience),
        xpTo: String(newExperience),
        xpAnimationId: String(Date.now()),
      },
    });
  };
  
  return (
    <ThemedView style={styles.container}>

      {/* TOP HALF */}
      <ThemedView style={styles.topSection}>
        {/** Title */}
        <Text style={{fontSize: 45, marginTop: 30}}>Session Results</Text>
        {/* Pet */}
        <ThemedView style={styles.petBubbleSection}>
          <PetBubble animState='celebrating'/>
        </ThemedView>

      </ThemedView>

      {/* BLACK DIVIDER */}
      <ThemedView style={styles.divider} />

      {/* BOTTOM HALF */}

      {/* In-Activity Screen */}
      <View style={styles.bottomSection}>

        {/* Bonus box */}
        <View style={styles.bonusesSection}>
          <View style={styles.bonusDescription}> 
            <Image source={require('@/assets/images/bonus_plusses.png')} style={styles.bonusPlusses}/>
            <Text style={{fontWeight: 'bold', fontSize: 25}}>Bonuses:</Text>
          </View>

          <View style={styles.bonusesList}>
            <Image source={require('@/assets/images/award.png')} style={styles.award}/>
          </View>
        </View>

        <View style={styles.experienceSection}>
          <Text style={styles.experienceText}>Experience Gained</Text>
          <Text style={styles.experienceGained}>{experienceGained}</Text>
        </View>
        
        {/* Graphics Section */}
        <View style={styles.iconsSection}>

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

          <Pressable onPress={handleReturnHome}>
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
    marginTop: 10,
    flex: 0.7,
    width: '90%',
    flexDirection: 'column',
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
    bonusDescription: {
      flexDirection: 'row', 
      flex: 1
    },
      bonusPlusses: {
        height: 40,
        width: 35,
      },
      bonusesList: {
        flexDirection: 'row',
        flex: 2,
        justifyContent: 'space-evenly',
        alignItems: 'center'
      },
      award: {
        height: 70, 
        width: 80,
      },
  experienceSection: {
    marginTop: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 5,
    borderRadius: 30,
    flex: 0.5,
    width: '60%',
    alignSelf: 'flex-end',

    marginRight: 10,

    display: 'flex',
    flexDirection: 'column'
  },
    experienceText: {
      fontWeight: 'bold',
      fontSize: 20,
      alignSelf: 'center'
    },
    experienceGained: {
      fontWeight: 'bold',
      fontSize: 30,
      alignSelf: 'center'
    },

  // Play / Pause / Stop buttons
  iconsSection: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,

    display: 'flex',
    flexDirection: 'row',
  }
});
