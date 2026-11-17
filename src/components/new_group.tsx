import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

export function NewGroup() {
  return (
    <View style={styles.iconContainer}>
        <Image style={styles.image} source={require('@/assets/images/plus_group.png')} />
        <Text style={styles.text}>New Group</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    borderStyle: 'solid',
    borderColor: 'white',
    alignItems: 'center',
    width: '50%',
    // backgroundColor: 'white',
    alignSelf: 'flex-end'
  },
  image: {
    width: 130,
    height: 130,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
