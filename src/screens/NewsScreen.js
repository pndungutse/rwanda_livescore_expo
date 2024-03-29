import { Text, View, StyleSheet, Image, SafeAreaView, TouchableOpacity, FlatList, Animated, ScrollView, ActivityIndicator } from "react-native";
import moment from "moment";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, useContext} from 'react'
import { COLORS, FONTS, icons, images, SIZES } from "../constants";
import { Dimensions} from 'react-native';
import { db, storage, app } from '../config/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { Ionicons, FontAwesome, EvilIcons, Fontisto } from '@expo/vector-icons'; 

import { NewsContext } from "../context/NewsContext";
import { MaterialIcons } from '@expo/vector-icons'; 
import Header from "../components/Header";

const NewsScreen = ({navigation}) => {
    const { news, isLoading, newsFromFourth, setNews, error, refresh, setRefresh, getNews } = useContext(NewsContext);

    const scrollX = new Animated.Value(0);
    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width
    // const [news, setNews] = useState(newsData);
    // const [newsFromFourth, setNewsFromFourth] = useState(news);
    // const [refresh, setRefresh] = useState(true);

//   console.log(news);



  const fetchNews = () => {

    getNews();
    // setNews(news);
    setRefresh(false);
}

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

  const renderRefreshButton = () => {
      return (
          <View style={{position: 'absolute', bottom: 0, marginLeft: 320}}>
              <View style={{justifyContent: 'center'}}>
              <TouchableOpacity>
                {/* <Text style={{color: '#000000'}}>Refresh</Text> */}
                <EvilIcons name="refresh" size={40} color="#000" style={{fontSize: 40}}/>
              </TouchableOpacity>

            </View>
          </View>
      )
  }

  function renderNewsHorizontalOrg() {
    return (
        <Animated.ScrollView
            horizontal
            pagingEnabled
            scrollEventThrottle={16}
            snapToAlignment='center'
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([
                {nativeEvent: {contentOffset: {x: scrollX}}}
            ], {useNativeDriver: false})}
        >
            {news?.slice(0, 3).map((item, index) => (
                <TouchableOpacity 
                    key={`news-${index}`}
                    onPress={()=> navigation.navigate('NewsDetail', {
                        item
                      })}
                      activeOpacity={.8}
                      
                    >
                    <View style={{borderColor: COLORS.darkgray, borderWidth: 0.1, borderRadius: 5, marginRight: 10, marginLeft: 0, width: 450, height: 50, width: width, height: 300}}>
                    <View style={{marginBottom: 10, marginTop: 0, marginLeft: -27}}>
                        <Image 
                            source={{uri: item.image}}
                            resizeMode='contain'
                            style={{
                                width: 420,
                                height: 220,
                                borderRadius: 10
                            }}
                        /> 
                        {/* show news category */}
                        <View style={{bottom: -25, width: SIZES.width, height: 55, justifyContent: 'center', position: 'absolute'}}>
                            <View style={{width: 80, backgroundColor: COLORS.black, marginLeft: 30, alignItems: 'center',borderTopLeftRadius: 6, borderTopRightRadius: 6, borderBottomLeftRadius: 6, borderBottomRightRadius: 6}}>
                                <Text style={{color: COLORS.white}}> {item.category} </Text>
                            </View>
                        </View>
                        {/* Title */}
                    
                    </View>
                    <View style={{marginLeft: 10, marginTop: 0, marginBottom: 5}}>
                        <Text numberOfLines={2} style={{fontSize: 16, fontWeight: 'bold'}}>{item.title} </Text>
                    </View>

                    <View style={{marginLeft: 10, marginBottom: 8}}>
                        {/* <Text> {item.date_inserted} </Text> */}
                        {/* <Text>{new Date(item.date_inserted.seconds * 1000).toLocaleDateString("en-US")}</Text> */}
                        <Text style={{fontSize: 12}}>{moment(item.date_inserted.toDate()).startOf('hour').fromNow()}</Text>
                        {/* <Text style={{fontSize: 12}}>To put date</Text> */}

                    </View>

                </View>
                </TouchableOpacity>

                
            ))
            }
        </Animated.ScrollView>
    )
}

function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width)

    return (
        <View style={{ height: 25, marginTop: 10 }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: SIZES.padding
                }}
            >
                {news?.slice(0, 3).map((item, index) => {

                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: "clamp"
                    })

                    const dotSize = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [SIZES.base * 1.05, 15, SIZES.base * 1.05],
                        extrapolate: "clamp"
                    })

                    const dotColor = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [COLORS.darkgray, '#212437', COLORS.darkgray],
                        extrapolate: "clamp"
                    })

                    return (
                        <Animated.View
                            key={`dot-${index}`}
                            opacity={opacity}
                            style={{
                                borderRadius: SIZES.radius,
                                marginHorizontal: 6,
                                width: dotSize,
                                height: dotSize,
                                backgroundColor: dotColor
                            }}
                        />
                    )
                })}
            </View>
        </View>
    )
}

function renderAtTopNews() {
    return (
        <View>
            <View>
                {renderNewsHorizontalOrg()}
            </View>
            <View>
                {renderDots()}
            </View>
            <View style={{flexDirection: 'row', marginLeft: 10}}>
                {/* <Image 
                    source={icons.latest}
                    resizeMode='contain'
                    style={{
                        width: 22,
                        height: 22,
                        tintColor: COLORS.black
                    }}
                /> */}
                <MaterialIcons name="autorenew" size={22} color="black" />
                <Text style={{...FONTS.h2, fontWeight: 'bold', marginBottom: 10, marginLeft: 5, marginTop: -5}}>Latest Stories</Text>
            </View>
        </View>
    )
    }

function renderNewsVertical() {

    const renderNewsVeri = ({item}) => {
        // console.log(item.date_inserted);
        return (

            <TouchableOpacity
                onPress={()=> navigation.navigate('NewsDetail', {
                    item
                })}
                activeOpacity={.8}
            >
                <View style={{flexDirection: 'row', marginBottom: 15, marginLeft: 10}}>
                <View>
                    <Image 
                        source={{uri: item.image}}
                        style={{
                            width: (width/2 - (width-(width-30))),
                            height: height/8 + (width-(width-1)),
                            borderRadius: 5
                          }}
                    />
                </View>
                <View style={{marginLeft: (width-(width-10)), flex: 1}}>
                    <Text numberOfLines={3} style={{...FONTS.body3, fontWeight:'bold', marginBottom: (width-(width-10)), width: (width/2)}}>{item.title} </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{width: 80, backgroundColor: COLORS.black, justifyContent: 'center', alignItems: 'center', borderRadius: 5}}>
                            <Text style={{color: COLORS.white}}> {item.category} </Text>
                        </View>
                        <Text style={{fontSize: 11, marginRight: (width-(width-25))}}> {moment(item.date_inserted.toDate()).startOf('hour').fromNow()}</Text>

                    </View>
                </View>
            </View>
            </TouchableOpacity>
        )
    }
    return (
        // isLoading == true ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 250}}><ActivityIndicator size='large' color='#212437' /></View>
                // : error ? <View><Text>{error}</Text></View>
                error ? <View><Text>{error}</Text></View>

                : 
                news?.length < 1 ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 250}}><ActivityIndicator size='large' color='#212437' /></View>
                :
                <FlatList 
                    data={news.slice(3)}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderNewsVeri}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={renderAtTopNews}
                    refreshing={refresh}
                    style={{marginBottom: width - (width - 27)}}
                    onRefresh={() => fetchNews()}
                />
    )
}

    return (
      <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
          {/* <Header /> */}

          {renderHeader()}
          {renderNewsVertical()}
          {renderRefreshButton()}
      </SafeAreaView>
    )

}

export default NewsScreen

const styles = StyleSheet.create({})