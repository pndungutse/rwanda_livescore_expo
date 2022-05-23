import React, {useState} from "react";
import {View, Text, Pressable} from 'react-native';
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 

const CustomDrawer = props => {
    return (
        <View style={{flex: 1}}>
        <DrawerContentScrollView {...props}>
            <View style={{marginLeft: 5}}>
                <Text style={{fontWeight: 'bold', fontSize: 22, color: '#212437'}}>Rwanda Livescore</Text>
                <View style={{marginTop: 5}}>
                    <View style={{flexDirection: 'row'}}>
                        <AntDesign name="setting" size={16} color="black" />
                        <Text style={{marginLeft: 5}}>Settings</Text>
                    </View>
                    <View style={{marginTop: 10, marginLeft: 10}}>
                        <View style={{flexDirection: 'row', marginBottom: 15}}>
                            <MaterialCommunityIcons name="cog-refresh-outline" size={16} color="black" />
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{marginLeft: 5, fontWeight: 'bold'}}>Default Sport</Text>
                                <Text style={{marginLeft: 70}}>Football</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginBottom: 15}}>
                            <Ionicons name="md-notifications-circle-outline" size={18} color="black" />
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{marginLeft: 5, fontWeight: 'bold'}}>Notifications</Text>
                                <Text style={{marginLeft: 70}}>Enabled</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginBottom: 15}}>
                            <MaterialIcons name="favorite-border" size={18} color="black" />
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{marginLeft: 5, fontWeight: 'bold'}}>Favourites</Text>
                                <Text style={{marginLeft: 70}}>All</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <AntDesign name="setting" size={16} color="black" />
                        <Text style={{marginLeft: 5}}>Quick Links</Text>
                    </View>

                    <View style={{marginTop: 10, marginLeft: 10}}>
                        <View style={{flexDirection: 'row', marginBottom: 15}}>
                            <MaterialCommunityIcons name="cog-refresh-outline" size={16} color="black" />
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{marginLeft: 5, fontWeight: 'bold'}}>Share App</Text>
                                <Pressable style={{marginLeft: 70, height: 20, width: 50, backgroundColor: '#212437', borderRadius: 3}}>
                                    <Text style={{color: '#fff', marginLeft: 7}}>Share</Text>
                                </Pressable>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginBottom: 15}}>
                            <Ionicons name="md-notifications-circle-outline" size={18} color="black" />
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{marginLeft: 5, fontWeight: 'bold'}}>Contact Us</Text>
                                {/* <Text style={{marginLeft: 70}}>Enabled</Text> */}
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginBottom: 15}}>
                            <MaterialIcons name="favorite-border" size={18} color="black" />
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{marginLeft: 5, fontWeight: 'bold'}}>Help</Text>
                                {/* <Text style={{marginLeft: 70}}>All</Text> */}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </DrawerContentScrollView>
        <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#212437', flexDirection: 'row'}}>
            <Text>Rwanda Livescore Developers</Text>
            <MaterialIcons name="developer-mode" size={18} color="black" />
        </View>
        </View>
    )
}
export default CustomDrawer;