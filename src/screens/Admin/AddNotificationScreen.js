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
import moment from 'moment';


FontAwesomeIcon.loadFont();
export default class AddNotificationScreen extends React.Component {
  // Constructor method
  constructor(props) {
    super(props);
    this.state = {
        description: "",
        name: ""
    };
  }

  handleSubmit = () => {
    // const { name } = this.state
    let error = this.validation()
    if (error == "") {
        this.handleAdd()
    }else{
        Alert.alert("",error)
    }
  }

  handleAdd = () => {
    firestore()
    .collection('notification')
    .add({
      name: this.state.name,
      description: this.state.description,
      insertDate: moment(Date()).format("DD MMM, YYYY [at] hh:mm A")
    })
    .then(res => {
      console.log('ADDED ===>', res);
      Alert.alert("",
        'Notification has been added successfully...',
      );
      this.props.navigation.pop();
    })
    .catch(error => {
      console.log('Firebase Error : ' + error);
    });
  }

  handleDelete = () => {
    let item = this.props.route.params?.data
    firestore()
    .collection('notification').doc(item?.id).delete().then(res => {
      console.log('ADDED ===>', res);
      Alert.alert("",
        'Book has been deleted successfully...',
      );
      this.props.navigation.pop();
    })
    .catch(error => {
      console.log('Firebase Error : ' + error);
    });
  }

  validation = () => {
    const { description, name } =  this.state
    if (name.trim().length == 0){
      return "Please enter name of notification"
  }else if (description.trim().length == 0){
      return "Please enter book description"
    }
    return ""
  }

  componentDidMount = () => {
    if (this.props.route.params?.data != undefined){
        let data = this.props.route.params?.data
        this.setState({
          description: data?.description
        })
    }
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
              marginTop: getHeight(50),
              marginBottom: getHeight(30)
          }}>
            <Fumi
                label={'NAME'}
                iconClass={FontAwesomeIcon}
                iconName={'file-text'}
                iconColor={color.darkBlue}
                iconSize={20}
                iconWidth={40}
                keyboardType={"ascii-capable"}
                returnKeyType={"done"}
                style={style.txtInput}
                value={this.state.name}
                onChangeText={(text) => this.setState({name: text})}
            />
            <Fumi
                label={'NOTIFICATION'}
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
      
        {
            this.state.isEdit ? 
              <AppButton style={[style.btnSignup,style.btnDelete]} title={'Delete'} onPress={() => this.handleDelete()}/> : 
              <AppButton style={style.btnSignup} title={'Add'} onPress={() => this.handleSubmit()}/>
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

  txtInput: {
    marginTop: getHeight(20),
    borderColor: color.cC4C4C4,
    borderWidth:1,
    borderRadius: getHeight(5)
  },
});
