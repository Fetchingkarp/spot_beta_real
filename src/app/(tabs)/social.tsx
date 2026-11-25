import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeaderBar } from '@/components/ui/header-bar';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import { getUserById, Group } from '@/data/users';

import { GroupModal } from '@/components/group-modal';

// Hard-coded activity avatar
function ActivityAvatar({ color }: { color: string }) {
  return (
    <View style={[styles.activityAvatar, { backgroundColor: color }]}>
      <View style={styles.avatarHead} />
      <View style={styles.avatarBody} />
    </View>
  );
}

// Hard-coded activity row
function ActivityRow({
  name,
  colors,
  status,
}: {
  name: string;
  colors: string[];
  status: string;
}) {
  return (
    <View style={styles.activityRow}>
      <View style={styles.activityTopRow}>
        <Text style={styles.activityName}>{name}</Text>

        <View style={styles.activityAvatars}>
          {colors.map((color, index) => (
            <ActivityAvatar key={index} color={color} />
          ))}
        </View>
      </View>

      <View style={styles.activityBottomRow}>
        <Text style={styles.activityStatus}>{status}</Text>

        <Pressable style={styles.joinButton}>
          <Text style={styles.joinButtonText}>JOIN</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function SocialScreen() {
  const [showGroupsTab, setShowGroupsTab] = useState(true);       // Toggle between Groups and Activities
  const currentUser = getUserById('user001');
  const groups = currentUser?.groups ?? [];

  const [showGroupModal, setShowGroupModal] = useState(false);
  const [currentGroup, setCurrentGroup] = useState<Group | undefined>(undefined);
  
  const openGroup = (group: Group) => {
    setCurrentGroup(group)
    setShowGroupModal(true)
  }

  useFocusEffect(
    useCallback(() => {
      setShowGroupModal(false);
      setCurrentGroup(undefined);
    }, [])
  );

  return (  
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.headerSection}>
          <HeaderBar></HeaderBar>
        </ThemedView>

        <View style={styles.heroSection}>
          <View style={styles.tabHeaderContainer}>
            <Pressable style={[styles.tabHeader, !showGroupsTab && styles.unselected, {borderRightColor: 'black', borderRightWidth: 4}]}
            onPress={() => setShowGroupsTab(true)}>
              <Text style={{fontWeight: 'bold', fontSize: 30}}>Groups</Text>
            </Pressable>
            <Pressable style={[styles.tabHeader, showGroupsTab && styles.unselected, {borderLeftColor: 'black', borderLeftWidth: 4}]}
            onPress={() => setShowGroupsTab(false)}>
              <Text style={{fontWeight: 'bold', fontSize: 30}}>Activities</Text>
            </Pressable>
          </View>
            
          {/**LIST OF GROUPS */}
          {showGroupsTab && <ScrollView 
            style={styles.groupsScrollView}
            contentContainerStyle={styles.groupsContent}>
              {groups.map((group: Group) => (
                <Pressable
                  key={group.groupId}
                  style={styles.groupContainer}
                  onPress={() => openGroup(group)}
                >

                  {/* Image */}
                  <View style={styles.imageSection}>
                    <Image
                      source={{
                        uri: group.image ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSltdyesaETmIsYYdxPW3gcpIW0LCkUWaTdcCzKII5VMw&s=10'
                      }}
                      style={styles.groupImage}
                      resizeMode="contain"
                    />
                  </View>

                  {/* RIGHT: Name, Members, Options, Capacity */}
                  <View style={styles.groupInfo}>
                    
                    <View style={styles.groupInfoColumn}> 
                      {/* MEMBERS */}
                      <View>

                      </View>

                      {/* TITLE */}
                      <Text style={{fontWeight: 'bold', fontSize: 25}}>
                        {group.name}
                      </Text>
                    </View>
                      
                    <View style={styles.groupInfoColumn}>
                      {/* Options */}
                      <Image>

                      </Image>
                      {/* Capacity */}
                      <Text>
                      </Text>
                    </View>      
                  </View>

                </Pressable>

              ))}
          </ScrollView>}
          {/** LIST OF ACTIVITIES */}
          {!showGroupsTab && (
            <ScrollView
              style={styles.activitiesScrollView}
              contentContainerStyle={styles.activitiesContent}
            >

              {/* PENDING INVITES */}
              <View style={styles.pendingSection}>

                <Text style={styles.pendingTitle}>
                  Pending Invites
                </Text>

                <ActivityRow
                  name="[NAME]"
                  colors={['#69D600', '#BD009B', '#00C9C9']}
                  status="[Waiting to begin]"
                />

              </View>

              {/* ACTIVE ACTIVITIES */}
              <View style={styles.activeSection}>

                <ActivityRow
                  name="[NAME]"
                  colors={['#69D600', '#D00000', '#D6C000']}
                  status="Active - XX : XX"
                />

                <ActivityRow
                  name="[NAME]"
                  colors={['#69D600', '#BD009B', '#00C9C9']}
                  status="Active - XX : XX"
                />

                <ActivityRow
                  name="[NAME]"
                  colors={['#69D600', '#D00000', '#D6C000']}
                  status="Active - XX : XX"
                />

              </View>

            </ScrollView>
          )}

          {/* *New Group + Button
          <NewGroup></NewGroup> */}

          {showGroupModal && <GroupModal setClose={() => setShowGroupModal(false)} group={currentGroup}>
            
          </GroupModal>}

        </View>

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.three,
    maxWidth: MaxContentWidth,
  },
  headerSection: {
    alignItems: 'center',
    width: '100%',
    height: '12%',
  },
  heroSection: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  tabHeaderContainer: {
    height: '15%',
    width: '100%',
    flexDirection: 'row',
    flexShrink: 0,
    borderTopColor: 'black',
    borderTopWidth: 6,
  },
  tabHeader: {
    flex: 1,
    backgroundColor: '#92D80F',
    
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',

    paddingBottom: 10,
    paddingLeft: 10
  },
  unselected: {
    backgroundColor: '#BD009B',
    borderBottomColor: 'black',
    borderBottomWidth: 8,
  },

  groupsScrollView: {
    flex: 6,
    width: '100%',
  },
    groupsContent: {
      flexGrow: 1,
      flexDirection: 'column',
    }, 
      groupContainer: {
        flexDirection: 'row',
        width: '100%',
        minHeight: 130,
        borderBottomWidth: 7,
        borderBottomColor: 'black',
      },  
        imageSection: {
          width: 100,
          justifyContent: 'center',
          alignItems: 'center',
        },
          groupImage: {
            width: 80,
            height: 80,
            borderStyle: 'solid',
            borderWidth: 5
          },
          groupInfo: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 15,
          },
            groupInfoColumn: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginBottom: 10
            },

      // ACTIVITIES TAB

      activitiesScrollView: {
        flex: 6,
        width: '100%',
      },

      activitiesContent: {
        flexGrow: 1,
        flexDirection: 'column',
      },

      // PENDING INVITES

      pendingSection: {
        width: '100%',
      },

      pendingTitle: {
        color: '#BD009B',
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 6,
        paddingVertical: 5,
        borderBottomWidth: 5,
        borderBottomColor: 'black',
      },

      // ACTIVE ACTIVITIES

      activeSection: {
        width: '100%',
      },

      activityRow: {
        width: '100%',
        minHeight: 85,
        borderBottomWidth: 5,
        borderBottomColor: 'black',
        paddingHorizontal: 12,
        paddingVertical: 7,
        justifyContent: 'space-between',
      },

      activityTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },

      activityName: {
        fontSize: 20,
        fontWeight: 'bold',
      },

      activityAvatars: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        marginRight: '22%',
      },

      activityAvatar: {
        width: 32,
        height: 32,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
      },

      avatarHead: {
        width: 11,
        height: 11,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: 'black',
        position: 'absolute',
        top: 4,
      },

      avatarBody: {
        width: 17,
        height: 11,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 1.5,
        borderBottomWidth: 0,
        borderColor: 'black',
        position: 'absolute',
        bottom: 3,
      },

      activityBottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 12,
      },

      activityStatus: {
        fontSize: 19,
        fontWeight: 'bold',
      },

      joinButton: {
        backgroundColor: '#BD009B',
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 2,
        minWidth: 78,
        alignItems: 'center',
      },

      joinButtonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
      },

      // NEW SESSION

      newSessionContainer: {
        width: '100%',
        alignItems: 'flex-end',
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 10,
      },

      newSessionButton: {
        width: 90,
        height: 90,
        borderRadius: 50,
        backgroundColor: '#92D80F',
        borderWidth: 4,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      },

      newSessionPlus: {
        color: 'white',
        fontSize: 85,
        fontWeight: 'bold',
        lineHeight: 90,
        textAlign: 'center',
        includeFontPadding: false,
      },

      newSessionText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
      },        
});
