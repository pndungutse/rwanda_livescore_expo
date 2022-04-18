import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, FONTS, icons, images } from '../constants';

const WelcomeScreen = ({navigation}) => {
    return (
        <View>
            <View style={styles.container}>
                <Image 
                    source={images.logo}
                    style={styles.logo}
                />
            </View>
            <View>
                <Text style={{
                    marginLeft: 30,
                    ...FONTS.h4,
                    fontWeight: 'bold'
                }}>Welcome to Rwanda Soccer LiveScore</Text>
                <View style={{marginLeft: 70, marginTop: 20, marginBottom: 20}}>
                    <Text style={{marginBottom: 5, marginLeft: 6}}>Welcome to Rwanda Soccer LiveScore</Text>
                    <Text>Fully Fledged Rwanda Soccer Application</Text>
                </View>

                <TouchableOpacity 
                    activeOpacity={.8}
                    onPress={()=> navigation.navigate('Home')}
                
                >
                    <View style={{marginLeft: 10, marginRight: 10, marginTop: 70, height: 40, backgroundColor: '#212437', borderRadius: 20, justifyContent: 'center'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{marginLeft: 140}}>
                                <Text style={{color: COLORS.white}}>GET STARTED</Text>
                            </View>
                            <View style={{marginLeft: 110}}>
                                <Image 
                                    source={icons.chevron_right}
                                    style={{
                                        resizeMode: "contain",
                                        width: 15,
                                        height: 15,
                                        tintColor: COLORS.white,
                                    }}
                                />
                            </View>   
                        </View>      
                </View> 
                </TouchableOpacity>    
            </View>
        </View>
    )
}
export default WelcomeScreen;
const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 180,
      marginBottom: 60
    },
    logo: {
      width: 150,
      height: 150,
    },
  });