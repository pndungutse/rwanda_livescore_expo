import React, {useState, useEffect, useContext} from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator, SectionList } from "react-native";
import { COLORS, FONTS } from "../constants";
import { Ionicons, FontAwesome } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons';



const HomeScreen = ({navigation}) => {


    return ( 
            <View style={{
                flexDirection: 'row',
                marginTop: 0,
                height: 52,
                marginBottom: 1, 
                backgroundColor: '#212437',
                marginTop: 30
              }}>
                <TouchableOpacity style={{
                  width: 50,
                  paddingLeft: 10,
                  justifyContent: 'center'
                }}
                >
                  <Fontisto name="nav-icon-a" size={18} color="#fff" />
                </TouchableOpacity>
                <View style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <View style={{
                    width: '70%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 15
                  }}>
                    <Text style={{
                      color: COLORS.white,
                      ...FONTS.h4
                    }}>Rwanda Livescore</Text>
                  </View>
                  
                </View>
        
                <TouchableOpacity style={{
                  marginRight: -20,
                  width: 50,
                  justifyContent: 'center'
                }}>
                  <Ionicons name="search" size={25} color="#fff" />
                </TouchableOpacity>
              </View> 
    )

}
export default HomeScreen
