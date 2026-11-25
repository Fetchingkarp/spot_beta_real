
import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AppTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarShowLabel: true,

        // Colours
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#000000',
        tabBarActiveBackgroundColor: '#92D80F',
        tabBarInactiveBackgroundColor: '#FFFFFF',

        // Footer appearance
        tabBarStyle: {
          backgroundColor: '#FFFFFF',

          // Base height + Android system navigation area
          height: 85 + insets.bottom,

          // Remove unwanted gap above tab items
          paddingTop: 0,
          paddingBottom: Math.max(insets.bottom, 5),

          borderTopWidth: 7,
          borderTopColor: '#000000',
        },

        // Label appearance
        tabBarLabelStyle: {
          fontSize: 18,
          marginTop: 16,
          fontWeight: '600',
          color: '#000000',
          marginBottom: 0,
        },

        // Icon positioning
        tabBarIconStyle: {
          marginTop: 0,
          marginBottom: 0,
        },

        tabBarItemStyle: {
          paddingTop: 0,
          paddingBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarItemStyle: {
            borderRightWidth: 7,
            borderRightColor: '#000000',
          },
          tabBarIcon: () => (
            <Image
              source={require('@/assets/images/tabIcons/home_icon.png')}
              style={{ width: 50, height: 50, marginTop: 15 }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="logs"
        options={{
          title: 'Logs',
          tabBarItemStyle: {
            borderRightWidth: 7,
            borderRightColor: '#000000',
          },
          tabBarIcon: () => (
            <Image
              source={require('@/assets/images/tabIcons/logs_page_icon.png')}
              style={{ width: 50, height: 50, marginTop: 15 }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="social"
        options={{
          title: 'Social',
          tabBarItemStyle: {
            borderRightWidth: 7,
            borderRightColor: '#000000',
          },
          tabBarIcon: () => (
            <Image
              source={require('@/assets/images/tabIcons/group.png')}
              style={{ width: 80, height: 80, marginTop: 15 }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="pet"
        options={{
          title: 'Pet',
          tabBarIcon: () => (
            <Image
              source={require('@/assets/images/tabIcons/pet_icon.png')}
              style={{ width: 65, height: 65, marginTop: 15 }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}
