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
import firestore from '@react-native-firebase/firestore';


export default class BookSlotScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.route.params?.data,
      fromDate: "",
      toDate: "",
      userData: undefined
    };
  }

  getDictData = () => {
    const {
      categoryData,
      bookingType,
      data,
      extraCharges,
      serviceImageArray,
      isChange,
      providerID,
      price,
    } = this.state;
    console.log('Data : ', this.props.route.params?.SelectServiceLocation);

    var dictData = {
      category_id: categoryData.category_id,
      subcategory_id: categoryData.subcategory_id,
      address_id: this.props.route.params?.SelectServiceLocation.address_id,
      service_latitude: this.props.route.params?.SelectServiceLocation.latitude,
      service_longitude:
        this.props.route.params?.SelectServiceLocation.longitude,
      booking_type: bookingType == 0 ? 'schedule' : 'immediate',
      service_cost: data.price,
      extra_charge: isChange ? extraCharges : 0,
      is_quarantine: '0',
      total: price,
      discount: 0,
    };

    data['address'] = this.props.route.params?.SelectServiceLocation;
    if (serviceImageArray.length > 0) {
      dictData['service_image'] = serviceImageArray;
    }
    if (bookingType === 0) {
      dictData['service_date'] = this.props.route.params?.SelectServiceDate;
      dictData['service_time'] =
        this.props.route.params?.SelectAvailableTimingsforService;
    }
    if (this.props.route.params?.NoteforServiceProvider != '') {
      dictData['provider_note'] =
        this.props.route.params?.NoteforServiceProvider;
    }
    if (isChange) {
      dictData['preffered_provider_id'] = providerID;
    }

    console.log('BOOKING PARAMS ===> ', dictData);
    return dictData;
  };

  // Life cycle method
  componentDidMount() {
    console.log("Book Data ===> ", this.props.route.params.data)
    getData(asyncStorageKey.userData, data => {
      this.setState({
        userData: data
      })
    })
    this.props.navigation.setOptions({
      title: '',
      headerShadowVisible: false, // Use to hide shadow under the navigation bar
    });
    // ========================================================================
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

  handleToDate = (date) => {
    console.log("DATE ====> ", date)
    this.setState({
      toDate: date
    }) 
  }

  handleValidation = () => {
    if (this.state.fromDate == "") {
      Alert.alert("","Please select from date")
    }else if (this.state.toDate == "") {
      Alert.alert("","Please select to date")
    }else{
      this.handleBookSlot()
    }
  }

  handleBookSlot = () => {
    let dictData = {
      toDate: this.state.toDate,
      fromDate: this.state.fromDate,
      uid: this.state.userData?.uid,
      name: this.state.userData?.name,
      email: this.state.userData.email,
      bookID: this.state.data.id,
      bookName: this.state.data.name,
      gerneId: this.state.data.gerneId
    }

    console.log("DICT DATA ===> ", dictData)
    firestore()
    .collection('booksBooking')
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
    const {
      data,
    } = this.state;
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
                {"Booking Info"}
              </Text>
              <Text style={styles.bookTitle}>
                {data?.name}
              </Text>
            </View>
            <Image
              source={require("../assets/images/Book.png")}
              style={styles.imgHeaderRight}
            />
          </View>
          {this.renderHeaderList("Select Booking From Date")}
          {this.renderDataView(this.state.fromDate, () => this.props.navigation.navigate('SelectDateScreen',{
            handleDate: this.handleFromDate,
            index: false
          }), require("../assets/images/clock.png"), "From Date")}
          {this.renderHeaderList("Select Booking To Date")}
          {this.renderDataView(this.state.toDate, () => this.props.navigation.navigate('SelectDateScreen',{
            handleDate: this.handleToDate,
            toDate: true,
            passdate: this.state.fromDate
          }), require("../assets/images/clock.png"), "To Date")}
          
    
        </ScrollView>

        {/* Proceed to Book with book */}
        <AppButton
            title={"Proceed to book"}
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
