import React from 'react';
import {
  Alert,
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

export default class StudentBookingHistoryScreen extends React.Component {
  // Constructor method
  constructor(props) {
    super(props);
    this.state = {
      historyData: [],
      userData: undefined
    };
  }

  componentDidMount() {
    // Header navigation setup
    this.props.navigation.addListener('focus', () => {
      getData(asyncStorageKey.userData, data => {
        console.log("userData ====> ", data)
        if (data != undefined) {
          this.getEventData(data.uid);
          this.setState({
            userData: data
          })
        }
      })
    });

    this.props.navigation.setOptions({
      headerTitle: "History",
      headerShadowVisible: false, // Use to hide shadow under the navigation bar
    });
    // ========================================================================
  }

getEventData = async (id) => {
  let historyData = []
  await firestore().collection('booksBooking').where("uid", "==", id).get().then((queryShot) => {
    if (queryShot.empty) {
      Alert.alert("","No data found !!!")
    }else{
      queryShot.forEach((item) => {
        var history = item.data()
        history["id"] = item.id
        console.log("Event Data ===> ", history)
        historyData.push(history)
      })
    }
  })

  this.setState({
    historyData: historyData
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
          this.state.historyData.map((item) => {
            return(
            <TouchableOpacity 
                style={style.vwEvent} 
                activeOpacity={1.0}
            >
              <Text style={style.lblTitle}>Book Name: {item?.bookName}</Text>
              <Text style={style.lblDate}>{"From Date: " + item?.fromDate}</Text>
              <Text style={[style.lblDate,{marginTop: getHeight(1)}]}>{"To Date: " + item?.toDate}</Text>
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
    marginTop: getHeight(7),
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
