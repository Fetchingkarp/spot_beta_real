
import React from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

export const Colors = {
  green: '#92D80F',
  pink: '#C000A0',
  black: '#000000',
  white: '#FFFFFF',
  red: '#FF0000',
};

export function AuthBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View style={styles.outer}>
      <SafeAreaView style={styles.canvas}>
        {/* Decorative circles */}
        <View style={[styles.circle, styles.pinkTop]} />
        <View style={[styles.circle, styles.pinkTopRight]} />
        <View style={[styles.circle, styles.greenLeft]} />
        <View style={[styles.circle, styles.pinkMiddleRight]} />
        <View style={[styles.circle, styles.greenBottomRight]} />
        <View style={[styles.circle, styles.pinkBottomLeft]} />

        <View style={styles.content}>
          {children}
        </View>
      </SafeAreaView>
    </View>
  );
}

export function AuthButton({
  title,
  onPress,
  style,
  textStyle,
}: {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && { opacity: 0.75 },
      ]}
    >
      <Text style={[styles.buttonText, textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: Colors.black,
    alignItems: 'center',
  },

  canvas: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },

  content: {
    flex: 1,
    zIndex: 2,
  },

  circle: {
    position: 'absolute',
    borderRadius: 1000,
    zIndex: 0,
  },

  pinkTop: {
    width: 105,
    height: 105,
    backgroundColor: Colors.pink,
    top: -75,
    left: '7%',
  },

  pinkTopRight: {
    width: 105,
    height: 105,
    backgroundColor: Colors.pink,
    top: -35,
    right: -45,
  },

  greenLeft: {
    width: 115,
    height: 115,
    backgroundColor: Colors.green,
    top: '9%',
    left: -75,
  },

  pinkMiddleRight: {
    width: 115,
    height: 115,
    backgroundColor: Colors.pink,
    top: '33%',
    right: -65,
  },

  greenBottomRight: {
    width: 105,
    height: 105,
    backgroundColor: Colors.green,
    top: '49%',
    right: -75,
  },

  pinkBottomLeft: {
    width: 110,
    height: 110,
    backgroundColor: Colors.pink,
    bottom: '15%',
    left: -75,
  },

  button: {
    backgroundColor: Colors.green,
    borderWidth: 3,
    borderColor: Colors.black,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },

  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
  },
});
