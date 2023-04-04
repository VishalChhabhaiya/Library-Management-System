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
  fontSize,
  getHeight,
  getWidth,
} from '../../common/GConstant';
import {color} from '../../common/GColors';
import { CommonActions } from '@react-navigation/native';

export default class AdminDashBoardScreen extends React.Component {
  // Constructor method
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
    };
  }

  componentDidMount() {
    // Header navigation setup
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{padding: 4}}
          onPress={() => this.handleSignOut()}>
          <Text style={style.lblSignOut}>Sign Out</Text>
        </TouchableOpacity>
      ),
      headerShadowVisible: false, // Use to hide shadow under the navigation bar
    });
    // ========================================================================
  }


handleSignOut = () => {
  this.props.navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: 'WelcomeScreen'}],
    }),
  );
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
        <Image
          style={style.imgLogo}
          source={require('../../assets/images/Logo.png')}
          resizeMode="stretch"
        />
      <ScrollView>
        <TouchableOpacity style={style.vwGernes} onPress={() => this.props.navigation.navigate('AllGernesScreen')}>
          <Text style={style.lblTitle}>{"See all Gernes"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.vwGernes} onPress={() => this.props.navigation.navigate('AllBooksListScreen')}>
          <Text style={style.lblTitle}>{"See all Books"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.vwGernes} onPress={() => this.props.navigation.navigate('BookingHistoryScreen')}>
          <Text style={style.lblTitle}>{"See all Books Bookings"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.vwGernes} onPress={() => this.props.navigation.navigate('AdminNoticeListScreen')}>
          <Text style={style.lblTitle}>{"See all Notifications"}</Text>
        </TouchableOpacity>
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
  lblSignOut: {
    fontSize: fontSize.size15,
    fontWeight: '600',
    textAlign: 'center',
    color: color.darkBlue,
  },

  // Image Styles
  imgLogo: {
    alignSelf: 'center',
    marginTop: getHeight(20),
  },

  //View Style
  vwGernes: {
    flex: 1,
    paddingHorizontal: getWidth(22),
    paddingVertical: getHeight(40),
    alignItems: "center",
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
