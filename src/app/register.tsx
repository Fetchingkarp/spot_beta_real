
import { useRouter } from 'expo-router';
import {
  ScrollView,
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

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <AuthBackground>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>

          {/* TITLE */}
          <Text style={styles.title}>
            Welcome{'\n'}to Spot!
          </Text>

          {/* REGISTER FORM */}
          <View style={styles.form}>

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder=""
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder=""
            />

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder=""
            />

            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder=""
            />

          </View>

          {/* NAVIGATION BUTTONS */}
          <View style={styles.buttonsContainer}>

            <AuthButton
              title="Back"
              onPress={() => router.back()}
              style={styles.backButton}
              textStyle={styles.backText}
            />

            <AuthButton
              title={'Create\nAccount!'}
              onPress={() => router.replace('/(tabs)')}
              style={styles.createButton}
              textStyle={styles.createText}
            />

          </View>

        </View>
      </ScrollView>
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: '10%',
    paddingTop: '7%',
    paddingBottom: 18,
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 18,
  },

  form: {
    width: '100%',
  },

  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 3,
    marginTop: 8,
  },

  input: {
    width: '100%',
    height: 70,
    borderWidth: 3,
    borderColor: Colors.black,
    borderRadius: 13,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    fontSize: 15,
  },

  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 'auto',
    marginBottom: 50,
    paddingTop: 35,
  },

  backButton: {
    backgroundColor: Colors.pink,
    borderRadius: 0,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '35%',
    height: 40,

    justifyContent: 'center',
    alignItems: 'center'
  },

  backText: {
    fontSize: 20,
  },

  createButton: {
    width: '65%',
    minHeight: 70,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },

  createText: {
    fontSize: 19,
  },
});
