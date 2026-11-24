
import { useRouter } from 'expo-router';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  AuthBackground,
  AuthButton,
  Colors,
} from '@/components/auth-ui';

export default function StartScreen() {
  const router = useRouter();

  return (
    <AuthBackground>
      <View style={styles.container}>

        {/* SPOT LOGO */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>SPOT</Text>
        </View>

        {/* NAVIGATION BUTTONS */}
        <View style={styles.buttonsContainer}>

          <AuthButton
            title="LOGIN"
            onPress={() => router.push('/login')}
            style={styles.navButton}
            textStyle={styles.navText}
          />

          <AuthButton
            title="Register"
            onPress={() => router.push('/register')}
            style={styles.navButton}
            textStyle={styles.navText}
          />

        </View>

      </View>
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '4%',
  },

  logoContainer: {
    width: '82%',
    height: 115,
    backgroundColor: Colors.white,
    borderWidth: 4,
    borderColor: Colors.black,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },

  logoText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: Colors.black,
  },

  buttonsContainer: {
    width: '82%',
    gap: 28,
    marginBottom: '20%',
  },

  navButton: {
    minHeight: 90,
    borderWidth: 3,
  },

  navText: {
    fontSize: 27,
  },
});
