
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

import { Friends } from './friends_popup';
import { Notif } from './notif_popup';

import { getUserById } from '@/data/users';

export function HeaderBar() {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showFriends, setShowFriends] = useState(false);

  // Get current user
  const currentUser = getUserById('user001');

  // Calculate badge counts
  const notificationCount = currentUser?.notifications.length ?? 0;

  // Change 'status' below if your friend request data uses another property
  const friendRequestCount = currentUser?.friendRequests?.length ?? 0;

  const closeNotifModal = () => {
    setShowNotifs(false);
  };

  const closeFriendsModal = () => {
    setShowFriends(false);
  };

  return (
    <ThemedView style={styles.header}>

      {/* LOGO */}
      <Pressable style={styles.logo}>
        <Text>LOGO</Text>
      </Pressable>

      {/* NOTIFICATIONS */}
      <Pressable
        style={[styles.itemBox, styles.notifTest]}
        onPress={() => setShowNotifs(true)}
      >
        <View style={styles.iconContainer}>
          <Image
            source={require('@/assets/images/notif.png')}
            style={styles.icon}
            resizeMode="contain"
          />

          {/* NOTIFICATION BADGE */}
          {notificationCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {notificationCount > 99 ? '99+' : notificationCount}
              </Text>
            </View>
          )}
        </View>
      </Pressable>

      {showNotifs && (
        <Notif setClose={closeNotifModal} />
      )}

      {/* FRIENDS */}
      <Pressable
        style={[styles.itemBox, styles.friendTest]}
        onPress={() => setShowFriends(true)}
      >
        <View style={styles.iconContainer}>
          <Image
            source={require('@/assets/images/friends_icon_3.png')}
            style={styles.icon}
            resizeMode="contain"
          />

          {/* FRIEND REQUEST BADGE */}
          {friendRequestCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {friendRequestCount > 99 ? '99+' : friendRequestCount}
              </Text>
            </View>
          )}
        </View>
      </Pressable>

      {showFriends && (
        <Friends setClose={closeFriendsModal} />
      )}

      {/* PROFILE */}
      <Pressable style={[styles.itemBox, styles.profileTest]}>
        <Image
          source={require('@/assets/images/profile.png')}
          style={styles.icon}
          resizeMode="contain"
        />
      </Pressable>

    </ThemedView>
  );
}

const styles = StyleSheet.create({

  header: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },

  itemBox: {
    backgroundColor: '#92D80F',
    borderColor: 'black',
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: '30%',
    height: '80%',
    backgroundColor: '#92D80F',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 5,
  },

  notifTest: {
    width: '20%',
    height: '100%',
    backgroundColor: '#92D80F',
  },

  friendTest: {
    width: '20%',
    height: '100%',
    backgroundColor: '#92D80F',
  },

  profileTest: {
    width: '20%',
    height: '100%',
    backgroundColor: '#92D80F',
  },

  // ICON CONTAINER
  iconContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    width: 60,
    height: 60,
  },

  // RED NOTIFICATION BADGE
  badge: {
    position: 'absolute',
    top: -10,
    right: -12,

    minWidth: 30,
    height: 30,
    paddingHorizontal: 5,

    backgroundColor: 'red',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'black',

    justifyContent: 'center',
    alignItems: 'center',

    zIndex: 10,
  },

  badgeText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },

  pressedHeading: {
    opacity: 0.7,
  },

  content: {
    marginTop: Spacing.three,
    borderRadius: Spacing.three,
    marginLeft: Spacing.four,
    padding: Spacing.four,
  },

});
