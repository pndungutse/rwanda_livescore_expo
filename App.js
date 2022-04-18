/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState, useEffect } from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 
import { WelcomeScreen } from './src/screens';
// import { HomeScreen } from './src/screens';
import { Tabs } from './src/navigation';
 
 
 const Stack = createNativeStackNavigator();
 
 const App = () => {
 
   return (
 
       <NavigationContainer>
         <Stack.Navigator 
           screenOptions={{
             headerShown: false
           }}
           initialRouteName={'Welcome'}
         >
           <Stack.Screen name='Welcome' component={WelcomeScreen} />
           <Stack.Screen name='Home' component={Tabs} />
         </Stack.Navigator>
       </NavigationContainer>
   );
 };
 
 export default App;
 