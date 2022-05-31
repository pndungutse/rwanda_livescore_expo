import { Text, View, StyleSheet, Image, SafeAreaView, TouchableOpacity, FlatList, Alert, Button, ActivityIndicator } from "react-native";
import moment from "moment";
import React, {useState, useCallback, useContext, useEffect} from 'react'
import { HightlightContext } from '../context/HighlightContext'
import Header from '../components/Header'
import { COLORS, FONTS, icons, images, SIZES } from "../constants";
import YoutubePlayer from "react-native-youtube-iframe";
import { Fontisto, AntDesign, MaterialIcons, Ionicons, MaterialCommunityIcons, EvilIcons } from '@expo/vector-icons';
import { Dimensions} from 'react-native'


const HighlightScreen = ({navigation}) => {
  const { highlights, setHighlights, isLoading, error, refresh, setRefresh } = useContext(HightlightContext);
  const [playing, setPlaying] = useState(false);

  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width

  
    // getYoutubeMeta('AXj3Fa1gK2I').then(meta => {
    //   Alert.alert('title of the video : ' + meta.title);
    // });
  

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const fetchHighlights = () => {
    setHighlights(highlights);
    setRefresh(false);
}

function renderHighlightHeader() {
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
      <View style={{position: 'absolute', bottom: 80, marginLeft: 320}}>
          <View style={{justifyContent: 'center'}}>
          <TouchableOpacity>
            {/* <Text style={{color: '#000000'}}>Refresh</Text> */}
            <EvilIcons name="refresh" size={40} color="#000" style={{fontSize: 40}}/>
          </TouchableOpacity>

        </View>
      </View>
  )
}

function renderHeader() {
  return (
    <View style={{flexDirection: 'row', marginLeft: (width-(width-10))}}>
      <MaterialIcons style={{
        marginTop: (width-(width-5))
      }} name="autorenew" size={22} color="black" />
      <Text style={{...FONTS.h2, fontWeight: 'bold', marginBottom: (width-(width-10)), marginLeft: (width-(width-5))}}>Latest Highlights</Text>
  </View>
  )
}

  function renderHighlights() {

    const renderHighlight = ({item}) => {
      // console.log(item)
        return (

          <TouchableOpacity 
          onPress={()=> navigation.navigate('HighlightDetail', {
            item
        })}
            activeOpacity={.8}
            
          >
          <View style={{borderColor: COLORS.darkgray, width: width-(width - (width-20))}}>
            <View style={{marginBottom: (width-(width-5)), marginLeft: (width-(width-10)), borderRadius: 5}}>
                {/* <YoutubePlayer
                  height={180}
                  width={340}
                  play={false}
                  videoId={item.link}
                  onChangeState={onStateChange()}
                  initialPlayerParams={{
                    loop: false,
                    controls: 0,
                    showClosedCaptions: false,
                    iv_load_policy: 3
                  }}
                  
                /> */}
                <View style={{width:  width-(width - (width-20)), height: height/4}}>
                  <Image 
                    source={{uri: item?.thumbnail}} 
                    // resizeMode="contain"
                    
                    style={{
                        width:  width-(width - (width-20)),
                        height: height/4,
                        borderRadius: 5
                    }}
                  />
                  <View style={{
                    alignItems: 'center',
                    marginTop: -100
                  }}>
                    <AntDesign name="youtube" size={30} color="white" />
                  </View>
                </View>
                 
                <View style={{justifyContent: 'space-between', marginTop: -25, flexDirection: 'row'}}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{marginRight: 0, marginTop: -7}}>
                      <MaterialIcons name="arrow-left" size={37} color="white" />
                    </View>
                    <View>
                      <MaterialIcons name="play-arrow" size={24} color="white" />
                    </View>
                  </View>

                  <View style={{flexDirection: 'row', marginTop: 5}}>
                    <View style={{marginLeft: 5, marginRight: 5}}>
                      <Ionicons name="settings" size={14} color="white" />
                    </View>
                    <View style={{marginTop: -3, marginLeft: 2, marginRight: 5}}>
                      <MaterialCommunityIcons name="rectangle-outline" size={20} color="white" />
                    </View>
                    <View style={{marginTop: -3, marginRight: 5}}>
                      <MaterialCommunityIcons name="code-brackets" size={20} color="white" />
                    </View>
                  </View>
                </View>
            </View>
          <View style={{marginLeft: 10, marginTop: 0, marginBottom: 5}}>
              <Text numberOfLines={2} style={{fontSize: 16, fontWeight: 'bold'}}>{item.title} </Text>
          </View>
          <View style={{marginLeft: 10, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontWeight: 'bold', fontSize: 12}}>{moment(item.date_added.toDate()).startOf('hour').fromNow()}</Text>
              <Text style={{fontWeight: 'bold', fontSize: 11}}>{item.source}</Text>
              <Text style={{fontWeight: 'bold', fontSize: 11}}>{item.category}</Text>

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
                highlights?.length < 1 ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 250}}><ActivityIndicator size='large' color='#212437' /></View>
                :
                <FlatList 
                    data={highlights}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderHighlight}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={renderHeader}
                    refreshing={refresh}
                    onRefresh={() => fetchHighlights()}
                    style={{
                      marginTop: 5,
                      marginBottom: width - (width - 106)
                    }}
                />
    )
}

  return (
    <SafeAreaView>
          {/* <Header /> */}
          {renderHighlightHeader()}
          {renderHighlights()}
          {renderRefreshButton()}
          {/* <View style={{marginBottom: 10}}></View> */}
      </SafeAreaView>
  )
}

export default HighlightScreen

const styles = StyleSheet.create({})