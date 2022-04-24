import React, {useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from 'react-native';
import { COLORS, FONTS } from "../constants";
import { Ionicons, FontAwesome } from '@expo/vector-icons'; 
import HorizontalDatePicker from '@logisticinfotech/react-native-horizontal-date-picker';
import { Fontisto } from '@expo/vector-icons';

const HomeScreen = () => {
    const [dateSelected, setDateSelected] = useState();

    //Youtube api: AIzaSyCGlc9DAUTwx_6B4S_91UjTN0msV165keU

    // Search from youtube https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=Hello world in react native&key=AIzaSyCGlc9DAUTwx_6B4S_91UjTN0msV165keU'
 
  

    function renderHeader() {
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

      function onDateSelected(date) {
        setDateSelected(date)
        // setFilteredMatches(fixtures.filter((fixture) => fixture.date === date))
      }
    
      function renderHorizontalDatePicker() {
        return (
          <View style={{
            marginLeft: -20,
            marginRight: -20,
            marginTop: -5
        }}>
          <HorizontalDatePicker 
            pickerType='date'
            isShowYear={false}
            dayFormat={'DD'}
            monthFormat ={'MMM'}
            returnDateFormat={'YYYY-MM-DD'}
            minDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-7)}
            defaultSelected={new Date()}
            datePickerContainerStyle={{
              backgroundColor: COLORS.white,
            }}
            selectedTextStyle={{
              color: COLORS.primary,
            }}
            unSelectedTextStyle={{
              color: '#23395d'
            }}
            onDateSelected={date => onDateSelected(date)}
          /> 
        </View>
        )
      }

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
            {renderHeader()}
            {renderHorizontalDatePicker()}
            {/* {renderMatches()} */}
            <Text>{dateSelected}</Text>
        </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})