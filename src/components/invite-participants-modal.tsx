
import { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Friend = {
  userId: string;
  name: string;
  profilePicture: string;
  status?: string;
};

type Group = {
  groupId: string;
  name: string;
  memberIds: string[];
};

type Props = {
  visible: boolean;
  friends: Friend[];
  groups: Group[];
  participantIds: string[];
  onClose: () => void;
  onInvite: (userIds: string[]) => void;
};

export function InviteParticipantsModal({
  visible,
  friends,
  groups,
  participantIds,
  onClose,
  onInvite,
}: Props) {
  const [activeTab, setActiveTab] = useState<'friends' | 'groups'>('friends');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (visible) {
      setSelectedIds([]);
      setSearchQuery('');
      setActiveTab('friends');
    }
  }, [visible]);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleInvite = () => {
    let invitedUserIds: string[] = [];

    if (activeTab === 'friends') {
      invitedUserIds = selectedIds;
    } else {
      invitedUserIds = groups
        .filter((group) => selectedIds.includes(group.groupId))
        .flatMap((group) => group.memberIds);
    }

    // Remove users already in the session
    invitedUserIds = invitedUserIds.filter(
      (id) => !participantIds.includes(id)
    );

    onInvite([...new Set(invitedUserIds)]);

    setSelectedIds([]);
    setSearchQuery('');
  };

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isAlreadyInvited = (id: string) =>
    participantIds.includes(id);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>

        <View style={styles.modalContainer}>

          {/* TITLE */}
          <Text style={styles.title}>Invite</Text>

          {/* TABS */}
          <View style={styles.tabs}>

            <Pressable
              style={[
                styles.tab,
                styles.friendsTab,
                activeTab === 'friends' && styles.activeFriendsTab,
              ]}
              onPress={() => {
                setActiveTab('friends');
                setSelectedIds([]);
                setSearchQuery('');
              }}
            >
              <Text style={styles.tabText}>Friends</Text>
            </Pressable>

            <Pressable
              style={[
                styles.tab,
                styles.groupsTab,
                activeTab === 'groups' && styles.activeGroupsTab,
              ]}
              onPress={() => {
                setActiveTab('groups');
                setSelectedIds([]);
                setSearchQuery('');
              }}
            >
              <Text style={styles.tabText}>Groups</Text>
            </Pressable>

          </View>

          {/* SEARCH */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {/* SELECTED LABEL */}
          <Text style={styles.selectedLabel}>Selected?</Text>

          {/* FRIENDS LIST */}
          {activeTab === 'friends' && (
            <ScrollView style={styles.list}>

              {filteredFriends.map((friend) => {
                const selected = selectedIds.includes(friend.userId);
                const invited = isAlreadyInvited(friend.userId);

                const status = friend.status?.toLowerCase();

                const statusColor =
                  status === 'offline'
                    ? '#D00000'
                    : status === 'in activity'
                    ? '#FFFF00'
                    : '#92D80F';

                return (
                  <Pressable
                    key={friend.userId}
                    style={styles.listItem}
                    onPress={() =>
                      !invited && toggleSelection(friend.userId)
                    }
                    disabled={invited}
                  >

                    <Image
                      source={{ uri: friend.profilePicture }}
                      style={styles.profileImage}
                    />

                    <View style={styles.nameSection}>
                      <Text style={styles.name}>
                        {friend.name}
                      </Text>

                      <View style={styles.statusRow}>
                        <View
                          style={[
                            styles.statusDot,
                            { backgroundColor: statusColor },
                          ]}
                        />

                        <Text style={styles.statusText}>
                          {invited
                            ? 'In session'
                            : friend.status || 'online'}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={[
                        styles.selectionCircle,
                        selected && styles.selectedCircle,
                        invited && styles.disabledCircle,
                      ]}
                    >
                      {selected && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </View>

                  </Pressable>
                );
              })}

              {filteredFriends.length === 0 && (
                <Text style={styles.emptyText}>
                  No friends found.
                </Text>
              )}

            </ScrollView>
          )}

          {/* GROUPS LIST */}
          {activeTab === 'groups' && (
            <ScrollView style={styles.list}>

              {filteredGroups.map((group) => {
                const selected = selectedIds.includes(group.groupId);

                const allMembersInvited = group.memberIds.every(
                  (id) => participantIds.includes(id)
                );

                return (
                  <Pressable
                    key={group.groupId}
                    style={styles.listItem}
                    onPress={() =>
                      !allMembersInvited &&
                      toggleSelection(group.groupId)
                    }
                    disabled={allMembersInvited}
                  >

                    <View style={styles.groupIcon}>
                      <Text style={styles.groupIconText}>G</Text>
                    </View>

                    <View style={styles.nameSection}>
                      <Text style={styles.name}>
                        {group.name}
                      </Text>

                      <Text style={styles.statusText}>
                        {group.memberIds.length} members
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.selectionCircle,
                        selected && styles.selectedCircle,
                        allMembersInvited && styles.disabledCircle,
                      ]}
                    >
                      {selected && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </View>

                  </Pressable>
                );
              })}

              {filteredGroups.length === 0 && (
                <Text style={styles.emptyText}>
                  No groups found.
                </Text>
              )}

            </ScrollView>
          )}

          {/* BOTTOM BUTTONS */}
          <View style={styles.bottomButtons}>

            <Pressable
              style={styles.closeButton}
              onPress={onClose}
            >
              <Text style={styles.closeText}>X</Text>
            </Pressable>

            <Pressable
              style={[
                styles.inviteButton,
                selectedIds.length === 0 && styles.disabledButton,
              ]}
              onPress={handleInvite}
              disabled={selectedIds.length === 0}
            >
              <Text style={styles.inviteText}>
                Invite Selected!
              </Text>
            </Pressable>

          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: '95%',
    height: '90%',
    backgroundColor: 'white',
    borderWidth: 4,
    borderColor: 'black',
    borderRadius: 24,
    overflow: 'hidden',
  },

  title: {
    height: 55,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    borderBottomWidth: 3,
    borderColor: 'black',
  },

  tabs: {
    height: 65,
    flexDirection: 'row',
  },

  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderColor: 'black',
  },

  friendsTab: {
    backgroundColor: '#92D80F',
    borderRightWidth: 3,
  },

  groupsTab: {
    backgroundColor: '#BD009B',
  },

  activeFriendsTab: {
    borderBottomWidth: 0,
  },

  activeGroupsTab: {
    borderBottomWidth: 0,
  },

  tabText: {
    fontSize: 27,
    fontWeight: 'bold',
    color: 'white',
  },

  searchInput: {
    height: 42,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 25,
    marginHorizontal: 15,
    marginTop: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },

  selectedLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    paddingRight: 15,
    paddingVertical: 5,
  },

  list: {
    flex: 1,
    paddingHorizontal: 12,
  },

  listItem: {
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderColor: 'black',
    paddingHorizontal: 10,
  },

  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'black',
  },

  nameSection: {
    flex: 1,
    marginLeft: 15,
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  statusDot: {
    width: 29,
    height: 29,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'black',
    marginRight: 12,
  },

  statusText: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  selectionCircle: {
    width: 57,
    height: 57,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedCircle: {
    backgroundColor: '#92D80F',
  },

  disabledCircle: {
    backgroundColor: '#DDDDDD',
  },

  checkmark: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  groupIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#BD009B',
    borderWidth: 3,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },

  groupIconText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 18,
  },

  bottomButtons: {
    height: 85,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  closeButton: {
    width: 65,
    height: 65,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeText: {
    fontSize: 35,
  },

  inviteButton: {
    backgroundColor: '#92D80F',
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },

  disabledButton: {
    opacity: 0.5,
  },

  inviteText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});
