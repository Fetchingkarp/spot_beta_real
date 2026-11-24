
import { useRouter } from 'expo-router';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  AuthBackground,
  AuthButton,
  Colors,
} from '@/components/auth-ui';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <AuthBackground>
      <View style={styles.container}>

        {/* TITLE */}
        <Text style={styles.title}>Login!</Text>

        {/* LOGIN FORM */}
        <View style={styles.form}>

          <Text style={styles.label}>
            Username / Email
          </Text>

          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder=""
          />

          <Text style={[styles.label, styles.passwordLabel]}>
            Password
          </Text>

          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder=""
          />

          <Text style={styles.forgotPassword}>
            I forgot my Password
          </Text>

        </View>

        {/* BACK BUTTON */}
        <AuthButton
          title="Back"
          onPress={() => router.back()}
          style={styles.backButton}
          textStyle={styles.backText}
        />

        {/* GO BUTTON */}
        <AuthButton
          title="GO!"
          onPress={() => router.replace('/(tabs)')}
          style={styles.goButton}
          textStyle={styles.goText}
        />

      </View>
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '9%',
    paddingTop: '20%',
    paddingBottom: '4%',
  },

  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 24,
  },

  form: {
    width: '100%',
  },

  label: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 6,
  },

  passwordLabel: {
    marginTop: 12,
  },

  input: {
    width: '100%',
    height: 55,
    borderWidth: 3,
    borderColor: Colors.black,
    borderRadius: 13,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    fontSize: 17,
  },

  forgotPassword: {
    color: Colors.red,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },

  backButton: {
    backgroundColor: Colors.pink,
    borderRadius: 0,
    width: 150,
    height: 100,
    paddingVertical: 5,
    marginTop: 'auto',
    marginBottom: 22,
  },

  backText: {
    fontSize: 38,
  },

  goButton: {
    width: '80%',
    minHeight: 90,
    marginBottom: 40,
  },

  goText: {
    fontSize: 66,
  },
});
