import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import { Ionicons, FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const MatchDetail = ({route, navigation}) => {
    const detailsNavigationData = [
        {
            id: 1,
            name: 'Match Info',
            icon: icons.matchInfo
        },
        {
            id: 2,
            name: 'Match Stats',
            icon: icons.matchStats
        },
        {
            id: 3,
            name: 'Line Ups',
            icon: icons.lineUps
        },
        {
            id: 4,
            name: 'Table',
            icon: icons.matchTable
        },
        {
            id: 5,
            name: 'H2H',
            icon: icons.matchH2H
        }
    ]
    const [detailsNavigation, setDetailsNavigation] = useState(detailsNavigationData);
    const [selectedNavigation, setSelectedNavigation] = useState(detailsNavigationData[0]);
    const [fixture, setFixture] = useState();

    function onSelectNavigation(item) {
        setSelectedNavigation(item)
    }

    useEffect(() => {
        let {item} = route.params;
        setFixture(item);
    })
 
    
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
            onPress={()=> navigation.goBack()}
            >
              <Ionicons name="arrow-back-outline" size={24} color="white" />
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

      function renderFixtureInfo() {
        return (
            <View style={{backgroundColor: '#212437', height: 135}}>
                <View style={{
                    flexDirection:'row',
                    marginLeft: 20,
                    marginTop: 20
                }}>
                    {/* Home Team Image and Name */}
                    <View style={{marginTop: 20}}>
                        <Image 
                            source={{uri: `${fixture?.home_team_image_url}`}}
                            resizeMode='contain'
                            style={{
                                width: 60,
                                height: 60,
                                marginBottom: 5,
                                borderRadius: 20
                            }}
                        />
                        <Text style={{color: COLORS.white}}>{fixture?.home_team}</Text>
                    </View>
                    {/* Both Goals */}
                    
                    <View style={{flexDirection: 'row'}}>

                        <View style={{marginLeft: 30, marginTop: 5}}>
                            {
                                fixture?.status == 'NYS' ? (
                                    <Text style={{color: COLORS.white, fontSize: 50, fontWeight: 'bold'}}>?</Text>
                                ) : (
                                    <Text style={{color: COLORS.white, fontSize: 50, fontWeight: 'bold'}}>{fixture?.home_team_goals}</Text>
                                )
                            }
                        </View>
                        <View style={{marginLeft: 5, marginTop: 5}}>
                            <Text style={{color: COLORS.white, fontSize: 40, fontWeight: 'bold', marginLeft: 13}}>:</Text>
                            {
                                fixture?.status == 'NYS' ? (
                                    <Text style={{color: COLORS.white, fontWeight: 'bold', fontSize: 17}}>{fixture?.date.toDate().toLocaleTimeString('en-GB').substring(0, 5)}</Text>                             
                                ) : (
                                    <Text style={{color: COLORS.white, fontWeight: 'bold', fontSize: 17}}>{fixture?.status}</Text>
                                )
                            }
                        </View>
                        <View style={{marginTop: 5}}>
                            {
                                fixture?.status == 'NYS' ? (
                                    <Text style={{color: COLORS.white, fontSize: 50, fontWeight: 'bold'}}>?</Text>
                                ) : (
                                    <Text style={{color: COLORS.white, fontSize: 50, fontWeight: 'bold'}}>{fixture?.away_team_goals}</Text>
                                )
                            }
                        </View>
                        {/* Away Team Image and Name */}
                        <View style={{marginTop: 20, marginLeft: 20, marginLeft: 50}}>
                            <Image 
                                source={{uri: `${fixture?.away_team_image_url}`}}
                                resizeMode='contain'
                                style={{
                                    width: 60,
                                    height: 60,
                                    marginBottom: 5,
                                    borderRadius: 20
                                }}
                            />
                            <Text style={{color: COLORS.white}}>{fixture?.away_team}</Text>
                        </View>
                    </View>

                </View>
            </View>
        )
    }

    function renderMainCategories() {

        const renderNavigations = ({item}) => {
            return (
                <TouchableOpacity 
                    style={{alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10}}
                    activeOpacity={.8}
                    onPress={() => onSelectNavigation(item)}
                >
                    <View style={{
                        width: 100,
                        height: 25,
                        alignItems: 'center',
                        justifyContent: 'center'
                        }}>
                        <View style={{flexDirection: 'row'}}>
                            <Image 
                                source={item.icon}
                                resizeMode='contain'
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: selectedNavigation?.id==item.id ? COLORS.white : '#696A71',
                                }}
                            />
                            <Text style={{
                                    color: selectedNavigation?.id==item.id ? COLORS.white : '#696A71', fontSize: 16, fontWeight: 'bold', marginLeft: 3
                                }}>{item.name} 
                            </Text>
                        </View>
                        </View>
                </TouchableOpacity>
            )
        }
        return (
            <View style={{backgroundColor: '#212437', marginBottom: 10}}>
                <FlatList 
                    data={detailsNavigation}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderNavigations} 
                    contentContainerStyle={{paddingVertical: SIZES.padding}}
                />
            </View>
        )
    }

    function renderNavigationDetails() {
        if(selectedNavigation?.id == 1) {
            return (
                
                <View>
                <View style={{marginBottom: 20, borderBottomWidth: .2, borderBottomColor: COLORS.black}}>
                  <View style={{marginLeft: 15, }}>
                    <Text style={{color: COLORS.black, marginBottom: 15, fontSize: 17, fontWeight: 'bold'}}>Match Info</Text>
                  </View>
                </View>
      
                <View style={{marginBottom: 20, borderBottomWidth: .2, borderBottomColor: COLORS.black}}>
                  <View style={{marginLeft: 15, flexDirection:'row', marginBottom: 15, alignItems: 'center'}}>
                  <MaterialIcons name="date-range" size={24} color="black" />
                  <View style={{marginHorizontal: 15}}>
                    <Text style={{marginTop: -10, fontSize: 14, color: COLORS.black}}> {new Date(fixture?.date.seconds * 1000).toLocaleDateString("en-US")} - {fixture?.date.toDate().toLocaleTimeString('en-GB').substring(0, 5)}</Text>
                    <Text style={{marginTop: 5, color: COLORS.black, marginLeft: 3, fontSize: 13}}>Date</Text>
                  </View>
                  </View>
                </View>
      
                <View style={{marginBottom: 15, borderBottomWidth: .2, borderBottomColor: COLORS.black}}>
                  <View style={{marginLeft: 15, flexDirection:'row', marginBottom: 20, alignItems: 'center'}}>
                  <MaterialCommunityIcons name="stadium" size={24} color="black" />
                    <View style={{marginHorizontal: 15}}>
                      <Text style={{marginTop: -10, fontSize: 14, color: COLORS.black}}> Amahoro stadium</Text>
                      <Text style={{marginTop: 5, color: COLORS.black, marginLeft: 3, fontSize: 13}}>Venue</Text>
                    </View>
                  </View>
                </View>
      
                <View style={{marginBottom: 10, marginTop: 2, borderBottomWidth: 0.5, borderBottomColor: COLORS.black}}>
                  <View style={{marginLeft: 15}}>
                    <Text style={{color: COLORS.black, fontSize: 14, marginBottom: 7}}>COMPETITION</Text>
                  </View>
                </View>
      
                <View style={{marginBottom: 151,marginTop: 10, borderBottomWidth: .5, borderBottomColor: COLORS.black}}>
                  <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
                    <View style={{marginLeft: 15, flexDirection:'row', marginBottom: 15, alignItems: 'center'}}>
                    <MaterialCommunityIcons name="trophy-award" size={24} color="black" />
                      <View style={{marginHorizontal: 15}}>
                        <Text style={{marginTop: -10, fontSize: 14, color: COLORS.black}}> Qualification </Text>
                        <Text style={{marginTop: 5, color: COLORS.black, marginLeft: 3, fontSize: 13}}>Primus National League</Text>
                      </View>
                    </View>
      
                    {/* <Icon name="chevron-right" size={20} color={COLORS.black} /> */}
                  </View>
                  
                </View>
              </View>
            )
        }else if(selectedNavigation?.id == 2) {
            return (
                <View>
                    <Text>Match Stats Clicked</Text>
                </View>
            )
        }else if(selectedNavigation?.id == 3) {
            return (
                <View>
                    <Text>Match Line Ups Clicked</Text>
                </View>
            )
        }else if(selectedNavigation?.id == 4) {
            return (
                <View>
                    <Text>Match Table Clicked</Text>
                </View>
            )
        }else if(selectedNavigation?.id == 5) {
            return (
                <View>
                    <Text>Match H2H Clicked</Text>
                </View>
            )
        }
    }

    return (
        <SafeAreaView>
            {renderHeader()}
            <ScrollView>
                {renderFixtureInfo()}
                {renderMainCategories()}
                {renderNavigationDetails()}
            </ScrollView>
        </SafeAreaView>
    )
}
export default MatchDetail