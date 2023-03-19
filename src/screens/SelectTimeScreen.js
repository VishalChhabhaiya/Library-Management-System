import React from 'react';
import {
    Alert,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {color} from '../common/GColors';
import {
  fontSize,
  getHeight,
  getWidth,
  opacity,
  screenSize,
} from '../common/GConstant';
import AppButton from '../common/GComponant/AppButton';
import moment from 'moment';

export default class SelectTimeScreen extends React.Component {
  // Constructor method
  constructor(props) {
    super(props);
    this.state = {
      arrTimeSlots: [{
        id: 0,
        time: "09:00 AM",
        isSelected: false
      },
      {
        id: 1,
        time: "11:00 AM",
        isSelected: false
      },
      {
        id: 2,
        time: "01:00 PM",
        isSelected: false
      },
      {
        id: 3,
        time: "03:00 PM",
        isSelected: false
      },
      {
        id: 4,
        time: "05:00 PM",
        isSelected: false
      },
      {
        id: 5,
        time: "07:00 PM",
        isSelected: false
      }
    ],
    };
  }

  handleDay = sdate => {
    const date = moment(sdate); // Thursday Feb 2015
    return date.day();
  };

  // Life Cycle Method
  componentDidMount() {}

  handleSelection = (index) => {
    console.log("Handle Selection ===> ", index)
    let timeData = this.state.arrTimeSlots

    timeData.map((item) => { 
        item.isSelected = (item.id == index.id)
    })

    this.setState({
        arrTimeSlots: timeData
    })
  } 

  handleNavigation = () => {
    let selectedSlot = this.state.arrTimeSlots.filter((item) => item.isSelected == true) 

    if (selectedSlot.length > 0) {
        this.props.route.params.handleTime(selectedSlot[0]);
        this.props.navigation.pop()
    }else{
        Alert.alert("","Please select slot")
    }
  }
  
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: color.black70,
          flexDirection: 'column-reverse',
        }}>
        <View style={style.vwWhite}>
          {/* <ScrollView
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}> */}
            <View style={style.vwLine} />
            <Text style={style.lblTitle}>
              {"Select your availability (choose one) in \nSelect Timing Screen"}
            </Text>

            <View style={style.vwLineLarge} />
            <FlatList
                style={{
                    marginTop: getHeight(30),
                    marginBottom: getHeight(100)
                }}
                contentContainerStyle={{
                    justifyContent: "center"
                }}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={this.state.arrTimeSlots}
                renderItem={(item,index) => {
                    return (
                    <Pressable
                        style={{
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                            marginVertical: getHeight(12),
                            marginHorizontal: getWidth(12),
                            padding: getHeight(12),
                            width: "25%",
                            justifyContent: "center",
                            borderRadius: getWidth(5),
                            backgroundColor: item.item?.isSelected ? color.darkBlue : color.cC4C4C4
                        }}
                        onPress={() => this.handleSelection(item.item)}
                        >
                            <Text style={{
                                color: item.item?.isSelected ? color.white : color.black
                            }}>{item.item?.time}</Text>
                        </Pressable>
                    );
                }}
                numColumns={3}
          />
          {/* </ScrollView> */}
          <AppButton
            title={"Done"}
            btnStyle={style.btnDone}
            onPress={() => this.handleNavigation()}
          />
        </View>
        <TouchableOpacity
          style={{
            flex: 1,
          }}
          onPress={() => this.props.navigation.pop()}
        />
      </View>
    );
  }

}

// class styles

const style = StyleSheet.create({
  // view style
  vwWhite: {
    backgroundColor: color.white,
    paddingHorizontal: getWidth(20),
    borderTopLeftRadius: getHeight(13),
    borderTopRightRadius: getHeight(13),
    maxHeight: screenSize.height - 100,
  },

  vwLine: {
    marginTop: getHeight(11),
    alignSelf: 'center',
    width: getWidth(30),
    height: 4,
    backgroundColor: color.black30,
    borderRadius: 2,
  },

  vwLineLarge: {
    height: 1,
    marginTop: getHeight(12),
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },

  vwSelected: {
    height: getHeight(38),
    width: getWidth(89),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00000010',
    borderRadius: getHeight(10),
    marginLeft: getWidth(10),
    marginTop: getHeight(13),
  },

  //Gredient style
  gredientStyle: {
    borderRadius: getHeight(10),
    height: getHeight(38),
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },

  // Label style
  lblTitle: {
    fontWeight: "bold",
    fontSize: fontSize.size18,
    color: color.darkBlue,
    lineHeight: getHeight(24),
    marginTop: getHeight(24),
  },

  lblTimeSlot: {
    fontWeight: "500",
    fontSize: fontSize.size14,
    color: color.subTitleBlack,
  },

  // Button style
  btnDone: {
    marginBottom: getHeight(40),
  },
});
