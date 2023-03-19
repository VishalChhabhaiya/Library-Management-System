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
  asyncStorageKey,
  fontSize,
  getHeight,
  getWidth,
  setData,
} from '../../common/GConstant';
import {color} from '../../common/GColors';
import AppButton from '../../common/GComponant/AppButton';
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { CommonActions } from '@react-navigation/native';



FontAwesomeIcon.loadFont();
export default class SignInStudentScreen extends React.Component {
  // Constructor method
  constructor(props) {
    super(props);
    this.state = {
        email: "demo1@grr.la",
        password: "Test@1234"
    };
  }



  handleSubmit = () => {
    const { email, password} = this.state
    let error = this.validation()
    if (error == "") {
      auth().signInWithEmailAndPassword(email,password).then((response) => {
        console.log("User Data ===> ", response)
        firestore().collection('user').where("uid", "==", response.user?.uid).where("role", "==", "student").get().then(querySnapShot => {
          if(querySnapShot.empty) {
            Alert.alert("","Please check your credentials")
          }else{
            querySnapShot.docs.map((item) => {
              console.log("Data  ===> ", item.data())
              setData(asyncStorageKey.userData, item.data())
              this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'StudentDashBoardScreen'}],
                }),
              );
            })
          }
        }).catch((error) => {
          console.log("Error1 ===> ", error.toString())  
        })
      }).catch((error) => {
        Alert.alert("",error.toString())
        console.log("Error2 ===> ", error.toString())
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
                style={style.txtInput}
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
                style={style.txtInput}
                onChangeText={(text) => {this.setState({password: text})}}
                secureTextEntry
            />
        </View>
        <TouchableOpacity style={style.vwForgot} onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}>
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
  },

  //text style
  txtInput: {
    marginTop: getHeight(20),
    borderColor: color.cC4C4C4,
    borderWidth:1,
    borderRadius: getHeight(5)
  },
});
