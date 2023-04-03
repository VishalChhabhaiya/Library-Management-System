import {
    Text,
    StyleSheet,
    View,
    FlatList,
    Dimensions,
    Image,
    Pressable,
    ScrollView,
    TouchableOpacity,
    Modal,
    Alert,
  } from 'react-native';
  import React, {Component} from 'react';
  import {
    fontSize,
    getHeight,
    getWidth,
    opacity,
    screenSize,
  } from '../../common/GConstant';
  import AppButton from '../../common/GComponant/AppButton';
  import {color} from '../../common/GColors';
  
  const {height, width} = Dimensions.get('screen');
  const ITEM_HEIGHT = getHeight(340);
  const IMAGE = 'I';
  const _spacing = getWidth(16);
  
  export default class BookDetailsScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: props.route.params?.data,
        imgArray: [1],
        selectedPage: 0,
      };
    }
  
    componentDidMount() {
      // if (this.props.route.params?.data) {
        console.log("DATANEW  ====> ",this.props.route.params?.data)
      // }
  
      this.props.navigation.setOptions({
        headerTransparent: true,
        headerShadowVisible: false,
      });
    }
  
    _renderItem = ({item}) => {
        console.log("Item===> ", item)
      return (
        <View
          style={{
            width: ITEM_HEIGHT,
            height: ITEM_HEIGHT,
          }}>
            <Image
              source={require("../../assets/images/Book.png")}
              style={{height: "100%", width: "100%", resizeMode: 'contain'}}
            />
        </View>
      );
    };
  
    onViewableItemsChanged = ({viewableItems, changed}) => {
      this.setState({selectedPage: viewableItems[0].index});
    };
  
    render() {
      return (
        <View style={{flex: 1, backgroundColor: color.white}}>
          <View>
              <FlatList
                ref={ref => {
                  this.flatlistRef = ref;
                }}
                onViewableItemsChanged={this.onViewableItemsChanged}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                style={{flexGrow: 0}}
                horizontal
                data={this.state.imgArray}
                renderItem={this._renderItem}
                pagingEnabled
                getItemLayout={(data, index) => ({
                  length: ITEM_HEIGHT,
                  offset: ITEM_HEIGHT * index,
                  index,
                })}
              />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            scrollEnabled
            bounces={false}>
              <Text style={styles.title}>
                {this.state.data?.name}
              </Text>
              <Text style={styles.subTitle}>
              Author: {" "}
                {this.state.data?.authorName.toString()}
              </Text>
              <Text style={styles.thirdTitle}>
                Categories: {this.state.data?.gerneTitle.toString()}
              </Text>
              <Text style={styles.fouthTitle}>
              Description: {" "}
                {this.state.data?.description}
              </Text>
          </ScrollView>
          <View
            style={{
              height: 1,
              backgroundColor: color.black25,
            }}
          />
          <View style={styles.bottom}>
            <AppButton
              title={'Book Now'}
              onPress={() => this.props.navigation.navigate("BookSlotScreen",{
                data: this.state.data
              })}
              style={{
                paddingHorizontal: getWidth(20),
              }}
            />
          </View>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    title: {
      color: color.btnBlue,
      paddingHorizontal: _spacing,
      marginTop: getHeight(20),
      lineHeight: getHeight(17.05),
      textTransform: 'capitalize',
      fontWeight: "500",
      fontSize: fontSize.size18
    },
    subTitle: {
      fontWeight: "500",
      fontSize: fontSize.size16,
      color: color.darkBlue,
      paddingHorizontal: _spacing,
      marginTop: getHeight(6),
      lineHeight: getHeight(26.8),
      textTransform: 'capitalize',
    },
    thirdTitle: {
      color: color.subTitleBlack,
      paddingHorizontal: _spacing,
      marginTop: getHeight(18),
      lineHeight: getHeight(22),
      textTransform: 'capitalize',
      fontWeight: "500",
      fontSize: fontSize.size15
    },
    fouthTitle: {
      color: color.orGrey,
      paddingHorizontal: _spacing,
      marginTop: getHeight(6),
      lineHeight: getHeight(25),
      fontWeight: "400",
      fontSize: fontSize.size16
    },
    bottom: {
      height: getHeight(100),
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: getWidth(20),
      paddingTop: getHeight(15),
      backgroundColor: color.white,
    },
    fullScreen: {
      width: '100%',
      height: '100%',
    },
  });
  