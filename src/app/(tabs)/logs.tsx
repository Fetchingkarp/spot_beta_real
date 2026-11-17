import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeaderBar } from '@/components/ui/header-bar';
import { Image, Pressable } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useState } from 'react';


export default function LogsScreen() {
  const [showLogsTab, setShowLogsTab] = useState(true);       // Toggle between Groups and Activities
  return (  
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.headerSection}>
          <HeaderBar></HeaderBar>
        </ThemedView>

        <ThemedView style={styles.heroSection}>
          <ThemedView style={styles.tabHeaderContainer}>
            <Pressable style={[styles.tabHeader, !showLogsTab && styles.selected]}
            onPress={() => setShowLogsTab(true)}>
              <Image
                source={require('@/assets/images/tabIcons/logs_page_icon.png')}
                style={{
                  width: 60,
                  height: 60,
                }}
                resizeMode="contain"
              />
            </Pressable>
            <Pressable style={[styles.tabHeader, showLogsTab && styles.selected]}
            onPress={() => setShowLogsTab(false)}>
              <Image
                source={require('@/assets/images/stats.png')}
                style={{
                  width: 70,
                  height: 70,
                }}
                resizeMode="contain"
              />
            </Pressable>
          </ThemedView>
            
          {/**LIST OF LOGS */}
          {showLogsTab && <ThemedView style={[styles.listContainer]}> 
            
          
          </ThemedView>}
          {/**STATS */}    
          {!showLogsTab && <ThemedView style={[styles.listContainer]}> 
            
          
          </ThemedView>}

          {/* *New Group + Button
          <NewGroup></NewGroup> */}

        </ThemedView>

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
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  headerSection: {
    alignItems: 'center',
    width: '100%',
    height: '12%',
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },

  tabHeaderContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',

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
  selected: {
    backgroundColor: '#BD009B'
  },

  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 6,
  },
});
