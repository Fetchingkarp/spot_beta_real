
import { Image } from 'expo-image';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';


import {
  ExerciseLog
} from '@/data/users';

type LogProps = {
  log?: ExerciseLog;
  setClose: () => void;
};

export function LogModal({ log, setClose }: LogProps) {
  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={setClose}
    >
      <View style={styles.overlay}>

        {/* Modal content */}
        <View style={styles.logModal}>
          {/* Exit button */}
          <Pressable
            style={styles.exitContainer}
            onPress={setClose}
          >
            <Image
              style={styles.backButton}
              source={require('@/assets/images/back.png')}
            />
          </Pressable>
          {/* Thumbnail Image */}
          <View style={styles.topHalf}>
            <Image
              style={styles.logImage}
              source={{
                uri: log?.image ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSltdyesaETmIsYYdxPW3gcpIW0LCkUWaTdcCzKII5VMw&s=10'
              }}
            />
          </View>
           
          {/* Details */}
          <View style={styles.bottomHalf}>
            {/* First Row (Title, Date, Edit) */}
            <View style={styles.topRow}>
              {/* Title and Date */}
              <View style={styles.titleDateContainer}>
                <Text style={styles.logTitle}>
                  {log?.title}
                </Text>
                <Text style={styles.logDate}>
                  on {log?.date}
                </Text>
              </View>
              {/* Edit image, text */}
              <View style={styles.editContainer}>
                <Image
                style={styles.editButton}
                source={require('@/assets/images/edit.png')}
                />
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                  Edit
                </Text>
              </View>
            </View>
            
            {/* Middle Row (Stats) */}
            <View style={styles.middleRow}>


            </View>

            {/* Bottom Row (Description) */}
            <View style={styles.bottomRow}>
              <View style={styles.descriptionBox}>
                <Text>
                  {log?.description}
                </Text>
              </View>

            </View>
                
          </View>    


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
  
  exitContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },

  backButton: {
    width: 100,
    height: 100,
  },

  // Actual modal box
  logModal: {
    width: '100%',
    height: '85%',
    maxWidth: 500,

    borderWidth: 5,
    borderColor: 'black',
    backgroundColor: 'white',

    flexDirection: 'column',
    borderRadius: 80,

    position: 'relative',
    overflow: 'hidden',
  },

  topHalf: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
    logImage: {
      height: '90%',
      width: '90%',
    },

  bottomHalf: {
    borderTopColor: 'black',
    borderTopWidth: 10,
    flex: 5,
    backgroundColor: '#92D80F',

    display: 'flex',
    flexDirection: 'column'
  },
    topRow: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
    },
      titleDateContainer: {
        display: 'flex',
        flex: 3,
        flexDirection: 'column',
        marginLeft: 15
      },
        logTitle: {
          fontWeight: 'bold',
          fontSize: 40,
        },
        logDate: {
          fontSize: 17,
          fontWeight: 'bold',
          color: '#BD009B'
        },
      editContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      },
        editButton: {
          height: 50,
          width: 60,
        },

      middleRow: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
      },

      bottomRow: {
        flex: 1,
        alignItems: 'center'
      },
        descriptionBox: {
          height: '90%',
          width: '95%',
          backgroundColor: '#FFBC50',
          borderColor: 'black',
          borderStyle: 'solid',
          borderWidth: 5,
          borderRadius: 10
        },
  buttonBorder: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 6
  },

});
