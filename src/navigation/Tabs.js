import React, {useState, useContext, useEffect} from "react";
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { icons, COLORS } from '../constants';


import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Svg, { Path } from "react-native-svg";
import { HomeScreen, NewsScreen } from "../screens";
import NewsContextProvider from "../context/NewsContext";

const Tab = createBottomTabNavigator();

const NewsStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();


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
            {/* <NewsStack.Screen name="NewsDetail" component={NewsDetail} /> */}
        </NewsStack.Navigator>
    </NewsContextProvider>
)

const HomeStackScreen = () => (
    <HomeStack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
        <HomeStack.Screen name="Home" component={HomeScreen} />
        {/* <HomeStack.Screen name="MatchDetail" component={MatchDetail} /> */}
    </HomeStack.Navigator>
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
                        <Image 
                            source={icons.football} 
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#fff' : COLORS.secondary
                            }}
                        />
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
                        <Image 
                            source={icons.newspaper} 
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#fff' : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton 
                            {...props}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Favorite"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image 
                            source={icons.favorite} 
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#fff' : COLORS.secondary
                            }}
                        />
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
                component={HomeScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image 
                            source={icons.settings} 
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#fff' : COLORS.secondary
                            }}
                        />
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