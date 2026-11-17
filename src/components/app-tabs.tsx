
import { Tabs } from 'expo-router';
import { Image } from 'react-native';

export default function AppTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        // Always show tab names
        tabBarShowLabel: true,

        // Colours
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#000000',
        tabBarActiveBackgroundColor: '#92D80F',
        tabBarInactiveBackgroundColor: '#FFFFFF',

        // Tab bar appearance
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          height: 85,
          paddingTop: 8,
          paddingBottom: 8,
          borderTopWidth: 7,
          borderTopColor: '#000000',
        },
        // Label appearance
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          color: '#000000',
        },

        // Icon positioning
        tabBarIconStyle: {
          marginTop: 0,
          marginBottom: 0,
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
              style={{
                width: 60,
                height: 60,
                marginTop: 50,
              }}
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
              style={{
                width: 60,
                height: 60,
                marginTop: 30,
              }}
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
              style={{
                width: 80,
                height: 80,
                marginTop: 20,
              }}
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
              style={{
                width: 60,
                height: 60,
                marginTop: 40,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}
