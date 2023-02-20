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


FontAwesomeIcon.loadFont();
export default class AddGerneScreen extends React.Component {
  // Constructor method
  constructor(props) {
    super(props);
    this.state = {
        name: "",
        isEdit: props.route.params?.isEdit != undefined ? props.route.params?.isEdit : false,
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
    .collection('gerne')
    .add({
      name: this.state.name,
    })
    .then(res => {
      console.log('ADDED ===>', res);
      Alert.alert("",
        'Gerne has been added successfully...',
      );

      this.props.navigation.pop();
    })
    .catch(error => {
      console.log('Firebase Error : ' + error);
    });
  }

  handleUpdate = () => {
    let item = this.props.route.params?.item
    let newdata = this.state.name
    console.log("ITEM ===> ", item, newdata)
    firestore()
    .collection('gerne').doc(item?.id).update({
        name: newdata
    }).then(res => {
      console.log('ADDED ===>', res);
      Alert.alert("",
        'Gerne has been updated successfully...',
      );
      this.props.navigation.pop();
    })
    .catch(error => {
      console.log('Firebase Error : ' + error);
    });
  }


  handleDelete = () => {
    let item = this.props.route.params?.item
    firestore()
    .collection('gerne').doc(item?.id).delete().then(res => {
      console.log('ADDED ===>', res);
      Alert.alert("",
        'Gerne has been deleted successfully...',
      );
      this.props.navigation.pop();
    })
    .catch(error => {
      console.log('Firebase Error : ' + error);
    });
  }

  validation = () => {
    const { name } =  this.state
    if (name.trim().length == 0) {
      return "Please enter gerne name"
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
                label={'GERNE'}
                iconClass={FontAwesomeIcon}
                iconName={'book'}
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

  //Views
  vwLogin: {
    marginHorizontal: getWidth(27), 
    flexDirection: "row",
    justifyContent: "center",
    marginTop: getHeight(20)
  }
});
