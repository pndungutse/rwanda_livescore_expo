import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import YoutubePlayer from "react-native-youtube-iframe";
import { COLORS } from "../constants";

const HighlightDetail = ({route, navigation}) => {
    const [wholeItem, setWholeItem] = useState(route.params.item);

    useEffect(() => {
        let {item} = route.params;
        console.log(item);
        // setWholeItem(item);
    }, []);
  return (

    <View style={{marginBottom: 5, marginTop: 35, marginLeft: 10, marginRight: 10, borderRadius: 5}}>
        <YoutubePlayer
          height={350}
        //   width={340}
          play={true}
          videoId={wholeItem.link}
        //   onChangeState={onStateChange()}
          initialPlayerParams={{
            loop: false,
            showClosedCaptions: false,
            iv_load_policy: 3
          }}
          
        />

         
    </View>

  )
}

export default HighlightDetail

const styles = StyleSheet.create({})