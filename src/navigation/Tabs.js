import React, {useState, useContext, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { icons, COLORS } from '../constants';

import { Ionicons, FontAwesome, EvilIcons } from '@expo/vector-icons'; 

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Svg, { Path } from "react-native-svg";
import { HomeScreen, NewsScreen, NewsDetail, HighlightScreen, StatisticScreen, HighlightDetail, MatchDetail, SkeletonTestScreen } from "../screens";
// import NewsContextProvider from "../context/NewsContext";
// import HightlightContextProvider from "../context/HighlightContext";
import { NewsContextProvider, HightlightContextProvider, FixturesContextProvider } from "../context";


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
        <StatisticsStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
        <StatisticsStack.Screen name="StatisticsScreen" component={StatisticScreen} />
        {/* <StatisticsStack.Screen name="HighlightDetail" component={HighlightDetail} /> */}
        </StatisticsStack.Navigator>
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
                        height={61}
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
    return (
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
            <Tab.Screen
                name="Homee"
                component={HomeStackScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Ionicons name="football" size={25} color="#fff"/>
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton 
                            {...props}
                        />
                    )
                }}
            
            />
            <Tab.Screen
                name="Soccer"
                component={NewsStackScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Ionicons name="newspaper-outline" size={25} color="#fff" />   
                    ),
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
            
            <Tab.Screen
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
            />
        </Tab.Navigator>
    )
}
export default Tabs;