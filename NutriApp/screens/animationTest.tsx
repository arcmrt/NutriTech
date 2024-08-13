import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const AnimatedBoxes = () => {
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  let randomDelay = Math.floor(Math.random() * 1000);

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(translateYAnim, {
              toValue: 200,
              duration: 600,
              useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
              toValue: 0,
              duration: 800,
              useNativeDriver: true,
            }),
          ]),//bounce
          Animated.sequence([
            Animated.timing(rotateAnim, {
              toValue: 1,
              duration: 1300,
              useNativeDriver: true,
            }),// rotation
            Animated.timing(rotateAnim, {
              toValue: 0,
              duration: 1300,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(scaleAnim, {
              toValue: 1.2,
              duration: 650,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 650,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ).start();
    };

    animate();
  }, [translateYAnim, rotateAnim, scaleAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          styles.box1,
          {
            transform: [
              { translateY: translateYAnim },
              { rotate: rotation },
              { scale: scaleAnim },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.box,
          styles.box2,
          {
            transform: [
              { translateY: translateYAnim },
              { rotate: rotation },
              { scale: scaleAnim },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.box,
          styles.box3,
          {
            transform: [
              { translateY: translateYAnim },
              { rotate: rotation },
              { scale: scaleAnim },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.box,
          styles.box4,
          {
            transform: [
              { translateY: translateYAnim },
              { rotate: rotation },
              { scale: scaleAnim },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: '#3498db',
    borderRadius: 12, 
  },
  box1: {
    backgroundColor: '#808085',
  },
  box2: {
    backgroundColor: '#AEA6A3',
  },
  box3: {
    backgroundColor: '#E4D0E4',
  },
  box4: {
    backgroundColor: '#9b59b6',
  },
});

export default AnimatedBoxes;
