import React from 'react';
import {
    Alert,
  Image,
  SafeAreaView,
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
} from '../common/GConstant';
import {color} from '../common/GColors';
import AppButton from '../common/GComponant/AppButton'
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';



FontAwesomeIcon.loadFont();
export default class ForgotPasswordScreen extends React.Component {
  // Constructor method
  constructor(props) {
    super(props);
    this.state = {
        email: "demo@grr.la",
    };
  }



  handleSubmit = () => {
    const { email} = this.state
    let error = this.validation()
    if (error == "") {
        auth().sendPasswordResetEmail(email).then((response) => {
            Alert.alert("","Please check your email !!!")
            this.props.navigation.pop()
        }).catch((error) => {
            console.log("Error ==> ", error);
            Alert.alert("",error.toString())
        })
    }else{
        Alert.alert("",error)
    }
  }

  validation = () => {
    if (this.state.email.trim().length == 0) {
        return "Please enter email"
    }
    return ""
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
        <View style={{
            marginHorizontal: getWidth(27),
            marginTop: getHeight(80)
        }}>
            <Fumi
                label={'Email address'}
                iconClass={FontAwesomeIcon}
                iconName={'user'}
                iconColor={color.darkBlue}
                iconSize={20}
                iconWidth={40}
                inputPadding={16}
                keyboardType={"email-address"}
                returnKeyType={"done"}
                style={{marginTop: getHeight(20)}}
                value={this.state.email}
                onChangeText={(text) => this.setState({email: text})}
            />
        </View>
        <AppButton style={style.btnSignup} title={'Forgot Password'} onPress={() => this.handleSubmit()}/>
      </View>
    );
  }
}

// Class Styles

const style = StyleSheet.create({
  // Image Styles
  imgLogo: {
    alignSelf: 'center',
    marginTop: getHeight(20),
  },

  // Button Styles
  btnSignup: {
    marginTop: getHeight(50),
    marginHorizontal: getWidth(27),
  },
  btnForgot: {
    fontWeight: "500",
    fontSize: fontSize.size14,
    color: color.darkBlue
  },


  //View
  vwForgot: {
    marginHorizontal: getWidth(27),
    marginTop: getHeight(10),
    alignItems: "flex-end"
  }
});
