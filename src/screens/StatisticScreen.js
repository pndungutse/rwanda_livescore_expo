import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const StatisticScreen = () => {

  function statistics() {
    return (
      <View style={{marginTop: 35, marginLeft: 10}}>
      <View style={{marginBottom: 3}}>
        <Text style={{fontSize: 28, fontWeight: 'bold', color:'#212437'}}>Statistics</Text>
      </View>
      <View style={{marginBottom: 3}}>
        <Text style={{fontSize: 15, fontWeight: 'bold', color:'#212437'}}>2021/22 Top Statistics</Text>
      </View>
      <View>
      <View style={{flexDirection:'row', justifyContent: 'space-between', marginBottom: 7}}>
        <View style={{backgroundColor: '#fff', borderRadius: 2, borderWidth: 0.1, height: 230., width: 170}}>
          <View>
            <Image 
              source={{uri: 'https://pbs.twimg.com/media/CZP76SBWAAArk5m.jpg'}}
              style={{
                height: 230,
                width: 170
              }}
            />
            <View style={{height: 60, width: 168, marginLeft: 1.5, backgroundColor: '#212437', marginTop: -60, borderRadius: 5}}>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 14, color: COLORS.white, fontWeight: 'bold'}}>22</Text>
                <Text style={{fontSize: 14, color: COLORS.white, fontWeight: 'bold'}}>Goals</Text>

              </View>
            </View>
          </View>
        </View>
       
       
        <View style={{backgroundColor: '#fff', borderRadius: 5, borderWidth: 0.1, height: 230., width: 160, marginRight: 7}}>
          <View>
            <Image 
              source={{uri: 'https://www.kigalitoday.com/IMG/jpg/sefu-9.jpg'}}
              style={{
                height: 230,
                width: 160
              }}
            />
            <View style={{height: 60, width: 158, marginLeft: 1.5, backgroundColor: '#212437', marginTop: -60, borderRadius: 5}}>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 14, color: COLORS.white, fontWeight: 'bold'}}>22</Text>
                <Text style={{fontSize: 14, color: COLORS.white, fontWeight: 'bold'}}>Top Assits</Text>
              </View>
            </View>
          </View>
        </View>
    </View>

    <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
        <View style={{backgroundColor: '#fff', borderRadius: 2, borderWidth: 0.1, height: 230., width: 170}}>
          <View>
            <View style={{alignItems: 'center'}}>
              <Image 
                source={{uri: 'https://sortitoutsi.net/uploads/team/5340983.png'}}
                style={{
                  height: 150,
                  width: 150,
                  marginTop: 5
                }}
              />
            </View>
            <View style={{height: 60, width: 168, marginLeft: 1.5, backgroundColor: '#212437', marginTop: 15, borderRadius: 5}}>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 14, color: COLORS.white, fontWeight: 'bold'}}>32</Text>
                <Text style={{fontSize: 14, color: COLORS.white, fontWeight: 'bold'}}>First Team</Text>

              </View>
            </View>
          </View>
        </View>
        <View style={{backgroundColor: '#fff', borderRadius: 2, borderWidth: 0.1, height: 230., width: 170}}>
          <View>
            <View style={{alignItems: 'center'}}>
              <Image 
                source={{uri: 'http://www.footballlogosandkits.com/images_esc3/CAF/RUANDA/escudos_jpg/logo-s.c.%20kiyovu%20sport.jpg'}}
                style={{
                  height: 150,
                  width: 150,
                  marginTop: 5
                }}
              />
            </View>
            <View style={{height: 60, width: 168, marginLeft: 1.5, backgroundColor: '#212437', marginTop: 15, borderRadius: 5}}>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 14, color: COLORS.white, fontWeight: 'bold'}}>30</Text>
                <Text style={{fontSize: 14, color: COLORS.white, fontWeight: 'bold'}}>Second Team</Text>

              </View>
            </View>
          </View>
        </View>
    </View>
    </View>
    </View>
    )
  }
  return (
    <ScrollView>
      {statistics()}
    </ScrollView>

  )
}

export default StatisticScreen

const styles = StyleSheet.create({})