import firestore from '@react-native-firebase/firestore';
import React, {Component} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {color} from '../common/GColors';
import AppButton from '../common/GComponant/AppButton';
import { asyncStorageKey, fontSize, getData, getHeight, getWidth, } from '../common/GConstant';

export default class CreateReadingSlotScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: "",
      timing: "",
      userData: undefined
    };
  }

  // Life cycle method
  componentDidMount() {
    this.props.navigation.setOptions({
      title: '',
      headerShadowVisible: false, // Use to hide shadow under the navigation bar
    });
    // ========================================================================

    getData(asyncStorageKey.userData, data => {
      console.log("MY DATA ===> ", data)
      this.setState({
        userData: data
      })
    })
  }

  renderHeaderList = (title) => {
    return (
      <View
      style={{
        paddingVertical: getHeight(20),
        backgroundColor: 'rgba(241, 246, 249, 0.7)',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.04)',
      }}>
      <Text
        style={{
          fontWeight: "600", 
          fontSize: fontSize.size14, 
          color: color.darkBlue,
          marginHorizontal: getWidth(20)
        }}
      >
        {title}
      </Text>
    </View>
    )
  }

  renderDataView = (title, onPress, sourceImage, placeHolder) => {
    return (
      <TouchableOpacity onPress={onPress} >
      <View
        style={{
          backgroundColor: color.white,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: 'rgba(0, 0, 0, 0.04)',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: getWidth(20),
          
        }}>
        <View
          style={{
            height: getHeight(50),
            aspectRatio: 1 / 2,
            justifyContent: 'center',
            marginRight: getWidth(5),
          }}>
          <Image source={sourceImage} />
        </View>
        <View style={{flex: 1, paddingRight: getWidth(20)}}>
          <Text
            style={{
              fontWeight: "600",
              fontSize: fontSize.size15,
              color: color.darkBlue50,
            }}>
            {title != "" ? title : placeHolder}
          </Text>
        </View>
        <Image source={require("../assets/images/RightArow.png")} style={{tintColor: 'rgb(0, 0, 0)'}} />
      </View>
    </TouchableOpacity>
    )
  }

  handleFromDate = (date) => {
      this.setState({
        fromDate: date
      })
  }

  handleTime = (time) => {
    console.log("TIME ====> ", time)
    this.setState({
      timing: time.time
    }) 
  }

  handleValidation = () => {
    if (this.state.fromDate == "") {
      Alert.alert("", "Please select date")
    }else if (this.state.timing == "") {
      Alert.alert("", "Please select timing")
    }else{
      this.handleBookSlot()
    }
  }

  handleBookSlot = () => {
    let dictData = {
      time: this.state.timing,
      date: this.state.fromDate,
      uid: this.state.userData?.uid,
      name: this.state.userData?.name,
      email: this.state.userData.email
    }

    console.log("DICT DATA ===> ", dictData)
    firestore()
    .collection('read̀̀Booking')
    .add(dictData)
    .then(res => {
      console.log('ADDED ===>', res);
      Alert.alert("",
        'Your Booking has been added successfully...',
      );
      this.props.navigation.pop();
    })
    .catch(error => {
      console.log('Firebase Error : ' + error);
    });
  }

  render() {
    return (
      <View style={styles.main}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          style={{flexGrow: 1, backgroundColor: color.white}}
          contentContainerStyle={{paddingBottom: getHeight(50)}}>
          <View style={styles.mainHeader}>
            <View>
              <Text style={styles.bookInfo}>
                {"Reading Slot Info"}
              </Text>
            </View>
            <Image
              source={require("../assets/images/readBook.png")}
              style={styles.imgHeaderRight}
            />
          </View>
          {this.renderHeaderList("Select Booking Date")}
          {this.renderDataView(this.state.fromDate, () => this.props.navigation.navigate('SelectDateScreen',{
            handleDate: this.handleFromDate,
            index: false
          }), require("../assets/images/clock.png"), "Select Date")}
          {this.renderHeaderList("Select Time Slot")}
          {this.renderDataView(this.state.timing, () => this.props.navigation.navigate('SelectTimeScreen',{
            handleTime: this.handleTime,
          }), require("../assets/images/clock.png"), "Time Slot")}
          
    
        </ScrollView>

        {/* Proceed to Book with computer */}
        <AppButton
            title={"Book Slot"}
            onPress={() => this.handleValidation()}
            style={{
              marginHorizontal: getWidth(20),
              bottom: 20
            }}
        /> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },

  mainHeader: {
    flexDirection: 'row',
    marginBottom: getHeight(10),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: getWidth(20),
  },

  bookInfo: {
    fontSize: fontSize.size16,
    fontWeight: "700",
    color: color.darkBlue,
    marginTop: getHeight(5),
    textTransform: 'capitalize',
   },

   bookTitle: {
    marginTop: getHeight(5),
    color: color.darkBlue,
    fontWeight: "500",
    fontSize: fontSize.size12
   },
});
