import React from 'react';
import {
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
import firestore from '@react-native-firebase/firestore';

export default class AllGernesScreen extends React.Component {
  // Constructor method
  constructor(props) {
    super(props);
    this.state = {
      gerneData: []
    };
  }

  componentDidMount() {
    // Header navigation setup
    this.props.navigation.addListener('focus', () => {
      this.getGerneData();
    });

    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ 
            padding: getHeight(8),
            backgroundColor: color.darkBlue, 
            borderRadius: getHeight(4),
            flexDirection: "row",
            alignItems: "center"
        }}
        onPress={() => this.props.navigation.navigate('AddGerneScreen')}>
          <Image source={require("../../assets/images/Plus.png")}/>
          <Text style={style.lblAdd}>Add</Text>
        </TouchableOpacity>
      ),
      headerTitle: "Gernes",
      headerShadowVisible: false, // Use to hide shadow under the navigation bar
    });
    // ========================================================================
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
      <ScrollView>
        {
          this.state.gerneData.map((item) => {
            return(
            <TouchableOpacity style={style.vwGernes} onPress={() => this.props.navigation.navigate('AddGerneScreen',{
              item: item,
              isEdit: true
            })}>
              <Image source={require('../../assets/images/Book.png')} style={{marginRight: getWidth(10)}}/>
              <Text style={style.lblTitle}>{item?.name}</Text>
            </TouchableOpacity>
            )
          })
        }
      
      </ScrollView>
      </View>
    );
  }
}

// Class Styles

const style = StyleSheet.create({
  // Label Styles
  lblTitle: {
    fontSize: fontSize.size17,
    fontWeight: "600",
    color: color.btnBlue,
  },
  lblAdd: {
    fontSize: fontSize.size15,
    fontWeight: '600',
    textAlign: 'center',
    color: color.white,
    marginLeft: getWidth(4)
  },

  // Image Styles
  imgLogo: {
    alignSelf: 'center',
    marginTop: getHeight(20),
  },

  //View Style
  vwGernes: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: getWidth(22),
    paddingVertical: getHeight(15),
    alignItems: "center",
    backgroundColor: color.white,
    borderRadius: getHeight(10),
    marginTop: getHeight(30),
    marginHorizontal: getWidth(20),
    shadowRadius: 16,
    shadowOpacity: 1,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#FFFFFF13",
    shadowOffset: { height: 4, width: 4 },
    shadowColor: Platform.select({ ios: "#05273E20", android: color.black }),
  },
});
