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
  setData,
} from '../../common/GConstant';
import {color} from '../../common/GColors';
import AppButton from '../../common/GComponant/AppButton';
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


FontAwesomeIcon.loadFont();
export default class EditTeacherProfileScreen extends React.Component {
  // Constructor method
  constructor(props) {
    super(props);
    this.state = {
        name: "",
        email: "",
        phone: "",
        department: "",
        userData: undefined
    };
  }


  componentDidMount() {
    this.getUserData()
  }

  getUserData = () => {
    getData(asyncStorageKey.userData, data => {
        console.log("USER DATA ===> ", data)
        if (data != null) {
            this.setState({
                name: data?.name,
                email: data?.email,
                phone: data?.mobile,
                department: data?.department,
                userData: data
            })
        }
    })
  }


  handleSubmit = () => {
    const { name, phone, department, userData } = this.state
    let error = this.validation()
    if (error == "") {
      var user = userData
      user.mobile = phone
      user.name = name
      user.department = department
        firestore()
        .collection('user').doc(user.id).update(user).then(res => {
          console.log('ADDED ===>', res);
          Alert.alert("",
            'Your Profile has been updated successfully...',
          );
          setData(asyncStorageKey.userData, user)
          this.props.navigation.pop();
        })
        .catch(error => {
          console.log('Firebase Error : ' + error);
        }); 
    }else{
        Alert.alert("",error)
    }
  }

  validation = () => {
    const { name,email, phone, department } =  this.state
    if (name.trim().length == 0) {
      return "Please enter name"
    }else if (email.trim().length == 0) {
        return "Please enter email"
    }else if (phone.trim().length == 0){
        return "Please enter phone number"
    }else if (department.trim().length == 0) {
      return "Please enter department"
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
                  style={style.txtInput}
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
                  style={style.txtInput}
                  editable={false}
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
                  style={style.txtInput}
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
                  style={style.txtInput}
                  value={this.state.department}
                  maxLength={10}
                  onChangeText={(text) => this.setState({department: text})}
              />
          </View>
        </ScrollView>
        <AppButton style={style.btnSignup} title={'Save'} onPress={() => this.handleSubmit()}/>
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
    marginVertical: getHeight(30),
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
  },

  //Text Input
  txtInput: {
    marginTop: getHeight(20),
    borderColor: color.cC4C4C4,
    borderWidth:1,
    borderRadius: getHeight(5)
  },
});
