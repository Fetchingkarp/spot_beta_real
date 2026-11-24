
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type PressProps = {
  setOpen: () => void;
};

export function NewSession({ setOpen }: PressProps) {
  return (
    <View style={styles.iconContainer}>
      <Pressable onPress={setOpen}>
        <Image
          style={styles.image}
          source={require('@/assets/images/plus.png')}
        />
      </Pressable>

      <Text style={styles.text}>New Session</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    borderStyle: 'solid',
    borderColor: 'white',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'flex-end',
  },
  image: {
    width: 120,
    height: 120,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
