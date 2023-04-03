import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  asyncStorageKey,
  fontSize,
  getData,
  getHeight,
  getWidth,
} from '../../common/GConstant';
import {color} from '../../common/GColors';
import firestore from '@react-native-firebase/firestore';

export default class AdminNoticeListScreen extends React.Component {
  // Constructor method
  constructor(props) {
    super(props);
    this.state = {
      eventData: [],
      userData: undefined
    };
  }

  componentDidMount() {
    // Header navigation setup
    this.props.navigation.addListener('focus', () => {
      this.getEventData();
    });

    getData(asyncStorageKey.userData, data => {
      console.log("userData ====> ", data)
      if (data != undefined) {
        this.props.navigation.setOptions({
          headerRight: () =>  (
            <TouchableOpacity
              style={{ 
                padding: getHeight(8),
                backgroundColor: color.darkBlue, 
                borderRadius: getHeight(4),
                flexDirection: "row",
                alignItems: "center"
            }}
            onPress={() => this.props.navigation.navigate('AddNotificationScreen')}>
              <Image source={require("../../assets/images/Plus.png")}/>
              <Text style={style.lblAdd}>Add</Text>
            </TouchableOpacity>
          ) ,
          headerTitle: "Notification",
          headerShadowVisible: false, // Use to hide shadow under the navigation bar
        });
      }
      this.setState({
        userData: data
      })
    })
    // ========================================================================
  }

getEventData = async () => {
  let eventData = []
  await firestore().collection('notification').get().then((queryShot) => {
    queryShot.forEach((item) => {
      var event = item.data()
      event["id"] = item.id
      console.log("Event Data ===> ", event)
      eventData.push(event)
    })
  })

  this.setState({
    eventData: eventData
  })
  
}

  
  // Render Method
  render() {
    return (
      <View style={{flex: 1, backgroundColor: color.white}}>
        <StatusBar
          backgroundColor={color.white}
          barStyle={'dark-content'}
          animated={true}
        />
        <SafeAreaView />
      <ScrollView>
        {
          this.state.eventData.map((item) => {
            return(
            <TouchableOpacity 
                style={style.vwEvent} 
                activeOpacity={1.0}
            >
              <Text style={style.lblTitle}>Notification Name: {item?.name}</Text>
              <Text style={style.lblDate}>{"Date: " + item?.insertDate}</Text>
              <Text style={[style.lblDate,{fontWeight: "400"}]} numberOfLines={3}>{item?.description}
              </Text>
            </TouchableOpacity>
            )
          })
        }
      </ScrollView>
      </View>
    );
  }
}

// Class Styles

const style = StyleSheet.create({
  // Label Styles
  lblTitle: {
    fontSize: fontSize.size17,
    fontWeight: "600",
    color: color.btnBlue,
  },
  lblDate: {
    fontSize: fontSize.size14,
    fontWeight: "500",
    color: color.darkBlue,
    marginTop: getHeight(1),
    lineHeight: getHeight(20)
  },
  lblAdd: {
    fontSize: fontSize.size15,
    fontWeight: '600',
    textAlign: 'center',
    color: color.white,
    marginLeft: getWidth(4)
  },

  //View Style
  vwEvent: {
    flex: 1,
    paddingHorizontal: getWidth(22),
    paddingVertical: getHeight(15),
    backgroundColor: color.white,
    borderRadius: getHeight(10),
    marginTop: getHeight(30),
    marginHorizontal: getWidth(20),
    shadowRadius: 16,
    shadowOpacity: 1,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#FFFFFF13",
    shadowOffset: { height: 4, width: 4 },
    shadowColor: Platform.select({ ios: "#05273E20", android: color.black }),
  },
});
