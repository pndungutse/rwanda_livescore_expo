import React, {useState, useContext, useEffect} from "react";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { icons, COLORS } from '../constants';

import { Ionicons, FontAwesome, EvilIcons } from '@expo/vector-icons'; 

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Svg, { Path } from "react-native-svg";
import { db, storage, app } from '../config/firebase';
import { collection, getDocs, query, orderBy, doc, getDoc, onSnapshot } from 'firebase/firestore';

import { HomeScreen, NewsScreen, NewsDetail, HighlightScreen, StatisticScreen, HighlightDetail, MatchDetail, SkeletonTestScreen, StatisticsScreen } from "../screens";
// import NewsContextProvider from "../context/NewsContext";
// import HightlightContextProvider from "../context/HighlightContext";
import { NewsContextProvider, HightlightContextProvider, FixturesContextProvider, StatisticsContextProvider } from "../context";

const Tab = createBottomTabNavigator();

const NewsStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const HighlightsStack = createNativeStackNavigator();
const StatisticsStack = createNativeStackNavigator();


const NewsStackScreen = () => (
    <NewsContextProvider>
        <NewsStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            {/* <NewsContext.Provider value={news}> */}
                <NewsStack.Screen name="News" component={NewsScreen} />
            {/* </NewsContext.Provider> */}
            <NewsStack.Screen name="NewsDetail" component={NewsDetail} />
        </NewsStack.Navigator>
    </NewsContextProvider>
)

const HomeStackScreen = () => (
    <FixturesContextProvider>
    <HomeStack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="MatchDetail" component={MatchDetail} />
    </HomeStack.Navigator>
    </FixturesContextProvider>
)
const HighlightsStackScreen = () => (
    <HightlightContextProvider>
        <HighlightsStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
        <HighlightsStack.Screen name="Highlightss" component={HighlightScreen} />
        <HighlightsStack.Screen name="HighlightDetail" component={HighlightDetail} />
        </HighlightsStack.Navigator>
    </HightlightContextProvider>
)
const StatisticStackScreen = () => (
        <StatisticsContextProvider>
        <StatisticsStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
        <StatisticsStack.Screen name="StatisticsScreen" component={StatisticsScreen} />
        {/* <StatisticsStack.Screen name="HighlightDetail" component={HighlightDetail} /> */}
        </StatisticsStack.Navigator>
        </StatisticsContextProvider>
)
const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
    var isSelected = accessibilityState.selected
    if(isSelected){
        return (
            <View style={{ flex: 1, alignItems: "center", }}>
                <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
                    <View style={{ flex: 1, backgroundColor: '#212437' }}></View>
                    <Svg
                        width={70}
                        height={60}
                        viewBox="3 2 69 58"
                    >
                        <Path
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            fill={'#212437'}
                        />
                    </Svg>
                    <View style={{ flex: 1, backgroundColor: '#212437' }}></View>
                </View>

                <TouchableOpacity
                    style={{
                        top: -22.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: '#212437'
                    }}
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>
                {/* <View style={{marginLeft: }}>
                    <TouchableOpacity>
                        <Text>Refresh</Text>
                    </TouchableOpacity>
                </View> */}
            </View>
        )
    }else {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    height: 60,
                    backgroundColor: '#212437'
                }}
                activeOpacity={1}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        )
    }
}

const Tabs = () => {

    const [document, setDocument] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(true);
    const [textTest, setTextTest] = useState(true);
    const [newsFirst, setNewsFirst] = useState(false);
    // const [newsFromFourth, setNewsFromFourth] = useState([]);

    // const testText = "Hello World";
    // const getNeed = async () => {
    //     try {
    //       const documentRef = await doc(db, 'needs', 'HvXow1htm69a0pqFucm5');
    //       // console.log(q);
    //       const data = await getDoc(documentRef);
    //     //   onSnapshot(documentRef, (document) => {
    //     //       setDocument(document.data(), document.id)
    //     //   })
    //       setDocument(onSnapshot(documentRef, (document) => {
    //           document.data(), document.id
    //       }))
    //     setRefresh(false)
    //     } catch (err) {
    //       setError(err.toString())
    //     }   
    //   };


      useEffect(() => {
        // getNeed();
        // console.log(document);
        // console.log("Test Test");
        const documentRef = doc(db, 'needs', 'HvXow1htm69a0pqFucm5');
        onSnapshot(documentRef, (docum) => {
            setDocument(docum.data(), docum.id);
        });
        setNewsFirst(document?.firstNews);
      }, []);

    return (
        // <View>
            <Tab.Navigator  
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        borderTopWidth: 0,
                        backgroundColor: 'transparent',
                        elevation: 0
                    },  
                    
                }}
            >
                {/* <NeedsContextProvider> */}
                <Tab.Screen
                    name={newsFirst === true ? "Newss" : "Homee"}
                    component={newsFirst == true ? NewsStackScreen : HomeStackScreen}
                    options={{
                        tabBarIcon: ({focused}) => {
                            if (newsFirst === true) {
                                return (
                                    <Ionicons name="newspaper-outline" size={25} color="#fff" />     
                                )
                            }else {
                                return (
                                    <Ionicons name="football" size={25} color="#fff" />
                                )
                            }
                        },
                        tabBarButton: (props) => (
                            <TabBarCustomButton 
                                {...props}
                            />
                        )
                    }}
                
                />
                <Tab.Screen
                    name={newsFirst === true ? "News" : "Soccer"}
                    component={newsFirst === true ? HomeStackScreen : NewsStackScreen}
                    options={{
                        tabBarIcon: ({focused}) => 
                        {
                        if (newsFirst === true) {
                            return (
                                <Ionicons name="football" size={25} color="#fff" />     
                            )
                        }else {
                            return (
                                <Ionicons name="newspaper-outline" size={25} color="#fff" />
                            )
                        }
                    },
                        tabBarButton: (props) => (
                            <TabBarCustomButton 
                                {...props}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name="Highlights"
                    component={HighlightsStackScreen}
                    options={{
                        tabBarIcon: ({focused}) => (
                            <Ionicons name="videocam-outline" size={27} color="#fff" />   
                        ),
                        tabBarButton: (props) => (
                            <TabBarCustomButton 
                                {...props}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name="Statistics"
                    component={StatisticStackScreen}
                    options={{
                        tabBarIcon: ({focused}) => (
                            <FontAwesome name="area-chart" size={25} color="#fff" />
                        ),
                        tabBarButton: (props) => (
                            <TabBarCustomButton 
                                {...props}
                            />
                        )
                    }}
                />
                
                {/* <Tab.Screen
                    name="Settings"
                    component={SkeletonTestScreen}
                    options={{
                        tabBarIcon: ({focused}) => (
                            <EvilIcons name="refresh" size={30} color="#fff" />
                        ),
                        tabBarButton: (props) => (
                            <TabBarCustomButton 
                                {...props}
                            />
                        )
                    }}
                /> */}
            {/* </NeedsContextProvider> */}
            </Tab.Navigator>
        // </View>
    )
}
export default Tabs;
