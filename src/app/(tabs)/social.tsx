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
                    {/**LIST OF LOGS */}
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
          {/**LIST OF ACTIVITIES */}    
          {!showGroupsTab && <ThemedView> 
            
          
          </ThemedView>}

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
            }


});
