import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {color} from '../common/GColors';
import {Calendar} from 'react-native-calendars';
import {
  fontSize,
  getHeight,
  getWidth,
} from '../common/GConstant';
import moment from 'moment';
import AppButton from '../common/GComponant/AppButton';

export default class SelectDateScreen extends React.Component {
  // Constructor method
  constructor(props) {
    super(props);
    this.state = {
      year: moment(Date()).format('YYYY'),
      date: moment(Date()).format('ddd, DD MMM'),
      passingDate: moment(Date()).format('YYYY-MM-DD'),
      day: moment(Date()).day(),
      index: props.route.params?.toDate
    };
  }
  // Life Cycle Method
  componentDidMount() {
    console.log("From ===> ", this.props.route.params?.toDate)
    if (this.state.passingDate == '') {
      let today = moment(Date()).format('YYYY-MM-DD');
      let day = moment(Date()).day();
      this.setState({
        passingDate: today,
        year: moment(Date()).format('YYYY'),
        date: moment(Date()).format('ddd, DD MMM'),
        day: day,
      });
    } else {
      this.getDate(this.state.passingDate);
    }
  }

  getDate = date => {
    let yearStr = moment(date, 'YYYY-MM-DD').format('YYYY');
    let dateStr = moment(date, 'YYYY-MM-DD').format('ddd, DD MMM');
    let day = moment(date, 'YYYY-MM-DD').day();
    console.log('date => ', dateStr);
    this.setState({
      year: yearStr,
      date: dateStr,
      day: day,
    });
  };

  handleData = () => {
    console.log("Date ===> ", this.state.index)
    this.props.route.params.handleDate(date, this.state.index)
    this.props.navigation.pop()
  }

  // Render

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: color.black70,
          flexDirection: 'column-reverse',
        }}>
        <View style={style.vwWhite}>
          <View style={style.vwLine} />
          <Text style={style.lblYear}>{this.state.year}</Text>
          <Text style={style.lblMonth}>{this.state.date}</Text>
          <View style={style.vwLineLarge} />
          <Calendar
            initialDate={moment(Date()).format('YYYY-MM-DD')}
            minDate={moment(Date()).format('YYYY-MM-DD')}
            hideExtraDays={true}
            enableSwipeMonths={true}
            markedDates={{
              [this.state.passingDate]: {
                selected: true,
              },
            }}
            theme={{
              dayTextColor: color.darkBlue,
              textDayFontFamily: fontFamily.medium,
              textDayFontWeight: '500',
              textDayFontSize: fontSize.size18,
              'stylesheet.calendar.header': {
                dayTextAtIndex0: {
                  color:
                    this.state.day === 0 ? color.blackSubContent : color.orGrey,
                },
                dayTextAtIndex1: {
                  color:
                    this.state.day === 1 ? color.blackSubContent : color.orGrey,
                },
                dayTextAtIndex2: {
                  color:
                    this.state.day === 2 ? color.blackSubContent : color.orGrey,
                },
                dayTextAtIndex3: {
                  color:
                    this.state.day === 3 ? color.blackSubContent : color.orGrey,
                },
                dayTextAtIndex4: {
                  color:
                    this.state.day === 4 ? color.blackSubContent : color.orGrey,
                },
                dayTextAtIndex5: {
                  color:
                    this.state.day === 5 ? color.blackSubContent : color.orGrey,
                },
                dayTextAtIndex6: {
                  color:
                    this.state.day === 6 ? color.blackSubContent : color.orGrey,
                },
              },
              // 'stylesheet.calendar.header': {},
              arrowColor: color.orGrey,
              monthTextColor: color.blackSubContent,
              textMonthFontSize: fontSize.size18,
              textMonthFontFamily: fontFamily.semiBold,
              textMonthFontWeight: '600',
              selectedDayBackgroundColor: color.themeYellow,
              selectedDayTextColor: color.white,
              backgroundColor: color.themeYellow,
              todayTextColor: color.white,
              todayBackgroundColor: color.btnBlue,
            }}
            onPressArrowLeft={subtractMonth => subtractMonth()}
            onPressArrowRight={addMonth => addMonth()}
            onDayPress={day => {
              console.log('DAY ===> ', day.dateString);
              this.setState({passingDate: day.dateString}, () =>
                this.getDate(day.dateString),
              );
            }}
          />

          <AppButton
            title={"Done"}
            btnStyle={style.btnDone}
            onPress={() => this.handleData()}
          />
        </View>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => this.props.navigation.pop()}
        />
      </View>
    );
  }
}

// class style

const style = StyleSheet.create({
  // view style
  vwWhite: {
    backgroundColor: color.white,
    paddingHorizontal: getWidth(20),
    borderTopLeftRadius: getHeight(13),
    borderTopRightRadius: getHeight(13),
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
    marginHorizontal: getWidth(12),
    height: 1,
    marginTop: getHeight(24),
    marginBottom: getHeight(30),
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },

  // Label style
  lblYear: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.size16,
    color: color.orGrey,
    marginTop: getHeight(26),
    marginHorizontal: getWidth(12),
  },
  lblMonth: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.size24,
    color: color.grey,
    marginHorizontal: getWidth(12),
    marginTop: getHeight(5),
  },

  // Button style
  btnDone: {
    marginVertical: getHeight(40),
  },
});
