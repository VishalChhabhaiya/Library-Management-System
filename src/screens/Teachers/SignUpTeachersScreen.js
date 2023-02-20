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
import AppButton from '../../common/GComponant/AppButton';
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


FontAwesomeIcon.loadFont();
export default class SignUpTeachersScreen extends React.Component {
  // Constructor method
  constructor(props) {
    super(props);
    this.state = {
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        department: ""
    };
  }



  handleSubmit = () => {
    const { name, email, phone, password, department } = this.state
    let error = this.validation()
    if (error == "") {
        auth().createUserWithEmailAndPassword(email.trim(), password.trim()).then((response) => {
          
          firestore()
          .collection('user')
          .add({
            name: name,
            mobile: phone,
            email: email,
            role: "teacher",
            uid: response.user.uid,
            department: department
          })
          .then(res => {
            console.log('ADDED ===>', res);
            Alert.alert("",
              'User has been created successfully...',
            );
          })
          .catch(error => {
            console.log('Firebase Error : ' + error);
          });
        }).catch((error) => {
          Alert.alert("",error.toString())
        })
    }else{
        Alert.alert("",error)
    }
  }

  validation = () => {
    const { name,email, phone, password, confirmPassword, department } =  this.state
    if (name.trim().length == 0) {
      return "Please enter name"
    }else if (email.trim().length == 0) {
        return "Please enter email"
    }else if (phone.trim().length == 0){
        return "Please enter phone number"
    }else if (department.trim().length == 0) {
      return "Please enter department"
    } else if (password.trim().length == 0) {
      return "Please enter password"
    }else if (password.trim().length < 8) {
      return "Please enter minimum 8 characters password"
    } else if (confirmPassword.trim().length == 0) {
      return "Please enter confirm password"
    } else if (password.trim() != confirmPassword.trim()){
      return "Password mismatch"
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
        <Text style={style.lblSlogan}>The library is the heart of the school and the teacher is the pulse that keeps it beating.</Text>
        <ScrollView>
          <View style={{
              marginHorizontal: getWidth(27),
              marginTop: getHeight(20)
          }}>
            <Fumi
                  label={'Name'}
                  iconClass={FontAwesomeIcon}
                  iconName={'user'}
                  iconColor={color.darkBlue}
                  iconSize={20}
                  iconWidth={40}
                  inputPadding={16}
                  keyboardType={"ascii-capable"}
                  returnKeyType={"done"}
                  style={{marginTop: getHeight(20)}}
                  value={this.state.name}
                  onChangeText={(text) => this.setState({name: text})}
              />
              <Fumi
                  label={'Email Address'}
                  iconClass={FontAwesomeIcon}
                  iconName={'envelope'}
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
                  label={'Phone No'}
                  iconClass={FontAwesomeIcon}
                  iconName={'mobile'}
                  iconColor={color.darkBlue}
                  iconSize={20}
                  iconWidth={40}
                  inputPadding={16}
                  keyboardType={"number-pad"}
                  returnKeyType={"done"}
                  style={{marginTop: getHeight(20)}}
                  value={this.state.phone}
                  maxLength={10}
                  onChangeText={(text) => this.setState({phone: text})}
              />
              <Fumi
                  label={'Department'}
                  iconClass={FontAwesomeIcon}
                  iconName={'university'}
                  iconColor={color.darkBlue}
                  iconSize={20}
                  iconWidth={40}
                  inputPadding={16}
                  keyboardType={"email-address"}
                  returnKeyType={"done"}
                  style={{marginTop: getHeight(20)}}
                  value={this.state.department}
                  maxLength={10}
                  onChangeText={(text) => this.setState({department: text})}
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

              <Fumi
                  label={'Confirm Password'}
                  iconClass={FontAwesomeIcon}
                  iconName={'lock'}
                  iconColor={color.darkBlue}
                  value={this.state.confirmPassword}
                  iconSize={20}
                  iconWidth={40}
                  inputPadding={16}
                  keyboardType={"ascii-capable"}
                  returnKeyType={"done"}
                  style={{marginTop: getHeight(20)}}
                  onChangeText={(text) => {this.setState({confirmPassword: text})}}
                  secureTextEntry
              />
          </View>
          <AppButton style={style.btnSignup} title={'Sign Up'} onPress={() => this.handleSubmit()}/>
          <View style = {style.vwLogin}>
            <Text style={style.lblLogin}>Do you have an account ? </Text> 
            <TouchableOpacity onPress={() => this.props.navigation.navigate('SignInTeachersScreen')}>
              <Text style={[style.lblLogin,{fontWeight: "700"}]}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

// Class Styles

const style = StyleSheet.create({
  // Image Styles
  imgLogo: {
    alignSelf: 'center',
    marginTop: getHeight(10),
  },

  // Button Styles
  btnSignup: {
    marginTop: getHeight(30),
    marginHorizontal: getWidth(27),
  },

  //Label 
  lblLogin: {
    fontWeight: "500",
    fontSize: fontSize.size16,
    color: color.darkBlue
  },
  lblSlogan: {
    marginHorizontal: getWidth(30),
    marginTop: getHeight(10),
    textAlign: "center",
    fontWeight: "bold",
    fontSize: fontSize.size18,
    color: color.btnBlue
  },

  //Views
  vwLogin: {
    marginHorizontal: getWidth(27), 
    flexDirection: "row",
    justifyContent: "center",
    marginTop: getHeight(20)
  }
});
