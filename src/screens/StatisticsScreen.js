import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { COLORS, FONTS, SIZES } from '../constants'
import { Fontisto } from '@expo/vector-icons';
// import { Divider } from 'react-native-elemets';
import { Divider } from 'react-native-elements';
import { Dimensions} from 'react-native';
import { StatisticsContext } from '../context/StatisticsContext';
// import { getDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { async } from '@firebase/util';
import { collection, getDocs, where, query, serverTimestamp, Timestamp, getDoc, doc, onSnapshot, limit } from 'firebase/firestore';


const StatisticsScreen = () => {
    const { firstDivisionStandings, setFirstDivisionStandings, isLoading, setIsLoading, error, refresh, setRefresh, getFirstDivionStandings} = useContext(StatisticsContext);
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
    const [team, setTeam] = useState({});

    useEffect(() => {
        renderTeamName();
        // console.log(team);
    }, [])

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
    
      const renderTeamName = (team_id) => {
            
        // const docRef = doc(db, "teams", `${team_id}`);
        // getDoc(docRef).then((doc) => {
        //     console.log(doc.data(), doc.id)
        // })
        // console.log(docSnap);
        // console.log("Document data:", docSnap.data());

        // const docRef = doc(db, "teams", `${team_id}`);
        const docRef = doc(db, `/year/mLKbCVlBQRjpL9ZIjcVa/league/PAQcjUL3HZshWd8Xl1MU/standings/${team_id}`)
        // const q = query(collection(db, "year/mLKbCVlBQRjpL9ZIjcVa/league/PAQcjUL3HZshWd8Xl1MU/match_day/xuI3Ay7X8DP5niUNpQbz/fixtures"), where('date','>=',dateSearched1), where('date', '<=', dateSearched2))
        
        getDoc(docRef).then((doc) => {
            setTeam(
                ...doc.data(),
                doc.id
            )
            // console.log(doc.data(), doc.id);
        })
        
        // setTimeout(renderTeamName, 500);
    return (
        <Text style={{width: (width/2) - 30}}>Kiyovu Sport</Text>
        )
    }

    function renderStandings() {

        

        const renderFirstDivisionStandings = ({item}) => {  
            return (
                <View style={{marginBottom: 10}}>
                    
                    {/* Table Content */}
                    <View style={{flexDirection: 'row', marginLeft: 7, marginBottom: 5}}>
                        
                        {/* <Text style={{width: (width/2) - 30}}>Kiyovu Sport</Text> */}
                        {renderTeamName(item.id)}
                        <Text style={{width: 35}}>{item.matches}</Text>
                        <Text style={{width: 35}}>{item.wins}</Text>
                        <Text style={{width: 35}}>{item.draws}</Text>
                        <Text style={{width: 35}}>{item.looses}</Text>
                        <Text style={{width: 35}}>{item.goals_diff}</Text>
                        <Text>{item.points}</Text>
                    </View>
                </View>
            )
        }
        return (
            <FlatList 
                    data={firstDivisionStandings}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderFirstDivisionStandings}
                    showsVerticalScrollIndicator={false}
                    // ListHeaderComponent={renderHeaderr}
                    // refreshing={refresh}
                    // style={{marginBottom: width - (width - 70)}}
                    // onRefresh={() => fetchFixtures()}
                  />
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
                    {/* Table Content */}

                    {renderStandings()}

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
        <View style={{backgroundColor: COLORS.white, flex: 1}}>
            {renderHeader()}
            {renderSelectSeason()}
            {renderMainCategories()}
            {renderNavigationContent()}
        </View>
    )
}
export default StatisticsScreen;