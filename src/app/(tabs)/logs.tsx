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
  const [showLogsTab, setShowLogsTab] = useState(true);       // Toggle between Groups and Activities
  const currentUser = getUserById('user001');
  const logs = currentUser?.logs ?? [];

  const [showLogModal, setShowLogModal] = useState(false);
  const [currentLog, setCurrentLog] = useState(logs[0]);

  const openLog = (log: ExerciseLog) => {
    setCurrentLog(log)
    setShowLogModal(true)
  }


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
                {
                  flex: 12,
                  borderRightColor: 'black',
                  borderRightWidth: 10
                }
              ]}
              onPress={() => setShowLogsTab(true)}
            >
              <Image
                source={require('@/assets/images/tabIcons/logs_page_icon.png')}
                style={{ width: 60, height: 60 }}
                resizeMode="contain"
              />
            </Pressable>

            <Pressable
              style={[
                styles.tabHeader,
                showLogsTab && styles.selected,
                { flex: 23 }
              ]}
              onPress={() => setShowLogsTab(false)}
            >
              <Image
                source={require('@/assets/images/stats.png')}
                style={{ width: 70, height: 70 }}
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

                    <View style={styles.logInfoColumn}>
                      <Text style={styles.title}>
                        {log.title}
                      </Text>

                      <Text style={styles.activity}>
                        Activity: {log.activity}
                      </Text>
                    </View>

                    <View style={styles.logInfoColumn}>
                      <Text style={styles.description}>
                        {log.description}
                      </Text>

                      <Text style={styles.date}>
                        {log.date}
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
            <ThemedView style={styles.logContainer}>
            </ThemedView>
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
    paddingLeft: 10
  },
  selected: {
    backgroundColor: '#BD009B'
  },

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
      flexDirection: 'row'
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
        borderWidth: 5
      },

      logInfoColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 15,
      },
        title: {
          fontWeight: 'bold',
          fontSize: 30,
        },
        activity: {
          fontWeight: 'bold',
          fontSize: 14
        },
      
        description: {
          fontSize: 12,
        },
        date: {
          fontWeight: 'bold',
          fontSize: 17,
        },
  emptyLogs: {

  }
});
