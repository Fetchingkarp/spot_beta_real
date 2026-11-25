
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';
import { HeaderBar } from '@/components/ui/header-bar';
import { WebBadge } from '@/components/web-badge';
import { MaxContentWidth } from '@/constants/theme';
import { getUserById } from '@/data/users';

export default function Profile() {
  const [profileSelected, setProfileSelected] = useState(true);

  // Profile visibility
  const [visibility, setVisibility] = useState('Friends-Only');

  // Settings
  const [screenreader, setScreenreader] = useState(false);
  const [vibrate, setVibrate] = useState(false);
  const [stepCounter, setStepCounter] = useState(false);
  const [fontSize, setFontSize] = useState('Default');
  const [colourScheme, setColourScheme] = useState('Default');

  const currentUser = getUserById('user001');
  const router = useRouter();

  const handleLogOut = () => {
    router.push('/title');
  };

  const cycleOption = (
    current: string,
    setCurrent: (value: string) => void,
    options: string[]
  ) => {
    const index = options.indexOf(current);
    setCurrent(options[(index + 1) % options.length]);
  };


  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>

        {/* HEADER */}
        <ThemedView style={styles.headerSection}>
          <HeaderBar />
        </ThemedView>

        {/* MAIN CONTENT */}
        <ThemedView style={styles.heroSection}>

          {/* TAB HEADERS */}
          <View style={styles.tabHeaderContainer}>
            <Pressable
              style={[
                styles.tabHeader,
                profileSelected && styles.selected
              ]}
              onPress={() => setProfileSelected(true)}
            >
              <Text style={styles.tabText}>Profile</Text>
            </Pressable>

            <Pressable
              style={[
                styles.tabHeader,
                !profileSelected && styles.selected
              ]}
              onPress={() => setProfileSelected(false)}
            >
              <Text style={styles.tabText}>Settings</Text>
            </Pressable>
          </View>

          {/* PROFILE TAB */}
          {profileSelected ? (
            <View style={styles.profileContent}>

              {/* PROFILE PICTURE */}
              <View style={styles.profileImageContainer}>
                {currentUser?.profilePicture ? (
                  <Image
                    source={{ uri: currentUser.profilePicture }}
                    style={styles.profileImage}
                  />
                ) : (
                  <Image
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYZnMyonIwXS4djGAqZ4g9iKPHk2FjS0mJq7gBq5zVHw&s=10' }}
                    style={styles.profileImage}
                  />
                )}
              </View>

              {/* USERNAME */}
              <View style={styles.usernameContainer}>

                <Image
                  source={require('@/assets/images/edit.png')}
                  style={styles.pencilImage}
                  resizeMode="contain"
                />

                <View style={styles.usernameTextContainer}>
                  <Text style={styles.sectionLabel}>
                    Change Username:
                  </Text>

                  <Text style={styles.usernameText}>
                    [USERNAME]
                  </Text>
                </View>

              </View>

              {/* PROFILE VISIBILITY */}
              <View style={styles.visibilityContainer}>
                <Text style={styles.sectionLabel}>
                  Profile Visibility
                </Text>

                <View style={styles.visibilityList}>
                  {['Invisible', 'Friends-Only', 'Public'].map((option) => (
                    <Pressable
                      key={option}
                      style={styles.visibilityOption}
                      onPress={() => setVisibility(option)}
                    >
                      <View style={styles.radioOuter}>
                        {visibility === option && (
                          <View style={styles.radioInner} />
                        )}
                      </View>

                      <Text style={styles.optionText}>
                        {option}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* LOG OUT */}
              <View style={styles.logOutContainer}>
                <Pressable
                  style={styles.logOutButton}
                  onPress={handleLogOut}
                >
                  <Text style={styles.logOutText}>
                    Log Out
                  </Text>
                </Pressable>
              </View>

            </View>
          ) : (

            /* SETTINGS TAB */
            <View style={styles.settingsContent}>

              {/* SETTINGS GEAR IMAGE */}
              <View style={styles.gearContainer}>
                <Image
                  source={require('@/assets/images/settings.png')}
                  style={styles.gearImage}
                  resizeMode="contain"
                />
              </View>

              {/* SCREENREADER */}
              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>
                  Enable Screenreader:
                </Text>

                <Pressable
                  style={styles.checkbox}
                  onPress={() => setScreenreader(!screenreader)}
                >
                  {screenreader && (
                    <View style={styles.checkboxTick} />
                  )}
                </Pressable>
              </View>

              {/* VIBRATE */}
              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>
                  Enable Vibrate:
                </Text>

                <Pressable
                  style={styles.checkbox}
                  onPress={() => setVibrate(!vibrate)}
                >
                  {vibrate && (
                    <View style={styles.checkboxTick} />
                  )}
                </Pressable>
              </View>

              {/* FONT SIZE */}
              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>
                  Font Size:
                </Text>

                <Pressable
                  style={styles.selectButton}
                  onPress={() => cycleOption(
                    fontSize,
                    setFontSize,
                    ['Default', 'Small', 'Large']
                  )}
                >
                  <Text style={styles.selectText}>
                    {fontSize} ▼
                  </Text>
                </Pressable>
              </View>

              {/* COLOUR SCHEME */}
              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>
                  Colour Scheme:
                </Text>

                <Pressable
                  style={styles.colourSelectButton}
                  onPress={() => cycleOption(
                    colourScheme,
                    setColourScheme,
                    ['Default', 'Light', 'Dark']
                  )}
                >
                  <Text style={styles.selectText}>
                    {colourScheme} ▼
                  </Text>
                </Pressable>
              </View>

              {/* STEP COUNTER */}
              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>
                  Disable Step Counter:
                </Text>

                <Pressable
                  style={styles.checkbox}
                  onPress={() => setStepCounter(!stepCounter)}
                >
                  {stepCounter && (
                    <View style={styles.checkboxTick} />
                  )}
                </Pressable>
              </View>

            </View>
          )}

        </ThemedView>

        {Platform.OS === 'web' && <WebBadge />}

      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  safeArea: {
    flex: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    alignItems: 'stretch',
    gap: 0,
  },

  // HEADER
  headerSection: {
    width: '100%',
    height: '11%',
    alignItems: 'center',
  },

  // MAIN SECTION
  heroSection: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    borderTopWidth: 5,
    borderTopColor: 'black',

    marginTop: 20
  },

  // TABS
  tabHeaderContainer: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 5,
    borderBottomColor: 'black',
  },

  tabHeader: {
    flex: 1,
    backgroundColor: '#BD009B',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 3,
    borderRightColor: 'black',
    borderLeftWidth: 3,
    borderLeftColor: 'black',
  },

  selected: {
    backgroundColor: '#92D80F',
  },

  tabText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textDecorationLine: 'underline',
  },

  // PROFILE CONTENT
  profileContent: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 18,
  },

  profileImageContainer: {
    width: 140,
    height: 140,
    marginTop: 20,
    marginBottom: 18,
  },

  profileImage: {
    width: '100%',
    height: '100%',
    borderWidth: 5,
    borderColor: 'black',
    resizeMode: 'cover',
  },

  // USERNAME
  usernameContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 26,
  },

  pencilImage: {
    width: 50,
    height: 50,
    marginRight: 8,
  },

  usernameTextContainer: {
    flexDirection: 'column',
    gap: 5,
  },

  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },

  usernameText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },

  // VISIBILITY
  visibilityContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },

  visibilityList: {
    marginTop: 8,
    marginLeft: 16,
    gap: 7,
  },

  visibilityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },

  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: 2.5,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioInner: {
    width: 13,
    height: 13,
    borderRadius: 10,
    backgroundColor: '#92D80F',
  },

  optionText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },

  // LOGOUT
  logOutContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  logOutButton: {
    backgroundColor: 'red',
    borderWidth: 5,
    borderColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },

  logOutText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
  },

  // SETTINGS CONTENT
  settingsContent: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 13,
  },

  gearContainer: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },

  gearImage: {
    width: 130,
    height: 130,
  },

  // SETTINGS ROWS
  settingRow: {
    width: '100%',
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 0,
  },

  settingLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },

  // CHECKBOXES
  checkbox: {
    width: 40,
    height: 40,
    borderWidth: 7,
    borderColor: 'black',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 100,
  },

  checkboxTick: {
    width: '100%',
    height: '100%',
    backgroundColor: '#92D80F',
  },

  // DROPDOWN BUTTONS
  selectButton: {
    minWidth: 68,
    backgroundColor: '#CCCCCC',
    borderWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 5,
    paddingVertical: 2,
    alignItems: 'center',
  },

  colourSelectButton: {
    minWidth: 68,
    backgroundColor: '#92D80F',
    borderWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 5,
    paddingVertical: 2,
    alignItems: 'center',
  },

  selectText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'black',
  },

});
