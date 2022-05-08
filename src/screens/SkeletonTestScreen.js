import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MaskedView from '@react-native-masked-view/masked-view'
import SkeletonContent from 'react-native-skeleton-content'

const SkeletonTestScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Hello Skeleton</Text>
    </View>
  )
}



export default SkeletonTestScreen