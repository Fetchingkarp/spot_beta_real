
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { getPetById } from '@/data/pets';

const FRAME_DURATION = 500;

type PetState = 'idle' | 'action' | 'exercising' | 'celebrating';

type DefaultStateProps = {
  animState: PetState;
};

const SPRITES: Record<string, number> = {
  'pet_1_1.png': require('@/assets/images/pet_1_1.png'),
  'pet_1_2.png': require('@/assets/images/pet_1_2.png'),
  'pet_1_3.png': require('@/assets/images/pet_1_3.png'),
  'pet_1_4.png': require('@/assets/images/pet_1_4.png'),
  'pet_1_5.png': require('@/assets/images/pet_1_5.png'),
  'pet_1_6.png': require('@/assets/images/pet_1_6.png'),
  'pet_1_7.png': require('@/assets/images/pet_1_7.png'),
  'pet_1_8.png': require('@/assets/images/pet_1_8.png'),
};

export function PetBubble({ animState }: DefaultStateProps) {
  const [frameIndex, setFrameIndex] = useState(0);

  const currentPet = getPetById('000');

  const frames = currentPet?.[animState] ?? currentPet?.idle ?? [];

  // Reset animation whenever the animation state changes
  useEffect(() => {
    setFrameIndex(0);
  }, [animState]);

  // Animation loop
  useEffect(() => {
    if (frames.length <= 1) return;

    const interval = setInterval(() => {
      setFrameIndex((current) => (current + 1) % frames.length);
    }, FRAME_DURATION);

    return () => clearInterval(interval);
  }, [animState, frames.length]);

  const currentFrame = frames[frameIndex] ?? 'pet_1_1.png';

  return (
    <View style={styles.iconContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.petImage}
          source={SPRITES[currentFrame]}
          contentFit="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 230,
    width: 230,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 10,
    borderRadius: 130,
    borderColor: 'black',
  },
  petImage: {
    width: '50%',
    height: '80%',
    position: 'absolute',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '50%',
  },
});
