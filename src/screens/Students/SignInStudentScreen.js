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
} from '../../common/GConstant';
import {color} from '../../common/GColors';
import AppButton from '../../common/GComponant/AppButton';
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';



FontAwesomeIcon.loadFont();
export default class SignInStudentScreen extends React.Component {
  // Constructor method
  constructor(props) {
    super(props);
    this.state = {
        email: "demo@grr.la",
        password: "Test@123"
    };
  }



  handleSubmit = () => {
    const { email, password} = this.state
    let error = this.validation()
    if (error == "") {
      auth().signInWithEmailAndPassword(email,password).then((response) => {
        Alert.alert("","Successfully Login !!!")
      }).catch((error) => {
        Alert.alert("",error.toString())
        console.log("Error ===> ", error.toString())
      })
    }else{
        Alert.alert("",error)
    }
  }

  validation = () => {
    if (this.state.email.trim().length == 0) {
        return "Please enter email"
    }else if (this.state.password.trim().length == 0){
        return "Please enter password"
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
          source={require('../../assets/images/Logo.png')}
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

            <Fumi
                label={'Password'}
                iconClass={FontAwesomeIcon}
                iconName={'lock'}
                iconColor={color.darkBlue}
                value={this.state.password}
                iconSize={20}
                iconWidth={40}
                inputPadding={16}
                keyboardType={"ascii-capable"}
                returnKeyType={"done"}
                style={{marginTop: getHeight(20)}}
                onChangeText={(text) => {this.setState({password: text})}}
                secureTextEntry
            />
        </View>
        <TouchableOpacity style={style.vwForgot}>
          <Text style={style.btnForgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <AppButton style={style.btnSignup} title={'Login'} onPress={() => this.handleSubmit()}/>
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
