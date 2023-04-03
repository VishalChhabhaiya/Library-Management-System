import React from 'react';
import {
    Alert,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import {
  getHeight,
  getWidth,
} from '../../common/GConstant';
import {color} from '../../common/GColors';
import AppButton from '../../common/GComponant/AppButton';
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { CommonActions } from '@react-navigation/native';

FontAwesomeIcon.loadFont();
export default class AdminLoginScreen extends React.Component {
  // Constructor method
  constructor(props) {
    super(props);
    this.state = {
        email: "Admin@gmail.com",
        password: "Admin@123"
    };
  }



  handleSubmit = () => {
    let error = this.validation()
    if (error == "") {
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'AdminDashBoardScreen'}],
        }),
      );
    }else{
        Alert.alert("",error)
    }
  }

  validation = () => {
    if (this.state.email.trim().length == 0) {
        return "Please enter email"
    }else if (this.state.password.trim().length == 0){
        return "Please enter password"
    }else if (this.state.email.trim() != "Admin@gmail.com" || this.state.password.trim() != "Admin@123"){
        return "Please enter valid credentials"
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
                label={'Admin email address'}
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

  txtInput: {
    marginTop: getHeight(20),
    borderColor: color.cC4C4C4,
    borderWidth:1,
    borderRadius: getHeight(5)
  },
});
