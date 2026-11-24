
import { useState } from 'react';
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

import { Group } from '@/data/users';

type Props = {
  visible: boolean;
  groups: Group[];
  participantIds: string[];
  onClose: () => void;
  onInvite: (groupIds: string[]) => void;
};

export function InviteGroupsModal({
  visible,
  groups,
  participantIds,
  onClose,
  onInvite,
}: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const closeModal = () => {
    setSearchQuery('');
    setSelectedIds([]);
    onClose();
  };

  const toggleSelection = (groupId: string) => {
    setSelectedIds((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleInvite = () => {
    onInvite(selectedIds);
    closeModal();
  };

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>

          {/* Title */}
          <Text style={styles.title}>
            Invite Groups!
          </Text>

          {/* Search */}
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>⌕</Text>

            <TextInput
              style={styles.searchInput}
              placeholder="Search groups..."
              placeholderTextColor="black"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Selected heading */}
          <Text style={styles.selectedHeading}>
            Selected?
          </Text>

          {/* Groups */}
          <ScrollView
            style={styles.list}
            showsVerticalScrollIndicator={false}
          >
            {filteredGroups.map((group) => {
              const selected = selectedIds.includes(group.groupId);

              const allMembersInvited = group.memberIds.every(
                (id) => participantIds.includes(id)
              );

              return (
                <Pressable
                  key={group.groupId}
                  style={styles.userRow}
                  onPress={() => {
                    if (!allMembersInvited) {
                      toggleSelection(group.groupId);
                    }
                  }}
                >
                  {group.image ? (
                    <Image
                      source={{ uri: group.image }}
                      style={styles.profileImage}
                    />
                  ) : (
                    <View style={styles.groupPlaceholder}>
                      <Text style={styles.groupPlaceholderText}>
                        👥
                      </Text>
                    </View>
                  )}

                  <View style={styles.groupInfo}>
                    <Text style={styles.userName}>
                      {group.name}
                    </Text>

                    <Text style={styles.memberCount}>
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
                    {(selected || allMembersInvited) && (
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

          {/* Footer */}
          <View style={styles.footer}>
            <Pressable
              style={styles.closeButton}
              onPress={closeModal}
            >
            <Image
              style={styles.closeImage}
              source={require('@/assets/images/exit.png')}
            />
            </Pressable>

            <Pressable
              style={[
                styles.inviteButton,
                selectedIds.length === 0 && styles.inviteButtonDisabled,
              ]}
              onPress={handleInvite}
              disabled={selectedIds.length === 0}
            >
              <Text style={styles.inviteButtonText}>
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
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    width: '95%',
    height: '85%',
    backgroundColor: 'white',
    borderWidth: 4,
    borderColor: 'black',
    borderRadius: 25,
    padding: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },

  searchContainer: {
    height: 50,
    width: '100%',
    backgroundColor: '#92D80F',
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  searchIcon: {
    fontSize: 35,
    fontWeight: 'bold',
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    paddingHorizontal: 8,
  },

  selectedHeading: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 12,
    marginBottom: 5,
  },

  list: {
    flex: 1,
    width: '100%',
  },

  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 85,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },

  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'black',
    backgroundColor: '#92D80F',
  },

  groupPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'black',
    backgroundColor: '#92D80F',
    justifyContent: 'center',
    alignItems: 'center',
  },

  groupPlaceholderText: {
    fontSize: 25,
  },

  groupInfo: {
    flex: 1,
  },

  userName: {
    fontSize: 19,
    fontWeight: 'bold',
    marginLeft: 15,
  },

  memberCount: {
    fontSize: 13,
    color: '#666',
    marginLeft: 15,
  },

  selectionCircle: {
    width: 55,
    height: 55,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  selectedCircle: {
    backgroundColor: '#92D80F',
  },

  disabledCircle: {
    backgroundColor: '#BBBBBB',
  },

  checkmark: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
    fontWeight: 'bold',
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
  },

  closeButton: {
    width: 70,
    height: 70,
  },
    closeImage: {
      height: 90,
      width: 100,
    },

  inviteButton: {
    backgroundColor: '#92D80F',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  inviteButtonDisabled: {
    opacity: 0.5,
  },

  inviteButtonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
});
