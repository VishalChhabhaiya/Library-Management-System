import { CommonActions } from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {color} from '../../common/GColors';
import {
  fontSize,
  getHeight,
  getWidth,
} from '../../common/GConstant';

const {height, width} = Dimensions.get('window');

const ITEM_WIDTH = width * 0.85;

export default class StudentAccountScreen extends React.Component {
  // Constructor method
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      more: false,
      gerneData: []
    };
  }

  componentDidMount() {
    this.configureHeader()
  }

  configureHeader = () => {
    this.props.navigation.setOptions({
      headerTitle: "Account",
      headerShadowVisible: false, // Use to hide shadow under the navigation bar
    });
  };

  handleSignOut = () => {
    Alert.alert(
      "",
      "Are you sure you want to logout?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            this.props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'WelcomeScreen'}],
              }),
            );
          },
        },
        // The "No" button
        {
          text: "No",
        },
      ],
      {cancelable: true},
    );
  }

  // Redner Method
  render() {
    return (
      <View style={styles.main}>
        <ScrollView>
          <TouchableOpacity 
            style={styles.vwGernes} 
            onPress={() => Alert.alert("","Under Development")}
          >
            <Image source={require('../../assets/images/Profile5.png')} style={{marginRight: getWidth(10), height: getHeight(40), width: getHeight(40), aspectRatio: 1}}/>
            <Text style={styles.lblTitle}>{"Edit Profile"}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.vwGernes} 
            onPress={() => this.props.navigation.navigate('CreateComputerSlotScreen')}
          >
            <Image source={require('../../assets/images/computer.png')} style={{marginRight: getWidth(10), height: getHeight(40), width: getHeight(40), aspectRatio: 1}}/>
            <Text style={styles.lblTitle}>{"Book Computer Surfing"}</Text>
          </TouchableOpacity>


          <TouchableOpacity 
            style={styles.vwGernes} 
            onPress={() => this.props.navigation.navigate('CreateReadingSlotScreen')}
          >
            <Image source={require('../../assets/images/readBook.png')} style={{marginRight: getWidth(10), height: getHeight(40), width: getHeight(40), aspectRatio: 1}}/>
            <Text style={styles.lblTitle}>{"Book Library Reading Slot"}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.vwGernes} 
            onPress={() => this.props.navigation.navigate('EventListScreen')}
          >
            <Image source={require('../../assets/images/Event.png')} style={{marginRight: getWidth(10), height: getHeight(40), width: getHeight(40), aspectRatio: 1}}/>
            <Text style={styles.lblTitle}>{"See Events"}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.vwGernes} 
            onPress={() => this.props.navigation.navigate('NotificationListScreen')}
          >
            <Image source={require('../../assets/images/notification.png')} style={{marginRight: getWidth(10), height: getHeight(40), width: getHeight(40), aspectRatio: 1}}/>
            <Text style={styles.lblTitle}>{"Notifications"}</Text>
          </TouchableOpacity>
        </ScrollView>

        <TouchableOpacity 
          style={[styles.vwGernes,{marginBottom: getHeight(30), justifyContent: "center"}]} 
          onPress={() => this.handleSignOut()}
        >
          <Text style={[styles.lblTitle,{textAlign: "center"}]}>{"Sign Out"}</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //label style
  lblTitle: {
    fontSize: fontSize.size17,
    fontWeight: "600",
    color: color.btnBlue,
  },


  //view Style
  main: {
    flex:1,
  },
  vwGernes: {
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

const Categorie = ({item, latitude, longitude, onPress, props}) => {
  const stylesCategorie = StyleSheet.create({
    main: {
      width: getWidth(110),
      aspectRatio: 1,
      borderRadius: getWidth(15),
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: color.white,
      shadowColor: 'rgba(0, 0, 0, 0.06)',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.6,
      shadowRadius: 5,
      elevation: 5,
      margin: getWidth(6),
    },
    text: {
      textAlign: 'center',
      fontWeight: '600',
      fontSize: fontSize.size14,
      fontStyle: 'normal',
      color: color.darkBlue,
      textTransform: 'capitalize',
    },
    image: {
      height: getHeight(50),
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <Pressable
      onPress={() => {
        props.navigation.navigate('SubCategoryListing', {
          data: item.subcategory_details,
          title: item.category_name,
          longitude: longitude,
          latitude: latitude,
          category_id: item.id,
        });
      }}>
      <View style={stylesCategorie.main}>
        <View style={stylesCategorie.image}>
          <Image
            source={{uri: item?.category_image}}
            style={{height: '100%', width: '100%', resizeMode: 'contain'}}
          />
        </View>
        <Text style={stylesCategorie.text}>{"Crime"}</Text>
      </View>
    </Pressable>
  );
};
