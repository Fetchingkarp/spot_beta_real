
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
    width: '50%',
    alignSelf: 'flex-end',
  },
  image: {
    width: 130,
    height: 130,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
