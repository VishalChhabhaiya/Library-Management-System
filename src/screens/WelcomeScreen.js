import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  fontSize,
  getHeight,
  getWidth,
} from '../common/GConstant';
import {color} from '../common/GColors';
import AppButton from '../common/GComponant/AppButton';

export default class WelcomeScreen extends React.Component {
  // Constructor method
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
    };
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
          source={require('../assets/images/Logo.png')}
          resizeMode="stretch"
        />

        <Text style={style.lblWelcome}>
          A library is not a luxury but one of the necessities of life.
        </Text>

        <View
          style={{
            alignSelf: "center",
            position: 'absolute',
            width: '90%',
            bottom: getHeight(20),
          }}>
          <AppButton style={style.btnSignup} title={'Get Started With Admin !!!'} onPress={() => this.props.navigation.navigate('AdminLoginScreen')} />
          <AppButton style={style.btnSignup} title={'Get Started With Student !!!'} onPress={() => this.props.navigation.navigate('SignUpStudentScreen')} />
          <AppButton style={style.btnSignup} title={'Get Started With Teacher !!!'} onPress={() => this.props.navigation.navigate('SignUpTeachersScreen')}/>
        </View>
      </View>
    );
  }
}

// Class Styles

const style = StyleSheet.create({
  // Label Styles
  lblWelcome: {
    flex: 1,
    alignItems: 'center',
    marginTop: getHeight(280),
    marginHorizontal: getWidth(30),
    fontSize: fontSize.size18,
    fontWeight: '600',
    textAlign: 'center',
    color: color.darkBlue,
    justifyContent: 'center',
  },

  // Image Styles
  imgLogo: {
    alignSelf: 'center',
    marginTop: getHeight(20),
  },

  // Button Styles
  btnSignup: {
    marginTop: getHeight(10),
    width: "100%"
    // marginHorizontal: getWidth(28),
  },
});
