import { firebase } from '@react-native-firebase/firestore';
import React from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {color} from '../../common/GColors';
import {
  asyncStorageKey,
  fontSize,
  getData,
  getHeight,
  getWidth,
} from '../../common/GConstant';
import firestore from '@react-native-firebase/firestore';


const {height, width} = Dimensions.get('window');

const ITEM_WIDTH = width * 0.85;

export default class StudentDashBoardScreen extends React.Component {
  // Constructor method
  constructor(props) {
    super(props);
    this.state = {
      more: false,
      gerneData: [],
      arrCategories: [],
      userData: undefined
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
        this.getGerneData()
        getData(asyncStorageKey.userData, data => {
          this.setState({
            userData: data
          }, () => this.configureHeader(data?.name))
        })
    });
  }

  configureHeader = (name) => {
    this.props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('StudentAccountScreen')}
          style={{padding: getWidth(4)}}>
          <Image resizeMode="contain" source={require("../../assets/images/menu.png")} />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={styles.lblName} numberOfLines={1}>
            Hi {name} !
          </Text>
        </View>
      ),
      headerShadowVisible: false, // Use to hide shadow under the navigation bar
    });
  };

  handleCategoryData = () => {
    if (this.state.arrCategories.length > 6) {
      this.setState({
        gerneData: this.state.more
          ? this.state.arrCategories
          : this.state.arrCategories.slice(0, 6),
      });
    } else {
      this.setState({
        gerneData: this.state.arrCategories,
      });
    }
  };

  getGerneData = async () => {
    let gerneData = []
    await firestore().collection('gerne').get().then((queryShot) => {
      queryShot.forEach((item) => {
        var gerne = item.data()
        gerne["id"] = item.id
        gerneData.push(gerne)
      })
    })
  
    this.setState({
      arrCategories: gerneData
    })
  }

  // Redner Method
  render() {
    return (
      <View style={styles.main}>
        <View style={{marginTop: getHeight(13)}} />
        <View style={styles.categories_for_you}>
          <FlatList
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => {
              return (
                <View style={styles.lblCategoriesforyou}>
                  <Text style={{ 
                    fontWeight: '700',
                    fontSize: fontSize.size16,
                    fontStyle: 'normal',
                    color: color.btnBlue
                  }}>
                    {'Categories for you'}
                  </Text>
                  <Pressable
                    onPress={() =>
                      this.setState(
                        {
                          more: !this.state.more,
                        },
                        () => this.handleCategoryData(),
                      )
                    }>
                    <Text
                      style={[
                        {
                          fontWeight: '500',
                          fontSize: fontSize.size14,
                          fontStyle: 'normal',
                          color: color.orange,
                          textAlignVertical: 'center',
                        },
                      ]}>
                      {this.state.more ? "Less" : "More"}
                      <Text style={{
                        fontWeight: '500',
                        fontSize: fontSize.size20,
                        fontStyle: 'normal'}}
                       >
                        {this.state.more ? ' \u00AB' : ' \u00BB'}
                      </Text>
                    </Text>
                  </Pressable>
                </View>
              );
            }}
            data={this.state.arrCategories}
            renderItem={(item) => {
                console.log("Item ===> ", item)
                return (
                    <Pressable
                      onPress={() => {
                        this.props.navigation.navigate('SubCategoryListing',{
                          data: item.item
                        });
                      }}>
                      <View style={styles.vwCategories}>
                        <View style={styles.imgCategory}>
                          <Image
                            source={require("../../assets/images/Book.png")}
                            style={{height: '100%', width: '100%', resizeMode: 'contain'}}
                          />
                        </View>
                        <Text style={styles.lblCategoriesName}>{item.item?.name}</Text>
                      </View>
                    </Pressable>
                  );
            }}
            numColumns={3}
            contentContainerStyle={{paddingHorizontal: getWidth(6)}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lblName: {
    fontWeight: "bold",
    fontSize: fontSize.size19,
    color: color.btnBlue,
  },
  lblLocation: {
    fontSize: fontSize.size13,
    color: color.themeOrange,
    marginLeft: getWidth(5),
  },
  main: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingBottom: getHeight(5),
  },
  categories_for_you: {
    flex: 1,
    backgroundColor: color.lightGreyView,
    borderTopLeftRadius: getWidth(15),
    borderTopRightRadius: getWidth(15),
  },
  lblCategoriesforyou: {
    height: getHeight(70),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: getWidth(20),
  },
  slide: {
    height: getHeight(154),
    width: ITEM_WIDTH - getWidth(20),
    marginRight: getWidth(20),
    borderRadius: getWidth(12),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  vwCategories: {
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
  lblCategoriesName: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: fontSize.size14,
    fontStyle: 'normal',
    color: color.darkBlue,
    textTransform: 'capitalize',
  },
  imgCategory: {
    height: getHeight(50),
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

