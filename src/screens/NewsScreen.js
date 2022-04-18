import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

import { NewsContext } from "../context/NewsContext";

const NewsScreen = () => {
  const { news, isLoading } = useContext(NewsContext);

  console.log(news);

  if (isLoading === true) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator
          // animating={true}
          color="black"
          size="large"
        />
      </View>
    )
  }else {
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          {news.map((newss) => {
            return (
              <Text key={newss.id}>{newss.title}</Text>
            )
          })}
    </View>
    )
  }
}

export default NewsScreen

const styles = StyleSheet.create({})