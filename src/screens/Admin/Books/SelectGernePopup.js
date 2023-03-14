import React from 'react';
import {Text, View, StyleSheet, Pressable, Image, FlatList, TouchableOpacity} from 'react-native';
import {color} from '../../../common/GColors';
import {
  fontSize,
  getHeight,
  getWidth,
  opacity,
} from '../../../common/GConstant';

const SelectGernePopup = ({navigation, route}) => {
  const renderList = (item, index) => {
    return (
      <TouchableOpacity
        style={style.vwSelect}
        onPress={() => handleState(item)}>
        <Text style={style.lblName}>{item.name}</Text>
        <Image source={require("../../../assets/images/RightArow.png")} />
      </TouchableOpacity>
    );
  };

  const handleState = item => {
    route.params.handleGerneData(item);
    navigation.pop();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.black70,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <Pressable
        onPress={() => navigation.pop()}
        activeOpacity={opacity}
        style={{
          flex: 1,
        }}
      />

      <View style={style.vwBack}>
        <View
          style={{
            maxHeight: getHeight(600),
          }}>
          <Text style={style.lblTitle}>{"Select Gerne"}</Text>
          <FlatList
            bounces={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            contentContainerStyle={{
              paddingBottom: getHeight(20),
            }}
            data={route.params.data}
            keyExtractor={(item, index) => item.id}
            keyboardDismissMode="on-drag"
            renderItem={({item, index}) => renderList(item, index)}
          />
        </View>
      </View>
    </View>
  );
};

export default SelectGernePopup;

// Class styles
const style = StyleSheet.create({
  // View style
  vwBack: {
    backgroundColor: color.white,
    borderTopLeftRadius: getHeight(22),
    borderTopRightRadius: getHeight(22),
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    paddingBottom: getHeight(20),
  },
  vwSelect: {
    marginTop: getHeight(15),
    marginHorizontal: getWidth(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    borderWidth: 1.0,
    borderRadius: getHeight(10),
    borderColor: color.cC4C4C4,
    paddingHorizontal: getWidth(16),
    paddingVertical: getHeight(24),
  },
  
  // Label styles
  lblName: {
    fontWeight: "400",
    fontSize: fontSize.size16,
    color: color.blackSubContent,
    alignSelf: 'center',
  },
  lblTitle: {
    fontWeight: "bold",
    fontSize: fontSize.size22,
    color: color.blackSubContent,
    marginTop: getHeight(28),
    marginHorizontal: getWidth(30),
    marginBottom: getHeight(20),
  },
});
