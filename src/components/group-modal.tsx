
import { Image } from 'expo-image';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Group, User, getUserById } from '@/data/users';

type Props = {
  setClose: () => void;
  group: Group;
};

export function GroupModal({ setClose, group }: Props) {

  // Retrieve all users belonging to this group
  const members = group.memberIds
    .map((memberId) => getUserById(memberId))
    .filter((member): member is User => member !== undefined);

  return (
    <View style={styles.overlay}>

      {/* Dark background */}
      <View
        style={styles.background}
        pointerEvents="none"
      />

      {/* Group content */}
      <View style={styles.sessionModal}>

        {/* Group Name */}
        <View style={styles.groupNameContainer}>
          <Text style={styles.groupName}>
            {group.name.toUpperCase()}
          </Text>
        </View>

        {/* Members List */}
        <ScrollView
          style={styles.membersScrollView}
          contentContainerStyle={styles.membersContent}
        >
          {members.map((member) => (
            <Pressable
              key={member.userId}
              style={styles.userContainer}
              onPress={() => {}}
            >

              {/* Profile Image */}
              <View style={styles.imageSection}>
                <Image
                  source={{
                    uri: member.profilePicture ??
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSltdyesaETmIsYYdxPW3gcpIW0LCkUWaTdcCzKII5VMw&s=10'
                  }}
                  style={styles.groupImage}
                  contentFit="cover"
                />
              </View>

              {/* User Information */}
              <View style={styles.userInfo}>
                <Text style={styles.username}>
                  {member.name}
                </Text>

                <Text style={styles.userStatus}>
                  {/* Add member status here */}
                </Text>
              </View>

            </Pressable>
          ))}

          {members.length === 0 && (
            <Text style={styles.emptyText}>
              No members found.
            </Text>
          )}
        </ScrollView>

        {/* Exit Button */}
        <Pressable
          style={styles.backButtonContainer}
          onPress={setClose}
        >
          <Image
            style={styles.backButton}
            source={require('@/assets/images/back.png')}
          />
        </Pressable>

        {/* Chat Button */}
        <Pressable
          style={styles.chatButtonContainer}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 30 }}>
            CHAT
          </Text>
        </Pressable>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  // Overlay fills its parent container
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    zIndex: 100,
    elevation: 10,

    justifyContent: 'flex-end',
  },

  // Dark background behind group panel
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },

  // Actual group panel
  sessionModal: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },

  groupNameContainer: {
    paddingVertical: 15,
    borderBottomColor: 'black',
    borderBottomWidth: 8,
  },

  groupName: {
    fontWeight: 'bold',
    fontSize: 35,
    textAlign: 'center',
  },

  memberCount: {
    fontSize: 16,
    color: '#BD009B',
    fontWeight: 'bold',
  },

  membersScrollView: {
    flex: 1,
    width: '100%',
  },

  membersContent: {
    flexGrow: 1,
    flexDirection: 'column',
    paddingBottom: 100,
  },

  userContainer: {
    flexDirection: 'row',
    width: '100%',
    minHeight: 110,
    borderBottomWidth: 5,
    borderBottomColor: 'black',
    alignItems: 'center',
  },

  imageSection: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  groupImage: {
    width: 75,
    height: 75,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 40,
  },

  userInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },

  username: {
    fontWeight: 'bold',
    fontSize: 22,
  },

  userStatus: {
    fontSize: 15,
  },

  emptyText: {
    textAlign: 'center',
    padding: 20,
    fontSize: 18,
  },

  backButtonContainer: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    zIndex: 10,
  },

  backButton: {
    height: 90,
    width: 90,
  },

  chatButtonContainer: {
    position: 'absolute',
    bottom: 15,
    left: 130,
    zIndex: 10,
    height: 100,
    width: 170,
    backgroundColor: '#92D80F',
    alignItems: 'center',
    justifyContent: 'center',

    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 5,
    borderRadius: 30,
  },

});
