
import { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getUserFriends } from '@/data/users';

type PressProps = {
  setClose: () => void;
};

export function Friends({ setClose }: PressProps) {

  const [showFriends, setShowFriends] = useState(true);

  // Get Alex's friends
  const friends = getUserFriends('user001');

  // Get status colours
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return '#92D80F';
      case 'offline':
        return '#999999';
      case 'busy':
        return '#BD009B';
      case 'exercising':
        return '#2196F3';
      default:
        return '#999999';
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={true}
      onRequestClose={setClose}
    >

      {/* BACKGROUND OVERLAY */}
      <Pressable style={styles.overlay} onPress={setClose}>

        {/* MODAL CONTENT */}
        <Pressable
          style={styles.modalContent}
          onPress={(e) => e.stopPropagation()}
        >

          {/* MAIN CONTENT: 1:1:5 FLEX RATIO */}
          <View style={styles.mainContent}>

            {/* SECTION 1: TITLE */}
            <View style={styles.text_header}>
              <Text style={styles.headerText}>Friends</Text>
            </View>

            {/* SECTION 2: TABS */}
            <View style={styles.tabHeaderContainer}>

              <Pressable
                style={[
                  styles.tabHeader,
                  showFriends && styles.selected,
                ]}
                onPress={() => setShowFriends(true)}
              >
                <Text style={styles.tabText}>Friends</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.tabHeader,
                  !showFriends && styles.selected,
                ]}
                onPress={() => setShowFriends(false)}
              >
                <Text style={styles.tabText}>Requests</Text>
              </Pressable>

            </View>

            {/* SECTION 3: FRIENDS LIST / REQUESTS*/}
            {showFriends && (
              <ScrollView
                contentContainerStyle={styles.listContent}
              >

                {friends.map((friend) => (

                  <View
                    key={friend.userId}
                    style={styles.friendRow}
                  >

                    {/* PROFILE PICTURE */}
                    <Image
                      source={{ uri: friend.profilePicture }}
                      style={styles.profilePicture}
                    />

                    {/* NAME AND STATUS */}
                    <View style={styles.friendInfo}>

                      <Text style={styles.friendName}>
                        {friend.name}
                      </Text>

                      <View style={styles.statusContainer}>

                        <View
                          style={[
                            styles.statusIndicator,
                            {
                              backgroundColor: getStatusColor(
                                friend.status
                              ),
                            },
                          ]}
                        />

                        <Text style={styles.statusText}>
                          {friend.status.charAt(0).toUpperCase() +
                            friend.status.slice(1)}
                        </Text>

                      </View>

                    </View>

                  </View>

                ))}

                {friends.length === 0 && (
                  <Text style={styles.emptyText}>
                    You don't have any friends yet!
                  </Text>
                )}

              </ScrollView>
            )}

            {/* FRIEND REQUESTS */}
            {!showFriends && (
              <View style={styles.listContainer}>
                <Text style={styles.emptyText}>
                  No friend requests yet!
                </Text>
              </View>
            )}

          </View>

          {/* ADD FRIEND BUTTON */}
          <Pressable style={styles.addFriendButton}>
            <Text style={styles.addFriendText}>
              + Add Friend!
            </Text>
          </Pressable>

        </Pressable>

      </Pressable>

    </Modal>
  );
}

const styles = StyleSheet.create({

  // BACKGROUND
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },

  // MODAL
  modalContent: {
    backgroundColor: 'white',
    marginTop: 80,
    position: 'absolute',
    flexDirection: 'column',

    width: '70%',
    height: '65%',

    borderColor: 'black',
    borderWidth: 6,
  },

  // MAIN CONTENT
  mainContent: {
    flex: 1,
    flexDirection: 'column',
    display: 'flex',
  },

  // TITLE
  text_header: {
    flex: 1,
    justifyContent: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 6,
  },

  headerText: {
    fontWeight: 'bold',
    fontSize: 40,
    paddingLeft: 20,
  },

  // TABS
  tabHeaderContainer: {
    flex: 0.8,
    flexDirection: 'row',
  },

  tabHeader: {
    flex: 0.6,
    backgroundColor: '#BD009B',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    paddingLeft: 10,
  },

  selected: {
    backgroundColor: '#92D80F',
  },

  tabText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
  },

  // FRIENDS LIST
  listContainer: {
    flex: 8,
    backgroundColor: 'white',
  },

  listContent: {
    flexGrow: 1,
  },

  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    minHeight: 90,

    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },

  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
  },

  friendInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
    gap: 5,
  },

  friendName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  statusIndicator: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 18,
    color: '#555555',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 25,
    fontSize: 16,
    color: '#555555',
  },

  // ADD FRIEND BUTTON
  addFriendButton: {
    backgroundColor: '#92D80F',
    borderRadius: 50,
    borderWidth: 5,
    borderColor: 'black',

    width: '60%',
    height: 55,

    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',

    margin: 10,
  },

  addFriendText: {
    fontWeight: 'bold',
    fontSize: 20,
  },

});
