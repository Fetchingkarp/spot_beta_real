
import { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { PetBubble } from '@/components/pet-bubble';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';

import {
  getUserById,
  getUserFriends,
  getUserGroups,
} from '@/data/users';

import { useRouter } from 'expo-router';

import { InviteFriendsModal } from '@/components/invite-friends-modal';
import { InviteGroupsModal } from '@/components/invite-groups-modal';
import { InviteParticipantsModal } from '@/components/invite-participants-modal';

export default function GroupActivity() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);

  // Exercise statistics
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);

  const router = useRouter();

  // Current logged-in user (temporary prototype ID)
  const CURRENT_USER_ID = 'user001';

  // Invitation modal state
  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const [showGroupsModal, setShowGroupsModal] = useState(false);
  const [showActivityInviteModal, setShowActivityInviteModal] = useState(false);

  // Current session participants
  const [currentParticipantIds, setCurrentParticipantIds] =
    useState<string[]>([CURRENT_USER_ID]);

  // Get friends and groups belonging to the current user
  const friends = getUserFriends(CURRENT_USER_ID);
  const groups = getUserGroups(CURRENT_USER_ID);

  // Convert participant IDs into user objects
  const currentParticipants = currentParticipantIds
    .map((id) => getUserById(id))
    .filter((user) => user !== undefined);

  // Timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 10);
      }, 10);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  // Open friends modal
  const openFriendsModal = () => {
    setShowFriendsModal(true);
  };

  // Open groups modal
  const openGroupsModal = () => {
    setShowGroupsModal(true);
  };

  // Add invited users to the session
  const addParticipants = (userIds: string[]) => {
    setCurrentParticipantIds((prev) => [
      ...new Set([...prev, ...userIds]),
    ]);
  };

  // Invite selected friends
  const inviteSelectedFriends = (selectedIds: string[]) => {
    addParticipants(selectedIds);
    setShowFriendsModal(false);
  };

  // Invite selected groups
  const inviteSelectedGroups = (selectedGroupIds: string[]) => {
    const invitedMemberIds = groups
      .filter((group) => selectedGroupIds.includes(group.groupId))
      .flatMap((group) => group.memberIds);

    addParticipants(invitedMemberIds);
    setShowGroupsModal(false);
  };

  const inviteActivityParticipants = (userIds: string[]) => {
    addParticipants(userIds);
    setShowActivityInviteModal(false);
  };

  // Pet interaction
  const handlePetTap = () => {
    if (!sessionStarted || !isRunning) return;

    setSteps((prev) => prev + 10);

    setDistance((prev) =>
      Number((prev + 0.01).toFixed(2))
    );
  };

  // Format timer
  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);

    return (
      `${String(minutes).padStart(2, '0')} : ` +
      `${String(seconds).padStart(2, '0')} : ` +
      `${String(ms).padStart(2, '0')}`
    );
  };

  // Start session
  const handleStartSession = () => {
    console.log('start session');

    setTimer(0);
    setSteps(0);
    setDistance(0);

    setSessionStarted(true);
    setIsRunning(true);
  };

  // Stop session
  const handleStopSession = () => {
    console.log('ending session');

    const experienceGained = (steps / 100) + (distance * 40);

    setIsRunning(false);

    router.push({
      pathname: '/session_results',
      params: {
        experience: experienceGained.toString(),
      },
    });
  };

  return (
    <ThemedView style={styles.container}>

      {/* TOP HALF */}
      <ThemedView style={styles.topSection}>

        {/* Timer */}
        <ThemedView style={styles.timerSection}>
          <Text style={styles.timerText}>
            {formatTime(timer)}
          </Text>
        </ThemedView>

        {/* Pet */}
        <ThemedView style={styles.petBubbleSection}>
          <Pressable
            onPress={handlePetTap}
            style={styles.petBubblePressable}
          >
            <PetBubble animState="exercising" />
          </Pressable>
        </ThemedView>

      </ThemedView>

      {/* BLACK DIVIDER */}
      <ThemedView style={styles.divider} />

      {/* BOTTOM HALF */}

      {/* BEGIN SCREEN */}
      {!sessionStarted && (
        <View style={styles.bottomSection}>

          {/* Social Features */}
          <View style={styles.socialSection}>

            {/* Invite Buttons */}
            <View style={styles.inviteButtons}>

              {/* Invite Friends */}
              <View style={styles.inviteButtonContainer}>
                <Text style={styles.inviteTitle}>
                  Invite Friends
                </Text>

                <Pressable
                  style={styles.inviteButton}
                  onPress={openFriendsModal}
                >
                  <Text style={styles.plusText}>+</Text>

                  <Image
                    source={require('@/assets/images/friends_icon_3.png')}
                    style={styles.friendsIcon}
                    resizeMode="contain"
                  />
                </Pressable>
              </View>

              {/* Invite Groups */}
              <View style={styles.inviteButtonContainer}>
                <Text style={styles.inviteTitle}>
                  Invite Group
                </Text>

                <Pressable
                  style={styles.inviteButton}
                  onPress={openGroupsModal}
                >
                  <Text style={styles.plusText}>+</Text>

                  <Image
                    source={require('@/assets/images/tabIcons/group.png')}
                    style={styles.groupsIcon}
                    resizeMode="contain"
                  />
                </Pressable>
              </View>

            </View>

            {/* Current Participants */}
            <View style={styles.participantsContainer}>

              <Text style={styles.participantsTitle}>
                Current Participants
              </Text>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.participantsList}
              >
                {currentParticipants.map((user) => (
                  <View
                    key={user.userId}
                    style={styles.participantItem}
                  >
                    <Image
                      source={{ uri: user.profilePicture }}
                      style={styles.participantImage}
                    />

                    <Text style={styles.participantName}>
                      {user.name}
                    </Text>
                  </View>
                ))}
              </ScrollView>

            </View>
          </View>

          {/* Begin Button */}
          <View style={styles.beginSection}>
            <Pressable
              style={styles.beginButton}
              onPress={handleStartSession}
            >
              <Text style={styles.beginText}>
                BEGIN
              </Text>
            </Pressable>
          </View>

        </View>
      )}


      {/* IN-ACTIVITY SCREEN */}
      {sessionStarted && (
        <View style={styles.bottomSection}>

          {/* PARTICIPANTS AND STATISTICS */}
          <View style={styles.activityInfoSection}>

            {/* PARTICIPANTS */}
            <View style={styles.activityParticipantsSection}>

              <Text style={styles.activityParticipantsTitle}>
                Participants
              </Text>

              <View style={styles.activityParticipantsList}>

                {/* ADD PARTICIPANTS BUTTON */}
                <Pressable
                  style={styles.addParticipantButton}
                  onPress={() => setShowActivityInviteModal(true)}
                >
                  <Text style={styles.addParticipantText}>+</Text>
                </Pressable>

                {/* PARTICIPANT IMAGES */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.activityParticipantImages}
                >
                  {currentParticipants.map((user) => (
                    <View
                      key={user.userId}
                      style={styles.activityParticipantItem}
                    >
                      <Image
                        source={{ uri: user.profilePicture }}
                        style={styles.activityParticipantImage}
                      />
                    </View>
                  ))}
                </ScrollView>

              </View>

            </View>

            {/* STATISTIC BOXES */}
            <View style={styles.activityStatsSection}>

              {/* STEPS */}
              <View style={styles.activityInfoBox}>

                <Image
                  source={require('@/assets/images/steps.png')}
                  style={styles.activityStatIcon}
                  resizeMode="contain"
                />

                <Text style={styles.activityInfoText}>
                  {steps}
                </Text>

              </View>

              {/* DISTANCE */}
              <View style={styles.activityInfoBox}>

                <Image
                  source={require('@/assets/images/distance.png')}
                  style={styles.activityStatIcon}
                  resizeMode="contain"
                />

                <Text style={styles.activityInfoText}>
                  {distance.toFixed(2)} km
                </Text>

              </View>

            </View>

          </View>

          {/* PLAY / PAUSE / STOP */}
          <View style={styles.playSection}>

            {isRunning ? (
              <Pressable onPress={() => setIsRunning(false)}>
                <Image
                  source={require('@/assets/images/pause.png')}
                  style={styles.activityControlIcon}
                  resizeMode="contain"
                />
              </Pressable>
            ) : (
              <Pressable onPress={() => setIsRunning(true)}>
                <Image
                  source={require('@/assets/images/play.png')}
                  style={styles.activityControlIcon}
                  resizeMode="contain"
                />
              </Pressable>
            )}

            <Pressable onPress={handleStopSession}>
              <Image
                source={require('@/assets/images/stop_session.png')}
                style={styles.activityControlIcon}
                resizeMode="contain"
              />
            </Pressable>

          </View>

        </View>
      )}

      {/* INVITE FRIENDS MODAL */}
      <InviteFriendsModal
        visible={showFriendsModal}
        friends={friends}
        participantIds={currentParticipantIds}
        onClose={() => setShowFriendsModal(false)}
        onInvite={inviteSelectedFriends}
      />

      {/* INVITE GROUPS MODAL */}
      <InviteGroupsModal
        visible={showGroupsModal}
        groups={groups}
        participantIds={currentParticipantIds}
        onClose={() => setShowGroupsModal(false)}
        onInvite={inviteSelectedGroups}
      />

      <InviteParticipantsModal
        visible={showActivityInviteModal}
        friends={friends}
        groups={groups}
        participantIds={currentParticipantIds}
        onClose={() => setShowActivityInviteModal(false)}
        onInvite={inviteActivityParticipants}
      />

      {/* WEB BADGE */}
      {Platform.OS === 'web' && <WebBadge />}

    </ThemedView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
  },

  // TOP HALF
  topSection: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  timerSection: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  timerText: {
    fontSize: 60,
    fontWeight: 'bold',
  },

  petBubbleSection: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  petBubblePressable: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // DIVIDER
  divider: {
    height: 10,
    width: '100%',
    backgroundColor: 'black',
  },

  // BOTTOM HALF
  bottomSection: {
    flex: 1,
    width: '100%',
    backgroundColor: '#92D80F',
  },

  // SOCIAL SECTION
  socialSection: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 15,
    justifyContent: 'center',
  },

  // INVITE BUTTONS
  inviteButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  inviteButtonContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inviteTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 5,
  },

  inviteButton: {
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 5,
    borderRadius: 40,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    height: '75%',
    width: '85%',
  },

  plusText: {
    fontWeight: 'bold',
    fontSize: 50,
  },

  friendsIcon: {
    width: 60,
    height: 60,
  },

  groupsIcon: {
    width: 75,
    height: 75,
  },

  // PARTICIPANTS
  participantsContainer: {
    flex: 1,
    width: '100%',
    paddingTop: 5,
    paddingHorizontal: 5,
  },

  participantsTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },

  participantsList: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 15,
    paddingHorizontal: 5,
  },

  participantItem: {
    alignItems: 'center',
    width: 70,
  },

  participantImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'black',
  },

  participantName: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },

  // BEGIN BUTTON
  beginSection: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },

  beginButton: {
    flex: 1,
    width: '80%',
    height: '80%',
    backgroundColor: '#BD009B',
    borderWidth: 5,
    borderColor: 'black',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  beginText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },

  // PLAY / PAUSE / STOP
  playSection: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    flexDirection: 'row',
  },

  activityControlIcon: {
    width: 170,
    height: 170,
  },

  
  // IN-ACTIVITY PARTICIPANTS AND STATISTICS

  activityInfoSection: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 5,
  },

  activityParticipantsSection: {
    flex: 1,
    justifyContent: 'flex-start',
  },

  activityParticipantsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginLeft: 15,
    marginBottom: 10,
  },

  activityParticipantsList: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  addParticipantButton: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  addParticipantText: {
    fontSize: 45,
    fontWeight: 'bold',
    lineHeight: 50,
  },

  activityParticipantImages: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    alignItems: 'flex-start',
  },

  activityParticipantItem: {
    marginRight: 5,
  },

  activityParticipantImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'black',
  },

  // STATISTIC BOXES

  activityStatsSection: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingLeft: 5,
  },

  activityInfoBox: {
    width: '100%',
    height: '35%',
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  activityStatIcon: {
    width: 45,
    height: 45,
  },

  activityInfoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },

});
