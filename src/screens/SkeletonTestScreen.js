import { View, Text, Animated, StyleSheet } from 'react-native'
import React, {useRef, useEffect} from 'react'
import MaskedView from '@react-native-masked-view/masked-view'
import SkeletonContent from 'react-native-skeleton-content'

const SkeletonTestScreen = () => {
  const opacity = useRef(new Animated.Value(0,3));

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity.current, {
        toValue: 1,
        useNativeDriver: true,
        duration: 500
      }),
      Animated.timing(opacity.current, {
        toValue: 0.3,
        useNativeDriver: true,
        duration: 800
      }),
    ]);
  }, [opacity]);
  return (
    <Animated.View style={[{opacity: opacity.current, height: 200, width: 200}, styles.skeleton]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: 'red',
  }
})


export default SkeletonTestScreen