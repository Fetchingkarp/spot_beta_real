
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getUserById } from '@/data/users';

type PressProps = {
  setClose: () => void;
  onAction?: (notificationId: string, action: string) => void;
};

export function Notif({ setClose, onAction }: PressProps) {

  // Get Alex's notifications
  const currentUser = getUserById('user001');
  const notifications = currentUser?.notifications ?? [];

  // Get the appropriate icon for each notification
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'exercise':
        return require('@/assets/images/exercise_type.png');

      case 'friendRequest':
        return require('@/assets/images/friends_icon_3.png');

      case 'groupRequest':
        return require('@/assets/images/tabIcons/group.png');

      default:
        return require('@/assets/images/notif.png');
    }
  };

  // Get action buttons for each notification type
  const getActions = (type: string) => {
    switch (type) {
      case 'friendRequest':
        return ['Accept', 'Decline'];

      case 'exercise':
        return ['Join Session'];

      case 'groupRequest':
        return ['View Invite'];

      default:
        return [];
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
      <Pressable
        style={styles.overlay}
        onPress={setClose}
      >

        {/* MODAL CONTENT */}
        <Pressable
          style={styles.modalContent}
          onPress={(e) => e.stopPropagation()}
        >

          {/* HEADER */}
          <View style={styles.textHeaderBox}>
            <Text style={styles.headerText}>
              Notifications
            </Text>
          </View>

          {/* NOTIFICATIONS LIST */}
          <ScrollView
            contentContainerStyle={styles.notifsContent}
          >

            {notifications.map((notif) => (

              <View
                key={notif.id}
                style={styles.notifRow}
              >

                {/* LEFT: ICON */}
                <View style={styles.iconSection}>
                  <Image
                    source={getNotificationIcon(notif.type)}
                    style={styles.notifIcon}
                    resizeMode="contain"
                  />
                </View>

                {/* RIGHT: DESCRIPTION AND ACTIONS */}
                <View style={styles.notifInfo}>

                  {/* DESCRIPTION */}
                  <Text style={styles.description}>
                    {notif.description}
                  </Text>

                  {/* TIMESTAMP */}
                  <Text style={styles.timestamp}>
                    {notif.timestamp}
                  </Text>

                  {/* ACTION BUTTONS */}
                  {getActions(notif.type).length > 0 && (
                    <View style={styles.actionsContainer}>

                      {getActions(notif.type).map((action) => (

                        <Pressable
                          key={action}
                          style={[
                            styles.actionButton,
                            action === 'Decline' && styles.declineButton,
                          ]}
                          disabled={!onAction}
                          onPress={() => onAction?.(notif.id, action)}
                        >
                          <Text style={styles.actionText}>
                            {action}
                          </Text>
                        </Pressable>

                      ))}

                    </View>
                  )}

                </View>

              </View>

            ))}

            {/* EMPTY NOTIFICATIONS */}
            {notifications.length === 0 && (
              <Text style={styles.emptyText}>
                You're all caught up!
              </Text>
            )}

          </ScrollView>

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

  // HEADER
  textHeaderBox: {
    flex: 1,
    justifyContent: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 5,
  },

  headerText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 30,
    paddingLeft: 15,
  },

  // NOTIFICATIONS LIST
  notifsList: {
    flex: 6,
    backgroundColor: 'white',
  },

  notifsContent: {
    flexGrow: 1,
  },

  // INDIVIDUAL NOTIFICATION
  notifRow: {
    flexDirection: 'row',
    alignItems: 'center',

    width: '100%',
    minHeight: 120,

    padding: 10,

    borderBottomColor: 'black',
    borderBottomWidth: 3,
  },

  // LEFT ICON
  iconSection: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92D80F'
  },

  notifIcon: {
    width: 65,
    height: 65,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 5,
  },

  // RIGHT INFORMATION
  notifInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 10,
    gap: 6,
  },

  description: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },

  timestamp: {
    fontSize: 12,
    color: '#777777',
    textAlign: 'center',
  },

  // ACTION BUTTONS
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 5,
  },

  actionButton: {
    backgroundColor: '#92D80F',
    borderWidth: 4,
    borderColor: 'black',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },

  declineButton: {
    backgroundColor: '#BD009B',
  },

  actionText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 18,
    color: '#777777',
  },

});
