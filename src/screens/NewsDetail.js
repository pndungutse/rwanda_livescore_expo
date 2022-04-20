import React, { useState, useEffect, useContext } from "react";
import { COLORS, FONTS, icons, images, SIZES } from "../constants";
import { Text, View, StyleSheet, Image, SafeAreaView, TouchableOpacity, FlatList, Animated, ScrollView, ActivityIndicator } from "react-native";

import { NewsContext } from "../context/NewsContext";

const NewsDetail = ({route, navigation}) => {

  const { news, isLoading, newsFromFourth, setNews } = useContext(NewsContext);


    const fetchNews = () => {
        setNews(news);
    }

    const [wholeNew, setWholeNew] = useState();
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        let {item} = route.params;
        setWholeNew(item);
        fetchNews(); 
        setRefresh(false)
    }, []);


    function newsDetail() {
        return (
            <View>
            <View style={{marginBottom: 180, marginTop: 30}}>
                
                <View style={{marginBottom: 10, position: 'absolute', marginLeft: -10}}>
                    
                    <Image 
                        source={{uri: wholeNew?.image}}
                        resizeMode='contain'
                        style={{
                            width: 380,
                            height: 220,
                        }}
                    />
                </View>

                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => navigation.goBack()}
                >
                <View style={{padding: 5}}>
                    <Image 
                        source={icons.chevron_left}
                        resizeMode='contain'
                        style={{
                            width: 40,
                            height: 40,
                            tintColor: COLORS.white,
                            backgroundColor: '#212437',
                            marginLeft: 5
                        }}
                    />
                </View>
            </TouchableOpacity>
            </View>
            <View style={{marginLeft: 10, }}> 
                <Text style={{fontSize: 17, fontWeight: 'bold' ,color: '#212437', marginBottom: 10}}>{wholeNew?.category}</Text>
                <Text style={{fontSize: 18, fontWeight: 'bold' ,color: COLORS.black, marginBottom: 30}}>{wholeNew?.title} </Text>
                <Text style={{fontSize: 17, marginBottom: 20}}>{wholeNew?.desc} </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold' ,color: '#212437', marginBottom: 15}}>Recent News</Text>
            </View>   
        </View>
        )
    }

    function renderRecentNews() {
        const renderRecentVeri = ({item}) => {
            return (
                <TouchableOpacity
                    onPress={()=> navigation.navigate('NewsDetail', {
                        item
                    })}
                >
                    <View style={{flexDirection: 'row', marginBottom: 15, marginLeft: 10}}>
                    <View>
                        <Image 
                            source={{uri: item?.image}}
                            style={{
                                width: 160,
                                height: 100,
                                borderRadius: 5
                              }}
                        />
                    </View>
                    <View style={{marginLeft: 10}}>
                        <Text style={{...FONTS.body2, fontWeight:'bold', marginBottom: 10}}>{item?.title} </Text>
                        <View style={{width: 80, backgroundColor: COLORS.black, justifyContent: 'center', alignItems: 'center', borderRadius: 5}}>
                            <Text style={{color: COLORS.white}}> {item?.category} </Text>
                        </View>
                    </View>
                </View>
                </TouchableOpacity>
            )   
        }

        return (
            isLoading ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 300}}><ActivityIndicator size='large' color='#212437' /></View>
                    // : error ? <View><Text>{error}</Text></View>
                    : news?.length <= 1 ? <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}><Text style={{color: '#6d071a'}}>No other news available for now</Text></View>
                    :
                    <FlatList 
                        data={news}
                        keyExtractor={item => `${item.id}`}
                        renderItem={renderRecentVeri}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={newsDetail}
                    />
        )
    }

    

    return (
        <SafeAreaView>

            {renderRecentNews()}
        </SafeAreaView>
    )
}
export default NewsDetail;