import { Text, View, StyleSheet, Image, SafeAreaView, TouchableOpacity, FlatList, Animated, ScrollView, ActivityIndicator } from "react-native";
import React, {useState, useEffect, useContext} from 'react'
import { COLORS, FONTS, icons, images, SIZES } from "../constants";

import { NewsContext } from "../context/NewsContext";

const NewsScreen = ({navigation}) => {
    const { news, isLoading, newsFromFourth, setNews } = useContext(NewsContext);

    const scrollX = new Animated.Value(0);
    // const [news, setNews] = useState(newsData);
    // const [newsFromFourth, setNewsFromFourth] = useState(news);
    const [refresh, setRefresh] = useState(true);

//   console.log(news);
  const fetchNews = () => {
    setNews(news);
    setRefresh(false);
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
                    <View style={{borderColor: COLORS.darkgray, borderWidth: 0.1, borderRadius: 5, marginRight: 10, marginLeft: 0, width: 450, height: 50, width: 420, height: 330}}>
                    <View style={{marginBottom: 10, marginTop: 30, marginLeft: -27}}>
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
                    <View style={{marginLeft: 10, marginTop: 0}}>
                        <Text numberOfLines={2} style={{fontSize: 16, fontWeight: 'bold'}}>{item.title} </Text>
                    </View>

                    <View style={{marginLeft: 10, marginBottom: 8}}>
                        {/* <Text> {item.date_inserted} </Text> */}
                        <Text>{new Date(item.date_inserted.seconds * 1000).toLocaleDateString("en-US")}</Text>
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
        <View style={{ height: 30, marginTop: 10 }}>
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
                <Image 
                    source={icons.latest}
                    resizeMode='contain'
                    style={{
                        width: 22,
                        height: 22,
                        tintColor: COLORS.black
                    }}
                />
                <Text style={{...FONTS.h2, fontWeight: 'bold', marginBottom: 10, marginLeft: 5, marginTop: -5}}>Latest Stories</Text>
            </View>
        </View>
    )
    }

function renderNewsVertical() {

    const renderNewsVeri = ({item}) => {
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
                            width: 160,
                            height: 100,
                            borderRadius: 5
                          }}
                    />
                </View>
                <View style={{marginLeft: 10, flex: 1}}>
                    <Text numberOfLines={3} style={{...FONTS.body3, fontWeight:'bold', marginBottom: 10}}>{item.title} </Text>
                    <View style={{width: 80, backgroundColor: COLORS.black, justifyContent: 'center', alignItems: 'center', borderRadius: 5}}>
                        <Text style={{color: COLORS.white}}> {item.category} </Text>
                    </View>
                </View>
            </View>
            </TouchableOpacity>
        )
    }
    return (
        // isLoading == true ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 250}}><ActivityIndicator size='large' color='#212437' /></View>
                // : error ? <View><Text>{error}</Text></View>
                // : 
                news?.length < 1 ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 250}}><ActivityIndicator size='large' color='#212437' /></View>
                :
                <FlatList 
                    data={news}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderNewsVeri}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={renderAtTopNews}
                    // refreshing={refresh}
                    // onRefresh={() => fetchNews()}
                />
    )
}

    return (
      <SafeAreaView>
          {renderNewsVertical()}
      </SafeAreaView>
    )

}

export default NewsScreen

const styles = StyleSheet.create({})