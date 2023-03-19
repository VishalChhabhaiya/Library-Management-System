import React, {Component} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {color} from '../../common/GColors';
import {
  emptyComponent,
  fontSize,
  getHeight,
  getWidth,
} from '../../common/GConstant';
import {Books} from "../../assets/books";
import firestore from '@react-native-firebase/firestore';


export default class SubCategoryListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCategories: props.route.params?.data,
      title: props.route.params?.title,
      searchTitle: '',
      category_id: props.route.params?.category_id,
      oData: [],
      data: []
    };
  }


  componentDidMount() {
    console.log('DATA : ', this.props.route.params?.data);
    if (this.props.route.params?.data != undefined) {
      let data = this.props.route.params?.data
      this.getBookData(data?.id)
    }


    this.props.navigation.setOptions({
      headerShadowVisible: false,
      title: this.props.route.params?.data.name,
      headerTitleAlign: 'center',
    });
  }

  getBookData = async (id) => {
    let bookData = []
    await firestore().collection('book').where("gerneId","==", id).get().then((queryShot) => {
      queryShot.forEach((item) => {
        var book = item.data()
        book["id"] = item.id
        bookData.push(book)
      })
    })

    this.setState({
      oData: bookData,
      data: bookData
    })
  }

  handleSearch = () => {
    let data = this.state.oData.filter(item => {
      return item?.name
        .toLowerCase()
        .match(this.state.searchTitle.toLowerCase());
    });

    this.setState({
      data: data,
    });
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <TextInput
          onChangeText={text =>
            this.setState({searchTitle: text}, () => {
              this.handleSearch();
            })
          }
          placeholder="Search Here..."
          placeholderTextColor="#000"
          value={this.state.searchTitle}
          style={styles.vwSearch}
        />

        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEnabled={true}
          data={this.state.data}
          ListEmptyComponent={() => emptyComponent('No book found !!!')}
          renderItem={(item, index) => {
            return (
                <Pressable
                  onPress={() => {
                    this.props.navigation.navigate('BookDetailsScreen', {
                      data: item.item,
                    });
                  }}>
                  <View style={styles.vwBooks}>
                    <View style={styles.image}>
                      <Image
                        source={require("../../assets/images/Book.png")}
                        style={{height: '100%', width: '100%', resizeMode: 'contain'}}
                      />
                    </View>
                    <Text style={styles.text}>{item.item?.name}</Text>
                    <Image source={require("../../assets/images/RightArow.png")} style={{marginRight: getWidth(20)}} />
                  </View>
                </Pressable>
              );
          }}
          contentContainerStyle={{paddingVertical: getWidth(6)}}
          style={{
            backgroundColor: color.lightGreyView,
            borderTopLeftRadius: getWidth(15),
            borderTopRightRadius: getWidth(15),
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  vwSearch: {
    marginHorizontal: getWidth(20),
    marginTop: getHeight(10),
    height: getHeight(60),
    borderRadius: 100,
    paddingLeft: getWidth(20),
    marginBottom: getHeight(20),
    borderColor: color.black20,
    borderWidth: 1,
    fontSize: fontSize.size14,
    fontWeight: "400",
    color: color.blackSubContent,
  },
  vwBooks: {
    borderRadius: getHeight(15),
    marginHorizontal: getWidth(20),
    margin: getWidth(8),
    height: getHeight(92),
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
    flexDirection: 'row',
    alignContent: 'center',
  },
  text: {
    fontWeight: "600" ,
    fontSize: fontSize.size14,
    flex: 1,
    color: color.darkBlue,
    textTransform: 'capitalize',
  },
  image: {
    height: getHeight(40),
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: getWidth(20),
  },
});
