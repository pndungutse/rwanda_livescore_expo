import React, {useState, useEffect, useContext} from 'react';
import Header from '../components/Header'
import moment from 'moment';
import { db, storage, app } from '../config/firebase';
import { collection, getDocs, where, query, serverTimestamp } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, StyleSheet, Image, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator, SectionList } from "react-native";
import { COLORS, FONTS } from "../constants";
import { Ionicons, FontAwesome } from '@expo/vector-icons'; 
import HorizontalDatePicker from '@logisticinfotech/react-native-horizontal-date-picker';
import { Fontisto } from '@expo/vector-icons';
import { FixturesContext } from '../context/FixturesContext';

const HomeScreen = ({navigation}) => {
    // const [dateSelected, setDateSelected] = useState();
    // const [fixtures, setFixtures] = useState([]);

    // const [firstDivisionFixtures, setFirstDivisionFixtures] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState(null);
    // const [refresh, setRefresh] = useState(true);
    // const [dateSelected, setDateSelected] = useState(new Date().setHours(0,0,0,0));
    const { firstDivisionFixtures, setFirstDivisionFixtures, isLoading,setIsLoading, error, refresh, setRefresh, getFirstDivionFixtures, dateSelected, setDateSelected, onDateSelected, fetchFixtures } = useContext(FixturesContext);

    // const getFirstDivionFixtures = async () => {
    //   try {
    //     var startOfToday = new Date(dateSelected); 

    //     const getDatePlusOneDay = new Date(startOfToday.setDate(startOfToday.getDate() + 1))
    //     console.log("Date Selected Plus One Day: "+getDatePlusOneDay)
    //     // console.log(startOfToday)
    //     startOfToday.setHours(0,0,0,0);

    //     var endOfToday = new Date(dateSelected);        
    //     endOfToday.setHours(23,59,59,999);
    //     const q = query(collection(db, "year/mLKbCVlBQRjpL9ZIjcVa/league/PAQcjUL3HZshWd8Xl1MU/match_day/xuI3Ay7X8DP5niUNpQbz/fixtures"), where('date','>=',startOfToday), where('date', '<=', endOfToday))
    //     const data = await getDocs(q)
    //     setFirstDivisionFixtures(
    //         data.docs.map((doc) =>({
    //         ...doc.data(),
    //         id: doc.id,
    //     })),
    //     // setTimeout(news, 1500)
    //   )
    //   setRefresh(false)
    //   } catch (err) {
    //     setError(err.toString())
    //   } 
    // };

    
    useEffect(() => {
        // getFirstDivionFixtures();
        setIsLoading(false);
        // fetchFixtures();
      }, []);
    
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
            // minDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-7)}
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
            onDateSelected={date => setDateSelected(date)}
          /> 
        </View>
        )
      }

      function renderFirstDivisionMatches() {

        const renderFirstDivisionFixtures = ({item}) => {    
          return(
            <View>
            <TouchableOpacity
              activeOpacity={.5}
              onPress={()=> navigation.navigate('MatchDetail', {
                item
              })}
            >
              <View style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
              <View style={{marginBottom: 10}}>
                {/* <Text style={{color: COLORS.secondary, marginBottom: 10}}>{new Date(item.date.seconds * 1000).toLocaleDateString("en-US")}</Text> */}
                <View>
                  <View style={{justifyContent: 'space-between', flexDirection: 'row', marginBottom: 5}}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{padding: 5, borderColor: COLORS.secondary, borderWidth: 1, backgroundColor: COLORS.white, borderRadius: 20}}>
                        <Image 
                          source={{uri: `${item.home_team_image_url}`}}
                          resizeMode='contain'
                          style={{
                            width: 35,
                            height: 35,
                          }}
                        /> 
                      </View>
                      <View style={{alignItems: 'center', justifyContent: 'center', marginLeft: 15}}>
                        <Text style={{...FONTS.body3, fontWeight: 'bold'}}> {item.home_team} </Text>
                      </View>            
                    </View>

                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                      {
                        item.status == 'NYS' ? (
                          <Text style={{...FONTS.body3, fontWeight: 'bold'}}> ? </Text>
                        ) : (
                          <Text style={{...FONTS.body3, fontWeight: 'bold'}}> {item.home_team_goals} </Text>
                        )
                      }
                    </View>
                  </View>
                      
                  <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{marginLeft: 60}}>
                          <Text style={{fontSize: 12, color: COLORS.secondary}}>VS</Text>
                      </View>
                      <Text></Text> 
                      {/* line */}

                    </View>
                    
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                      {
                        item.status == 'NYS' ? (
                            <Text style={{...FONTS.body5, fontWeight: 'bold'}}>{item.date.toDate().toLocaleTimeString('en-GB').substring(0, 5)} </Text>
                        ) : ( 
                            <Text style={{...FONTS.body4, fontWeight: 'bold'}}> {item.status} </Text>
                         )
                      }
                    </View>
                    
                  </View>


                  <View style={{justifyContent: 'space-between', flexDirection: 'row', marginBottom: 5}}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{padding: 5, borderColor: COLORS.secondary, borderWidth: 1, backgroundColor: COLORS.white, borderRadius: 20}}>
                        <Image 
                          source={{uri: `${item.away_team_image_url}`}}
                          resizeMode='contain'
                          style={{
                            width: 35,
                            height: 35,
                          }}
                        /> 
                      </View>
                      <View style={{alignItems: 'center', justifyContent: 'center', marginLeft: 15}}>
                        <Text style={{...FONTS.body3, fontWeight: 'bold'}}> {item.away_team} </Text>
                      </View>            
                    </View>

                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    {
                        item.status == 'NYS' ? (
                          <Text style={{...FONTS.body3, fontWeight: 'bold'}}> ? </Text>
                        ) : (
                          <Text style={{...FONTS.body3, fontWeight: 'bold'}}> {item.away_team_goals} </Text>
                        )
                      }
                    </View>
                  </View>
                  
                </View>
              </View>
              </View>
            </TouchableOpacity>
            <View
              style={{
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
              }}
            />
            </View>
          )
        }

        const renderHeaderr = () => {
          return (
            firstDivisionFixtures.length > 0 && <Text style={{padding: 5,
              fontSize: 16,
              // fontWeight: 'bold',
              backgroundColor: '#212437',
              color: '#fff',
              marginTop: 5, marginLeft: 2, marginRight: 2, borderRadius: 2}}> Primus National League </Text>
              //  || divisionLeague.length < 1 ? <Text style={{padding: 5,
                // fontSize: 16,
                // fontWeight: 'bold',
                // backgroundColor: '#212437',
                // color: '#fff',
                // marginTop: 5}}> {section.title} </Text> : <Text style={{padding: 5,
                  // fontSize: 16,
                  // fontWeight: 'bold',
                  // backgroundColor: '#212437',
                  // color: '#fff',
                  // marginTop: 5}}> {section.title} </Text>
          )
          // if(premierLeague.length < 1 ) {
          //   return null;
          // }else if (premierLeague.length >= 1) {
          //   return <Text> {section.title} </Text>
          // }else if (divisionLeague.length < 1) {
          //   return <Text></Text>;
          // }else if (divisionLeague.length >= 1) {
          //   return <Text> {section.title} </Text>
          // }
              
          }
        return ( 
          isLoading ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator size='large' color='#212437' /></View>
                    : error ? <View><Text>{error}</Text></View>
                    // : firstDivisionFixtures?.length < 1 ? <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}><Text style={{color: '#6d071a'}}>No fixture available at this date</Text></View>
                    :
                    <FlatList 
                    data={firstDivisionFixtures}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderFirstDivisionFixtures}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={renderHeaderr}
                    refreshing={refresh}
                    onRefresh={() => fetchFixtures()}
                  />
                  // <SectionList
                    // sections = {DATA_SECTIONS}
                //     renderItem = {renderMatches}
                //     renderSectionHeader = {renderHeaderr}
                //     keyExtractor={item => `${item.id}`}
                //     refreshing={refresh}
                //     onRefresh={() => fetchFixtures()}
                // >
                // </SectionList>
        )
        
      }

      const renderMatchess = ({item}) => {
        return(
          <Text>{item.home_team} - {item.away_team}</Text>
        )
      }
      

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
            {/* {renderHeader()} */}
            <Header />
            <Text>{dateSelected}</Text>

            {renderHorizontalDatePicker()}
            {renderFirstDivisionMatches()}
            
            {/* <FlatList 
                    data={fixtures}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderMatchess}
                    showsVerticalScrollIndicator={false}
                    // ListHeaderComponent={renderHeaderr}
                    refreshing={refresh}
                    onRefresh={() => fetchFixtures()}
                  /> */}
        </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})