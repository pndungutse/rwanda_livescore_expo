/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
//  import AsyncStorage from '@react-native-async-storage/async-storage';

 import { NavigationContainer } from '@react-navigation/native';
//  import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import { createDrawerNavigator } from '@react-navigation/drawer';
 
import { WelcomeScreen } from './src/screens';
import { Tabs } from './src/navigation';
import CustomDrawer from './src/components/CustomDrawer';
 
 
//  const Stack = createNativeStackNavigator();
 const Drawer = createDrawerNavigator();
 
 const App = () => {
 
   return (
 
       <NavigationContainer>
         <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}
           screenOptions={{
             headerShown: false
           }}
           initialRouteName={'Welcome'}
         >
           <Drawer.Screen name='Welcome' component={WelcomeScreen} />
           <Drawer.Screen name='Home' component={Tabs} />

         </Drawer.Navigator>
       </NavigationContainer>
   );
 };
 
 export default App;
 