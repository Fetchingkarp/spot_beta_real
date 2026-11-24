
import { Image } from 'expo-image';
import { useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { useRouter } from 'expo-router';

type PressProps = {
  setClose: () => void;
};

type Visibility = 'Invisible' | 'Friends-Only' | 'Public';

type SessionType = 'Solo' | 'Together';

type Activity = {
  name: string;
  tracked: boolean;
};

// Available activities
const ACTIVITIES: Activity[] = [
  // Tracked activities
  { name: 'Walking', tracked: true },
  { name: 'Running', tracked: true },
  { name: 'Cycling', tracked: true },
  { name: 'Hiking', tracked: true },

  // Untracked activities
  { name: 'Gym', tracked: false },
  { name: 'Weightlifting', tracked: false },
  { name: 'Yoga', tracked: false },
  { name: 'Pilates', tracked: false },
  { name: 'Basketball', tracked: false },
  { name: 'Soccer', tracked: false },
  { name: 'Tennis', tracked: false },
  { name: 'Boxing', tracked: false },
  { name: 'Dancing', tracked: false },
];

const VISIBILITIES: Visibility[] = [
  'Invisible',
  'Friends-Only',
  'Public',
];

export function NewSessionModal({ setClose }: PressProps) {

  const router = useRouter();

  // Selected options
  const [selectedActivity, setSelectedActivity] =
    useState<Activity | null>(null);

  const [selectedVisibility, setSelectedVisibility] =
    useState<Visibility | null>(null);

  const [sessionType, setSessionType] =
    useState<SessionType | null>(null);

  // Which selection menu is currently open?
  const [activePicker, setActivePicker] =
    useState<'activity' | 'visibility' | null>(null);

  // Confirm selections
  const handleConfirm = () => {
    console.log('Confirm pressed');

    if (!selectedActivity || !selectedVisibility || !sessionType) {
      Alert.alert(
        'Incomplete Session',
        'Please select an activity, visibility and session type before continuing.'
      );
      return;
    }

    const params = {
      activity: selectedActivity.name,
      tracked: String(selectedActivity.tracked),
      visibility: selectedVisibility,
      sessionType: sessionType,
    };

    console.log('Selected session type:', sessionType);
    console.log('Navigation parameters:', params);

    setClose();

    if (sessionType === 'Solo') {
      console.log('Navigating to solo activity');

      router.push({
        pathname: '/solo_activity',
        params,
      });
    } else if (sessionType === 'Together') {
      console.log('Navigating to group activity');

      router.push({
        pathname: '/group_activity',
        params,
      });
    }
  };  

  // Select an activity
  const handleActivitySelect = (activity: Activity) => {
    setSelectedActivity(activity);
    setActivePicker(null);
  };

  // Select visibility
  const handleVisibilitySelect = (visibility: Visibility) => {
    setSelectedVisibility(visibility);
    setActivePicker(null);
  };

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={setClose}
    >
      <View style={styles.overlay}>

        {/* Exit button */}
        <Pressable
          style={styles.exitContainer}
          onPress={setClose}
        >
          <Image
            style={styles.exitButton}
            source={require('@/assets/images/exit.png')}
          />
        </Pressable>

        {/* Main modal */}
        <View style={styles.sessionModal}>

          {/* Select Activity */}
          <Pressable
            style={[styles.buttonBorder, styles.selectActivityButton]}
            onPress={() => setActivePicker('activity')}
          >
            <Image
              style={styles.activityIcon}
              source={require('@/assets/images/exercise_type.png')}
            />

            <Text style={styles.selectionText}>
              {selectedActivity
                ? selectedActivity.name
                : 'Select Activity'}
            </Text>

            <Image
              style={styles.chevron}
              source={require('@/assets/images/chevron.png')}
            />
          </Pressable>

          {/* Visibility */}
          <Pressable
            style={[styles.buttonBorder, styles.selectVisibilityButton]}
            onPress={() => setActivePicker('visibility')}
          >
            <Image
              style={styles.visibilityIcon}
              source={require('@/assets/images/visibility.png')}
            />

            <Text style={styles.selectionText}>
              {selectedVisibility ?? 'Visibility'}
            </Text>

            <Image
              style={styles.smallChevron}
              source={require('@/assets/images/chevron.png')}
            />
          </Pressable>

          {/* Solo / Together selection */}
          <View style={styles.socialSelection}>

            {/* SOLO */}
            <Pressable
              onPress={() => setSessionType('Solo')}
              style={[
                styles.selectionButton,
                sessionType === 'Solo' && styles.selected,
                styles.buttonBorder,
              ]}
            >
              <Image
                style={styles.soloIcon}
                source={require('@/assets/images/profile.png')}
              />

              <Text style={styles.socialText}>
                SOLO
              </Text>
            </Pressable>

            {/* TOGETHER */}
            <Pressable
              onPress={() => setSessionType('Together')}
              style={[
                styles.selectionButton,
                sessionType === 'Together' && styles.selected,
                styles.buttonBorder,
              ]}
            >
              <Image
                style={styles.groupIcon}
                source={require('@/assets/images/tabIcons/group.png')}
              />

              <Text style={styles.socialText}>
                TOGETHER
              </Text>
            </Pressable>

          </View>

          {/* Confirm */}
          <Pressable
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmText}>
              Confirm!
            </Text>
          </Pressable>

        </View>

        {/* PICKER OVERLAY */}
        {activePicker !== null && (
          <View style={styles.pickerOverlay}>

            {/* Background - close picker */}
            <Pressable
              style={styles.pickerBackground}
              onPress={() => setActivePicker(null)}
            />

            {/* ACTIVITY PICKER */}
            {activePicker === 'activity' && (
              <View style={styles.pickerModal}>

                <Text style={styles.pickerTitle}>
                  Select Activity
                </Text>

                <ScrollView
                  style={styles.activityScroll}
                  contentContainerStyle={styles.activityContent}
                >

                  {/* TRACKED ACTIVITIES */}
                  <Text style={styles.categoryTitle}>
                    TRACKED
                  </Text>

                  <Text style={styles.categoryDescription}>
                    Compatible with step and distance tracking
                  </Text>

                  {ACTIVITIES.filter(activity => activity.tracked).map(activity => (
                    <Pressable
                      key={activity.name}
                      style={[
                        styles.activityOption,
                        selectedActivity?.name === activity.name &&
                          styles.optionSelected,
                      ]}
                      onPress={() => handleActivitySelect(activity)}
                    >
                      <Text style={styles.optionText}>
                        {activity.name}
                      </Text>

                    </Pressable>
                  ))}

                  {/* UNTRACKED ACTIVITIES */}
                  <Text style={styles.categoryTitle}>
                    UNTRACKED
                  </Text>

                  <Text style={styles.categoryDescription}>
                    Activities without step/distance tracking
                  </Text>

                  {ACTIVITIES.filter(activity => !activity.tracked).map(activity => (
                    <Pressable
                      key={activity.name}
                      style={[
                        styles.activityOption,
                        selectedActivity?.name === activity.name &&
                          styles.optionSelected,
                      ]}
                      onPress={() => handleActivitySelect(activity)}
                    >
                      <Text style={styles.optionText}>
                        {activity.name}
                      </Text>

                      {selectedActivity?.name === activity.name && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </Pressable>
                  ))}

                </ScrollView>

                <Pressable
                  style={styles.pickerCloseButton}
                  onPress={() => setActivePicker(null)}
                >
                  <Text style={styles.pickerCloseText}>
                    CLOSE
                  </Text>
                </Pressable>

              </View>
            )}

            {/* VISIBILITY PICKER */}
            {activePicker === 'visibility' && (
              <View style={styles.visibilityPicker}>

                <Text style={styles.pickerTitle}>
                  Select Visibility
                </Text>

                {VISIBILITIES.map((visibility, index) => (
                  <Pressable
                    key={visibility}
                    style={[
                      styles.visibilityOption,
                      index !== VISIBILITIES.length - 1 && {
                        borderBottomColor: 'black',
                        borderBottomWidth: 4,
                      },
                      selectedVisibility === visibility &&
                        styles.optionSelected,
                    ]}
                    onPress={() => handleVisibilitySelect(visibility)}
                  >
                    <Text style={styles.visibilityOptionText}>
                      {visibility}
                    </Text>

                    {selectedVisibility === visibility && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </Pressable>
                ))}

              </View>
            )}

          </View>
        )}

      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  sessionModal: {
    width: '100%',
    height: '70%',
    maxWidth: 500,

    borderWidth: 3,
    borderColor: 'black',
    backgroundColor: '#92D80F',

    padding: 20,

    flexDirection: 'column',
    justifyContent: 'center',

    gap: 20,
    borderRadius: 80,
  },

  exitContainer: {
    alignSelf: 'flex-end',
  },

  exitButton: {
    width: 80,
    height: 80,
  },

  buttonBorder: {
    borderColor: 'black',
    borderWidth: 6,
  },

  selectActivityButton: {
    flex: 2,
    alignSelf: 'center',
    backgroundColor: 'white',
    width: '90%',

    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  activityIcon: {
    height: 25,
    width: 75,
  },

  selectionText: {
    fontSize: 18,
    fontWeight: 'bold',
    flexShrink: 1,
    textAlign: 'center',
  },

  chevron: {
    height: 30,
    width: 30,
  },

  selectVisibilityButton: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: 'white',
    width: '70%',

    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  visibilityIcon: {
    width: 60,
    height: 35,
  },

  smallChevron: {
    height: 30,
    width: 30,
  },

  socialSelection: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  selectionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    width: '45%',
  },

  soloIcon: {
    width: 80,
    height: 80,
  },

  groupIcon: {
    width: 110,
    height: 70,
  },

  socialText: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  selected: {
    backgroundColor: '#BD009B',
  },

  confirmButton: {
    backgroundColor: '#FFBC50',
    width: '60%',
    alignItems: 'center',
    padding: 15,
    alignSelf: 'center',

    borderColor: 'black',
    borderWidth: 5,
    borderRadius: 20,
  },

  confirmText: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  // PICKER OVERLAY
  pickerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    justifyContent: 'center',
    alignItems: 'center',

    zIndex: 100,
    elevation: 100,
  },

  pickerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: 'rgba(0,0,0,0.65)',
  },

  // ACTIVITY PICKER
  pickerModal: {
    width: '90%',
    maxWidth: 450,
    height: '75%',
    backgroundColor: '#92D80F',

    borderWidth: 5,
    borderColor: 'black',
    borderRadius: 30,

    padding: 15,
  },

  pickerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',

    paddingVertical: 15,
    borderBottomColor: 'black',
    borderBottomWidth: 5,
  },

  activityScroll: {
    flex: 1,
  },

  activityContent: {
    paddingBottom: 15,
  },

  categoryTitle: {
    fontWeight: 'bold',
    fontSize: 23,
    marginTop: 20,
    marginBottom: 5,
  },

  categoryDescription: {
    fontSize: 13,
    marginBottom: 10,
  },

  activityOption: {
    backgroundColor: 'white',

    minHeight: 55,
    paddingHorizontal: 15,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderWidth: 3,
    borderColor: 'black',
    marginBottom: 7,
  },

  optionSelected: {
    backgroundColor: '#FFBC50',
  },

  optionText: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  checkmark: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#BD009B',
  },

  pickerCloseButton: {
    backgroundColor: '#FFBC50',
    padding: 12,
    alignItems: 'center',

    borderWidth: 4,
    borderColor: 'black',
    borderRadius: 15,
  },

  pickerCloseText: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  // VISIBILITY PICKER
  visibilityPicker: {
    width: '75%',
    maxWidth: 350,

    backgroundColor: 'white',

    borderColor: 'black',
    borderWidth: 6,
  },

  visibilityOption: {
    minHeight: 65,
    paddingHorizontal: 15,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  visibilityOptionText: {
    fontWeight: 'bold',
    fontSize: 22,
  },

});
