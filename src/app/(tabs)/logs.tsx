
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeaderBar } from '@/components/ui/header-bar';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useState } from 'react';

import { LogModal } from '@/components/ui/log_modal';
import { ExerciseLog, getUserById } from '@/data/users';


export default function LogsScreen() {
  const [showLogsTab, setShowLogsTab] = useState(true); // Toggle between Groups and Activities
  const currentUser = getUserById('user001');
  const logs = currentUser?.logs ?? [];

  const [showLogModal, setShowLogModal] = useState(false);
  const [currentLog, setCurrentLog] = useState(logs[0]);

  const openLog = (log: ExerciseLog) => {
    setCurrentLog(log);
    setShowLogModal(true);
  };


  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>

        {/* HEADER - Always accessible */}
        <ThemedView style={styles.headerSection}>
          <HeaderBar />
        </ThemedView>

        {/* MAIN CONTENT AREA */}
        <View style={styles.heroSection}>

          {/* TABS */}
          <ThemedView style={styles.tabHeaderContainer}>
            <Pressable
              style={[
                styles.tabHeader,
                !showLogsTab && styles.selected,
                styles.logsTab
              ]}
              onPress={() => setShowLogsTab(true)}
            >
              <Image
                source={require('@/assets/images/tabIcons/logs_page_icon.png')}
                style={styles.logsTabIcon}
                resizeMode="contain"
              />
            </Pressable>

            <Pressable
              style={[
                styles.tabHeader,
                showLogsTab && styles.selected,
                styles.statsTab
              ]}
              onPress={() => setShowLogsTab(false)}
            >
              <Image
                source={require('@/assets/images/stats.png')}
                style={styles.statsTabIcon}
                resizeMode="contain"
              />
            </Pressable>
          </ThemedView>

          {/* LIST OF LOGS */}
          {showLogsTab && (
            <ScrollView
              style={styles.logsScrollView}
              contentContainerStyle={styles.logsContent}
            >
              {logs.map((log: ExerciseLog) => (
                <Pressable
                  key={log.logId}
                  style={styles.logContainer}
                  onPress={() => openLog(log)}
                >

                  <View style={styles.imageSection}>
                    <Image
                      source={{
                        uri: log.image ??
                          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSltdyesaETmIsYYdxPW3gcpIW0LCkUWaTdcCzKII5VMw&s=10'
                      }}
                      style={styles.logImage}
                      resizeMode="contain"
                    />
                  </View>

                  <View style={styles.logInfo}>

                    <View style={styles.logInfoRow}>
                      <Text style={styles.title}>
                        {log.title}
                      </Text>
                      <Text style={styles.description}>
                        {log.description}
                      </Text>
                    </View>

                    <View style={styles.logInfoRow}>
                      <Text style={styles.activity}>
                        Activity: {log.activity}
                      </Text>                      
                      <Text style={styles.date}>
                        {log.durationMinutes} minutes
                      </Text>
                    </View>

                  </View>
                </Pressable>
              ))}

              {logs.length === 0 && (
                <Text style={styles.emptyLogs}>
                  You're all caught up!
                </Text>
              )}
            </ScrollView>
          )}

          {/* STATS */}
          {!showLogsTab && (
            <View style={styles.statsContainer}>

              {/* WEEKLY STATS CARD */}
              <View style={styles.weeklyStatsCard}>

                {/* HEADER */}
                <View style={styles.statsHeader}>

                  <Text style={styles.statsHeading}>
                    This Week
                  </Text>

                  <View style={styles.statsPeriodContainer}>
                    <Text style={styles.weekButton}>
                      Wk
                    </Text>

                    <Text style={styles.monthButton}>
                      Mth
                    </Text>

                    <Text style={styles.yearButton}>
                      Year
                    </Text>
                  </View>

                </View>

                {/* TOTAL ACTIVITY TIME */}
                <Text style={styles.totalActivityTime}>
                  Total activity time - 5:43 h
                </Text>

                {/* GRAPH IMAGE */}
                <View style={styles.graphContainer}>
                  <Image
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg9jAVXCLs3DfEoWpphsfPV-JmpHL5aZS7N5LdNCT88g&s=10' }}
                    style={styles.graphImage}
                    resizeMode="contain"
                  />
                </View>

              </View>

              {/* ACTIVITY BREAKDOWN */}
              <View style={styles.activityBreakdown}>

                <Text style={styles.breakdownHeading}>
                  Activity Breakdown
                </Text>

                {/* COLOURED BREAKDOWN BAR */}
                <View style={styles.breakdownBar}>
                  <View style={styles.cyclingBar} />
                  <View style={styles.runningBar} />
                  <View style={styles.walkingBar} />
                  <View style={styles.tennisBar} />
                </View>

                {/* LEGEND */}
                <View style={styles.activityLegend}>

                  {/* CYCLING */}
                  <View style={styles.legendItem}>
                    <View style={styles.cyclingColour} />
                    <Text style={styles.legendText}>
                      Cycling
                    </Text>
                  </View>

                  {/* WALKING */}
                  <View style={styles.legendItem}>
                    <View style={styles.walkingColour} />
                    <Text style={styles.legendText}>
                      Walking
                    </Text>
                  </View>

                  {/* RUNNING */}
                  <View style={styles.legendItem}>
                    <View style={styles.runningColour} />
                    <Text style={styles.legendText}>
                      Running
                    </Text>
                  </View>

                  {/* TENNIS */}
                  <View style={styles.legendItem}>
                    <View style={styles.tennisColour} />
                    <Text style={styles.legendText}>
                      Tennis
                    </Text>
                  </View>

                </View>
              </View>

            </View>
          )}

          {/* LOG OVERLAY - Only covers heroSection */}
          {showLogModal && (
            <LogModal
              log={currentLog}
              setClose={() => setShowLogModal(false)}
            />
          )}

        </View>

        {Platform.OS === 'web' && <WebBadge />}

      </SafeAreaView>
    </ThemedView>
  );
}


const styles = StyleSheet.create({

  // GENERAL LAYOUT
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
    alignItems: 'center',
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
  },


  // TABS
  tabHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderTopColor: 'black',
    borderTopWidth: 6,
    borderBottomColor: 'black',
    borderBottomWidth: 6,
  },

  tabHeader: {
    backgroundColor: '#92D80F',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    paddingLeft: 10,
  },

  selected: {
    backgroundColor: '#BD009B',
  },

  logsTab: {
    flex: 12,
    borderRightColor: 'black',
    borderRightWidth: 10,
  },

  statsTab: {
    flex: 23,
  },

  logsTabIcon: {
    width: 60,
    height: 60,
  },

  statsTabIcon: {
    width: 70,
    height: 70,
  },


  // LOG LIST
  logsScrollView: {
    display: 'flex',
    flexDirection: 'column',
    flex: 6,
  },

  logsContent: {
    flexGrow: 1,
    flexDirection: 'column',
  },

  logContainer: {
    flexDirection: 'row',
    width: '100%',
    minHeight: 130,
    borderBottomWidth: 7,
    borderBottomColor: 'black',
  },

  logInfo: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },

    imageSection: {
      width: 150,
      justifyContent: 'center',
      alignItems: 'center',
      borderRightColor: 'black',
      borderRightWidth: 10,
    },

      logImage: {
        width: 110,
        height: 110,
        borderStyle: 'solid',
        borderWidth: 5,
      },

    logInfoRow: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginLeft: 10,
      gap: 20
    },

  title: {
    fontWeight: 'bold',
    fontSize: 30,
  },

  activity: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  description: {
    fontSize: 12,
  },

  date: {
    fontWeight: 'bold',
    fontSize: 17,
  },

  emptyLogs: {

  },


  // STATS CONTAINER
  statsContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 6,
    paddingTop: 8,
    paddingBottom: 5,
    flexDirection: 'column',
    alignItems: 'center',
  },


  // WEEKLY STATS CARD
  weeklyStatsCard: {
    width: '100%',
    flex: 1,
    borderWidth: 5,
    borderColor: 'black',
    borderRadius: 30,
    padding: 8,
    flexDirection: 'column',
    marginBottom: 12,
  },

  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },

  statsHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },

  statsPeriodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  weekButton: {
    backgroundColor: '#45C500',
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    borderRadius: 12,
    paddingHorizontal: 7,
    overflow: 'hidden',
  },

  monthButton: {
    backgroundColor: '#C000A0',
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    borderRadius: 12,
    paddingHorizontal: 7,
    overflow: 'hidden',
  },

  yearButton: {
    backgroundColor: '#C000A0',
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    borderRadius: 12,
    paddingHorizontal: 7,
    overflow: 'hidden',
  },

  totalActivityTime: {
    fontSize: 18,
    color: 'black',
    marginBottom: 14,
  },


  // GRAPH
  graphContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#DDF7E5',
    borderWidth: 1,
    borderColor: '#888888',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  graphImage: {
    width: '100%',
    height: '100%',
  },


  // ACTIVITY BREAKDOWN
  activityBreakdown: {
    width: '100%',
    flexDirection: 'column',
  },

  breakdownHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },

  breakdownBar: {
    width: '100%',
    height: 37,
    flexDirection: 'row',
    borderWidth: 5,
    borderColor: 'black',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },

  cyclingBar: {
    flex: 1,
    backgroundColor: '#45C500',
  },

  runningBar: {
    flex: 1,
    backgroundColor: '#0800C9',
  },

  walkingBar: {
    flex: 1,
    backgroundColor: '#FFBE4F',
  },

  tennisBar: {
    flex: 0.4,
    backgroundColor: '#C000A0',
  },


  // ACTIVITY LEGEND
  activityLegend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },

  legendItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  cyclingColour: {
    width: 24,
    height: 24,
    backgroundColor: '#45C500',
    marginRight: 7,
  },

  walkingColour: {
    width: 24,
    height: 24,
    backgroundColor: '#FFBE4F',
    marginRight: 7,
  },

  runningColour: {
    width: 24,
    height: 24,
    backgroundColor: '#0800C9',
    marginRight: 7,
  },

  tennisColour: {
    width: 24,
    height: 24,
    backgroundColor: '#C000A0',
    marginRight: 7,
  },

  legendText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black',
  },

});
