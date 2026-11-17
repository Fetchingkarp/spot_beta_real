
import { Image } from 'expo-image';
import { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';

type PressProps = {
  setClose: () => void;
};

export function NewSessionModal({ setClose }: PressProps) {
  const [soloSelected, setSoloSelected] = useState(false);
  const [togetherSelected, setTogetherSelected] = useState(false);

  const router = useRouter();

  const handleConfirm = () => {
    // Check prerequisite selections
    // if (!selectedPet || !selectedActivity || !selectedDuration) {
    //   alert('Please complete all selections before continuing!');
    //   return;
    // }

    // All prerequisites satisfied
    console.log("HANDLE")
    router.push('/solo_activity');
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

        {/* Modal content */}
        <View style={styles.sessionModal}>

          {/* Select Activity */}
          <Pressable style={[styles.buttonBorder, styles.selectActivityButton]}>
            <Image
              style={styles.activityIcon}
              source={require('@/assets/images/exercise_type.png')}
            />
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Select Activity</Text>
            <Image
              style={{height: 40, width: 40}}
              source={require('@/assets/images/chevron.png')}
            />
          </Pressable>

          {/* Visibility */}
          <View style={[styles.buttonBorder, styles.selectVisibilityButton]}>
            <Image
              style={styles.visibilityIcon}
              source={require('@/assets/images/visibility.png')}
            />
            <Text style={{fontWeight: 'bold'}}>Visibility</Text>
            <Image
              style={{height: 30, width: 30}}
              source={require('@/assets/images/chevron.png')}
            />
          </View>

          {/* Solo / Together selection */}
          <View style={styles.socialSelection}>

            <Pressable
              onPress={() => {
                setSoloSelected(true);
                setTogetherSelected(false);
              }}
              style={[
                styles.selectionButton,
                soloSelected && styles.selected, styles.buttonBorder
              ]}
            >
              <Image
                style={styles.soloIcon}
                source={require('@/assets/images/profile.png')}
              />
              <Text style={styles.socialText}>SOLO</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setTogetherSelected(true);
                setSoloSelected(false);
              }}
              style={[
                styles.selectionButton,
                togetherSelected && styles.selected, styles.buttonBorder
              ]}
            > 
              <Image
                style={styles.groupIcon}
                source={require('@/assets/images/tabIcons/group.png')}
              />
              <Text style={styles.socialText}>TOGETHER</Text>
            </Pressable>

          </View>

          {/* Confirm */}
          <Pressable style={styles.confirmButton}
          onPress={handleConfirm}>
            <Text style={styles.confirmText}>Confirm!</Text>
          </Pressable>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({

  // Covers the entire screen
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    justifyContent: 'center',
    alignItems: 'center',

    padding: 20,
  },

  // Actual modal box
  sessionModal: {
    width: '100%',
    height: '70%',
    maxWidth: 500,

    borderWidth: 3,
    borderColor: 'black',

    backgroundColor: '#92D80F',

    padding: 20,

    display: 'flex',
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
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 6
  },

  selectActivityButton: {
    flex: 2,

    alignSelf: 'center',
    backgroundColor: 'white',
    width: '90%',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',

    alignItems: 'center'
  },
  activityIcon: {
    height: '25',
    width: '75',
  },

  selectVisibilityButton: {
    flex: 1,

    alignSelf: 'center',
    backgroundColor: 'white',
    width: '70%',
    height: '10%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',

    alignItems: 'center'
  },
  visibilityIcon: {
    width: 60,
    height: 25,
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

    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 5,
    borderRadius: 20
  },
  confirmText: {
    fontWeight: 'bold',
    fontSize: 20
  }
});
