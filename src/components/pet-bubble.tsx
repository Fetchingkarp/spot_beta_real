import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import Animated, { Keyframe, Easing } from 'react-native-reanimated';

import classes from './animated-icon.module.css';
const DURATION = 300;

export function AnimatedSplashOverlay() {
  return null;
}

export function PetBubble() {
  return (
    <View style={styles.iconContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.petImage} source={require('@/assets/images/pet_1_1.png')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    zIndex: 1000,
    position: 'absolute',
    top: 128 / 2 + 138,
  },
  imageContainer: {
    height: 230,
    width: 230,
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 7,
    borderRadius: 130,
    borderColor: 'white',

  },
  petImage: {
    width: '80%',
    height: '80%',
    position: 'absolute',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '50%',
  },
  image: {
    position: 'absolute',
    width: 76,
    height: 71,
  },
  background: {
    width: 128,
    height: 128,
    position: 'absolute',
  },
});
