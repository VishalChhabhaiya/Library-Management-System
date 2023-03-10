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
} from '../../../common/GConstant';
import {color} from '../../../common/GColors';
import AppButton from '../../../common/GComponant/AppButton';
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';


FontAwesomeIcon.loadFont();
export default class AddBookScreen extends React.Component {
  // Constructor method
  constructor(props) {
    super(props);
    this.state = {
        name: "",
        gerne: undefined,
        gerneTitle: "",
        authorName: "",
        stocks: "",
        description: "",
        isEdit: props.route.params?.isEdit != undefined ? props.route.params?.isEdit : false,
        gerneData: [],
    };
  }

  getGerneData = async () => {
    let gerneData = []
    await firestore().collection('gerne').get().then((queryShot) => {
      queryShot.forEach((item) => {
        var gerne = item.data()
        gerne["id"] = item.id
        console.log("Gerne Data ===> ", gerne)
        gerneData.push(gerne)
      })
    })
  
    this.setState({
      gerneData: gerneData
    }) 
  }

  handleSubmit = () => {
    // const { name } = this.state
    let error = this.validation()
    if (error == "") {
        if (this.props.route.params?.data != undefined) {
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
    .collection('book')
    .add({
      name: this.state.name,
      gerneId: this.state.gerne?.id,
      gerneTitle: this.state.gerneTitle,
      stock: this.state.stocks,
      description: this.state.description,
      authorName: this.state.authorName
    })
    .then(res => {
      console.log('ADDED ===>', res);
      Alert.alert("",
        'Book has been added successfully...',
      );
      this.props.navigation.pop();
    })
    .catch(error => {
      console.log('Firebase Error : ' + error);
    });
  }

  handleUpdate = () => {
    let item = this.props.route.params?.data
    let newdata = this.state.name
    console.log("ITEM ===> ", item, newdata)
    firestore()
    .collection('book').doc(item?.id).update({
      name: this.state.name,
      gerneId: this.state.gerne?.id,
      gerneTitle: this.state.gerneTitle,
      stock: this.state.stocks,
      description: this.state.description,
      authorName: this.state.authorName
    }).then(res => {
      console.log('ADDED ===>', res);
      Alert.alert("",
        'Book has been updated successfully...',
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
    .collection('book').doc(item?.id).delete().then(res => {
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
    const { name, gerneTitle, stocks, authorName, description } =  this.state
    if (name.trim().length == 0) {
        return "Please enter book name"
    }else if (gerneTitle.trim().length == 0) {
      return "Please select gerne"
    }else if (authorName.trim().length == 0){
        return "Please enter author name"
    }else if (stocks.trim().length == 0){
        return "Please enter book stocks"
    }else if (description.trim().length == 0){
        return "Please enter book description"
    }
    return ""
  }

  componentDidMount = () => {
    this.getGerneData()
    if (this.props.route.params?.data != undefined){
        let data = this.props.route.params?.data
        this.setState({
            name: data?.name,
            authorName: data?.authorName,
            stocks: data?.stock,
            gerneTitle: data?.gerneTitle,
            gerne: {
              id: data?.gerneId,
              name: data?.gerneTitle
            },
            description: data?.description
        })
    }
  }

  handleGerneData = (data) => {
    console.log("Handle Data ===> ", data)
    this.setState({
        gerneTitle: data.name,
        gerne: data
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
          source={require('../../../assets/images/Logo.png')}
          resizeMode="stretch"
        />
        
        <ScrollView>
          <View style={{
              marginHorizontal: getWidth(27),
              marginTop: getHeight(50)
          }}>
            <Fumi
                label={'BOOK NAME'}
                iconClass={FontAwesomeIcon}
                iconName={'book'}
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

            <TouchableOpacity 
                style={style.txtInput} 
                onPress={() => this.props.navigation.navigate('SelectGernePopup',{
                    data: this.state.gerneData,
                    handleGerneData: this.handleGerneData
                })}
            >
                <View pointerEvents='none'>
                    <Fumi
                       label={'BOOK GERNE'}
                       iconClass={FontAwesomeIcon}
                       iconName={'book'}
                       iconColor={color.darkBlue}
                       iconSize={20}
                       iconWidth={40}
                       inputPadding={16}
                       keyboardType={"ascii-capable"}
                       returnKeyType={"done"}
                       style={{borderRadius: getHeight(5)}}
                       value={this.state.gerneTitle}
                       onChangeText={(text) => this.setState({gerneTitle: text})}
                    />
                </View>
            </TouchableOpacity>

            <Fumi
                label={'BOOK AUTHOR NAME'}
                iconClass={FontAwesomeIcon}
                iconName={'user'}
                iconColor={color.darkBlue}
                iconSize={20}
                iconWidth={40}
                inputPadding={16}
                keyboardType={"ascii-capable"}
                returnKeyType={"done"}
                style={style.txtInput}
                value={this.state.authorName}
                onChangeText={(text) => this.setState({authorName: text})}
            />

            <Fumi
                label={'BOOK STOCKS'}
                iconClass={FontAwesomeIcon}
                iconName={'briefcase'}
                iconColor={color.darkBlue}
                iconSize={20}
                iconWidth={40}
                inputPadding={16}
                keyboardType={"ascii-capable"}
                returnKeyType={"done"}
                style={style.txtInput}
                value={this.state.stocks}
                onChangeText={(text) => this.setState({stocks: text})}
            />

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

  txtInput: {
    marginTop: getHeight(20),
    borderColor: color.cC4C4C4,
    borderWidth:1,
    borderRadius: getHeight(5)
  },
});
