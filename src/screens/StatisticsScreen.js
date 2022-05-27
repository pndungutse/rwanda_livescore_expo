import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, {useState, useEffect} from 'react'
import { COLORS, FONTS, SIZES } from '../constants'
import { Fontisto } from '@expo/vector-icons';
// import { Divider } from 'react-native-elemets';
import { Divider } from 'react-native-elements';
import { Dimensions} from 'react-native';



const StatisticsScreen = () => {
    const navigationData = [
        {
            id: 1,
            name: 'Table',
        },
        {
            id: 2,
            name: 'Top Scores',
        }
    ]
    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width

    const [navigations, setNavigations] = useState(navigationData);
    const [selectedNavigation, setSelectedNavigation] = useState(navigationData[0]);


    function renderHeader() {
        return (
          <View style={{
            flexDirection: 'row',
            height: 52,
            // marginBottom: 1, 
            backgroundColor: '#212437',
            marginTop: 30
          }}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}
            style={{
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
              {/* <Ionicons name="search" size={25} color="#fff" /> */}
            </TouchableOpacity>
          </View> 
        )
      }
    
      function onSelectNavigation(item) {
        setSelectedNavigation(item)
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
                        width: 150,
                        height: 20,
                        alignItems: 'center',
                        justifyContent: 'center', 
                        }}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{
                                    color: selectedNavigation?.id==item.id ? 'blue' : '#808080', fontSize: 14, fontWeight: 'bold',
                                }}>{item.name} 
                            </Text>
                            
                        </View>

                        </View>
                </TouchableOpacity>
            )
        }
        return (
            <View style={{marginBottom: 5, borderColor: '#000000', borderWidth: 1}}>
                <FlatList 
                    data={navigations}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderNavigations} 
                    contentContainerStyle={{paddingVertical: 5}}
                />
            </View>
        )
    }

    function renderNavigationContent() {
        if(selectedNavigation?.id == 1) {
            return (
               
            <View>
                <Text style={{marginLeft: 7, marginBottom: 10}}>Primus National League</Text>
                {/* Table Header */}
                <View style={{flexDirection: 'row', marginBottom: 5, backgroundColor: '#E2E5DE', height: 25, borderRadius: 5}}>
                        <Text style={{width: (width/2) - 30, marginLeft: 7}}>Team</Text>
                        <Text style={{width: 35, marginTop: 0}}>P</Text>
                        <Text style={{width: 35}}>W</Text>
                        <Text style={{width: 35}}>D</Text>
                        <Text style={{width: 35}}>L</Text>
                        <Text style={{width: 35}}>GD</Text>
                        <Text>Pts</Text>
                    </View>
                <View style={{marginBottom: 10}}>
                    {/* Table Content */}
                    <View style={{flexDirection: 'row', marginLeft: 7, marginBottom: 5}}>
                        <Text style={{width: (width/2) - 30}}>APR FC</Text>
                        <Text style={{width: 35}}>20</Text>
                        <Text style={{width: 35}}>26</Text>
                        <Text style={{width: 35}}>3</Text>
                        <Text style={{width: 35}}>1</Text>
                        <Text style={{width: 35}}>6</Text>
                        <Text>62</Text>
                    </View>
                </View>
                <View style={{marginBottom: 10}}>
                    
                    {/* Table Content */}
                    <View style={{flexDirection: 'row', marginLeft: 7, marginBottom: 5}}>
                        <Text style={{width: (width/2) - 30}}>Kiyovu Sport</Text>
                        <Text style={{width: 35}}>20</Text>
                        <Text style={{width: 35}}>26</Text>
                        <Text style={{width: 35}}>3</Text>
                        <Text style={{width: 35}}>1</Text>
                        <Text style={{width: 35}}>8</Text>
                        <Text>60</Text>
                    </View>
                </View>
                <View style={{marginBottom: 10}}>
                    
                    {/* Table Content */}
                    <View style={{flexDirection: 'row', marginLeft: 7, marginBottom: 5}}>
                        <Text style={{width: (width/2) - 30}}>AS Kigali</Text>
                        <Text style={{width: 35}}>20</Text>
                        <Text style={{width: 35}}>26</Text>
                        <Text style={{width: 35}}>3</Text>
                        <Text style={{width: 35}}>1</Text>
                        <Text style={{width: 35}}>-3</Text>
                        <Text>48</Text>
                    </View>
                </View>
                <View style={{marginBottom: 10}}>
                    
                    {/* Table Content */}
                    <View style={{flexDirection: 'row', marginLeft: 7, marginBottom: 5}}>
                        <Text style={{width: (width/2) - 30}}>Rayon Sport</Text>
                        <Text style={{width: 35}}>20</Text>
                        <Text style={{width: 35}}>26</Text>
                        <Text style={{width: 35}}>3</Text>
                        <Text style={{width: 35}}>1</Text>
                        <Text style={{width: 35}}>-1</Text>
                        <Text>62</Text>
                    </View>
                </View>
                <View style={{marginBottom: 10}}>
                    
                    {/* Table Content */}
                    <View style={{flexDirection: 'row', marginLeft: 7, marginBottom: 5}}>
                        <Text style={{width: (width/2) - 30}}>Bugesera FC</Text>
                        <Text style={{width: 35}}>20</Text>
                        <Text style={{width: 35}}>26</Text>
                        <Text style={{width: 35}}>3</Text>
                        <Text style={{width: 35}}>1</Text>
                        <Text style={{width: 35}}>0</Text>
                        <Text>62</Text>
                    </View>
                </View>
            </View>
            )
        }else if(selectedNavigation?.id == 2) {
            return (
                <View>
                <Text style={{marginLeft: 7, marginBottom: 10}}>Primus National League</Text>
                {/* Table Header */}
                <View style={{flexDirection: 'row', marginBottom: 5, backgroundColor: '#E2E5DE', height: 25, borderRadius: 5}}>
                        <Text style={{width: (width/2) - 20, marginLeft: 7}}>Player</Text>
                        <Text style={{width: 140}}>Team</Text>
                        <Text style={{width: 140}}>Goals</Text>

                    </View>
                <View style={{marginBottom: 10}}>
                    {/* Table Content */}
                    <View style={{flexDirection: 'row', marginLeft: 7, marginBottom: 5}}>
                        <Text style={{width: (width/2) - 20}}>Mugunga Yves</Text>
                        <Text style={{width: 140}}>APR FC</Text>
                        <Text style={{width: 140}}>26</Text>
                    </View>
                </View>
                <View style={{marginBottom: 10}}>
                    
                    {/* Table Content */}
                    <View style={{flexDirection: 'row', marginLeft: 7, marginBottom: 5}}>
                        <Text style={{width: (width/2) - 20}}>Muhagiri HaKizimana</Text>
                        <Text style={{width: 140}}>AS Kigali</Text>
                        <Text style={{width: 140}}>24</Text>
                    </View>
                </View>
                <View style={{marginBottom: 10}}>
                    
                    {/* Table Content */}
                    <View style={{flexDirection: 'row', marginLeft: 7, marginBottom: 5}}>
                        <Text style={{width: (width/2) - 20}}>Husein Chabalala</Text>
                        <Text style={{width: 140}}>AS Kigali</Text>
                        <Text style={{width: 140}}>26</Text>
                    </View>
                </View>
                <View style={{marginBottom: 10}}>
                    
                    {/* Table Content */}
                    <View style={{flexDirection: 'row', marginLeft: 7, marginBottom: 5}}>
                        <Text style={{width: (width/2) - 20}}>Emmanuel Okwi</Text>
                        <Text style={{width: 140}}>Kiyovu Sport</Text>
                        <Text style={{width: 140}}>22</Text>
                    </View>
                </View>
                <View style={{marginBottom: 10}}>
                    
                    {/* Table Content */}
                    <View style={{flexDirection: 'row', marginLeft: 7, marginBottom: 5}}>
                        <Text style={{width: (width/2) - 20}}>Esombe Andre Onana</Text>
                        <Text style={{width: 140}}>Rayon Sport</Text>
                        <Text style={{width: 140}}>20</Text>
                    </View>
                </View>
            </View>
            )
        }
    }

    function renderSelectSeason() {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 3}}>
                <Text>2020-2021</Text>
            </View>
        )
    }

    return (
        <ScrollView style={{backgroundColor: COLORS.white, flex: 1}}>
            {renderHeader()}
            {renderSelectSeason()}
            {renderMainCategories()}
            {renderNavigationContent(   )}
        </ScrollView>
    )
}
export default StatisticsScreen;