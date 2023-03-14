import React from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import {
    asyncStorageKey,
  fontSize,
  getData,
  getHeight,
  getWidth,
} from '../../common/GConstant';
import {color} from '../../common/GColors';
import AppButton from '../../common/GComponant/AppButton';
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';


FontAwesomeIcon.loadFont();
export default class AddEventScreen extends React.Component {
  // Constructor method
  constructor(props) {
    super(props);
    this.state = {
        name: "",
        date: "",
        description: "",
        SelectServiceDate: '',
        isEdit: props.route.params?.isEdit != undefined ? props.route.params?.isEdit : false,
        userData: undefined
    };
  }



  handleSubmit = () => {
    const { name } = this.state
    let error = this.validation()
    if (error == "") {
        if (this.props.route.params?.item != undefined) {
            this.handleUpdate()
        }else{
            this.handleAdd()
        }
    }else{
        Alert.alert("",error)
    }
  }

  handleAdd = () => {
    firestore()
    .collection('event')
    .add({
      name: this.state.name,
      date: this.state.date,
      description: this.state.description,
      uid: this.state.userData?.uid
    })
    .then(res => {
      console.log('ADDED ===>', res);
      Alert.alert("",
        'Event has been added successfully...',
      );

      this.props.navigation.pop();
    })
    .catch(error => {
      console.log('Firebase Error : ' + error);
    });
  }

  handleDate = (dateStr) => {
    this.setState({
        date: dateStr
    })
  }


  validation = () => {
    const { name,date,description } =  this.state
    if (name.trim().length == 0) {
      return "Please enter event name"
    } else if (date.trim().length == 0){
        return "Please select event date"
    } else if (description.trim().length == 0){
        return "Please enter description"
    }
    return ""
  }

  componentDidMount = () => {
    if (this.props.route.params?.item != undefined){
        let data = this.props.route.params?.item
        this.setState({
            name: data?.name
        })
    }

    getData(asyncStorageKey.userData, data => {
        console.log("User Data ===> ", data)
        this.setState({
            userData: data
        })
    })
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
              marginTop: getHeight(50)
          }}>
            <Fumi
                label={'EVENT NAME'}
                iconClass={FontAwesomeIcon}
                iconName={'tasks'}
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
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('SelectDateScreen', {
                    handleDate: this.handleDate,
                    date: this.state.date
                });
            }}>
                <View pointerEvents="none">
                    <Fumi
                        label={'EVENT DATE'}
                        iconClass={FontAwesomeIcon}
                        iconName={'calendar'}
                        iconColor={color.darkBlue}
                        iconSize={20}
                        iconWidth={40}
                        inputPadding={16}
                        keyboardType={"ascii-capable"}
                        returnKeyType={"done"}
                        style={style.txtInput}
                        value={this.state.date}
                        onChangeText={(text) => this.setState({date: text})}
                    />
                </View>
              </TouchableOpacity>

            <Fumi
                label={'DESCRIPTION'}
                iconClass={FontAwesomeIcon}
                iconName={'file-text'}
                iconColor={color.darkBlue}
                iconSize={20}
                iconWidth={40}
                height={getHeight(100)}
                keyboardType={"ascii-capable"}
                returnKeyType={"done"}
                style={style.txtInput}
                value={this.state.description}
                multiline
                onChangeText={(text) => this.setState({description: text})}
              />
          </View>
        </ScrollView>
        <AppButton style={style.btnSignup} title={this.state.isEdit ? "Update" : 'Add'} onPress={() => this.handleSubmit()}/>
        {
            this.state.isEdit ? <AppButton style={[style.btnSignup,style.btnDelete]} title={'Delete'} onPress={() => this.handleDelete()}/> : null
        }
        
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
    marginBottom: getHeight(30)
  },
  btnDelete: {
    marginTop: getWidth(-20),
    backgroundColor: color.red
  },

  //Label 
  txtInput: {
    borderWidth: 1.0,
    borderColor: color.cC4C4C4,
    marginTop: getHeight(20),
    borderRadius: getHeight(4)
  },

  //Views
  vwLogin: {
    marginHorizontal: getWidth(27), 
    flexDirection: "row",
    justifyContent: "center",
    marginTop: getHeight(20)
  }
});
