import React, {useState, useEffect, useContext} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    Image
  } from 'react-native';
import { COLORS, images, icons, SIZES, FONTS } from "../constants";
import HorizontalDatePicker from '@logisticinfotech/react-native-horizontal-date-picker';


const HomeScreen = () => {
    const [dateSelected, setDateSelected] = useState();


    function renderHeader() {
        return (
          <View style={{
            flexDirection: 'row',
            marginTop: 0,
            height: 52,
            marginBottom: 1, 
            backgroundColor: '#212437',
            marginTop: 35
          }}>
            <TouchableOpacity style={{
              width: 50,
              paddingLeft: 10,
              justifyContent: 'center'
            }}
            >
              <Image 
                source={icons.settings}
                style={{
                    resizeMode:'contain',
                    width: 22,
                    height: 22,
                    tintColor: COLORS.white
                }}
              />
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
                }}>Rwanda LiveScore</Text>
              </View>
              
            </View>
    
            <TouchableOpacity style={{
              marginRight: -20,
              width: 50,
              justifyContent: 'center'
            }}>
              <Image 
                source={icons.search}
                style={{
                    resizeMode:'contain',
                    width: 22,
                    height: 22,
                    tintColor: COLORS.white
                }}
              />
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
            minDate={new Date()}
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