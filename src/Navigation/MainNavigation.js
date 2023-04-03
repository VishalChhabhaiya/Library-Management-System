import React from "react";
import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "../screens/WelcomeScreen";
import AdminLoginScreen from "../screens/Admin/AdminLoginScreen";
import SignUpStudentScreen from "../screens/Students/SignUpStudentScreen";
import SignInStudentScreen from "../screens/Students/SignInStudentScreen";
import SignInTeachersScreen from "../screens/Teachers/SignInTeachersScreen";
import SignUpTeachersScreen from "../screens/Teachers/SignUpTeachersScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import AdminDashBoardScreen from "../screens/Admin/AdminDashBoardScreen";
import AllGernesScreen from "../screens/Admin/AllGernesScreen";
import AddGerneScreen from "../screens/Admin/AddGerneScreen";
import StudentDashBoardScreen from "../screens/Students/StudentDashBoardScreen";
import StudentAccountScreen from "../screens/Students/StudentAccountScreen";
import SubCategoryListing from "../screens/Students/SubCategoryListingScreen";
import BookDetailsScreen from "../screens/Students/BookDetailsScreen";
import TeacherDashBoardScreen from "../screens/Teachers/TeacherDashBoardScreen";
import EventListScreen from "../screens/Teachers/EventListScreen";
import AddEventScreen from "../screens/Teachers/AddEventScreen";
import SelectDateScreen from "../screens/Teachers/SelectDateScreen";
import AllBooksListScreen from "../screens/Admin/Books/AllBooksListScreen";
import AddBookScreen from "../screens/Admin/Books/AddBookScreen";
import SelectGernePopup from "../screens/Admin/Books/SelectGernePopup";
import BookSlotScreen from "../screens/BookSlotScreen";
import CreateComputerSlotScreen from "../screens/CreateComputerSlotScreen";
import SelectTimeScreen from "../screens/SelectTimeScreen";
import CreateReadingSlotScreen from "../screens/CreateReadingSlotScreen";
import EditStudentProfileScreen from "../screens/Students/EditStudentProfileScreen";
import EditTeacherProfileScreen from "../screens/Teachers/EditTeacherProfileScreen";
import TeacherAccountScreen from "../screens/Teachers/TeacherAccountScreen";
import AdminNoticeListScreen from "../screens/Admin/AdminNoticeListScreen";
import AddNotificationScreen from "../screens/Admin/AddNotificationScreen";
import NotificationListScreen from "../screens/NotificationListScreen";

const Stack = createNativeStackNavigator();
const ModalStack = createNativeStackNavigator();


export default class MainNavigation extends React.Component {
  // Constructor method
  constructor(props) {
    super(props);
    this.state = {};
  }
  // Life Cycle Method
  componentDidMount() {}
  // Render Method
  render() {
    // Stack Navigator: Use to push any screen to stack(animation style : card)
    const MainStackScreen = () => {
      return (
        <Stack.Navigator initialRouteName={this.props?.initialStack}>
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{
              headerShown: false,
              title: "",
              headerBackVisible: false,
              headerTitleAlign: "center",
            }}
          />

          <Stack.Screen
            name="AdminLoginScreen"
            component={AdminLoginScreen}
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: true,
              headerTitleAlign: "center",
              headerShadowVisible: false
            }}
          />

          <Stack.Screen
            name="SignUpStudentScreen"
            component={SignUpStudentScreen}
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: true,
              headerTitleAlign: "center",
              headerShadowVisible: false
            }}
          />

          <Stack.Screen
            name="SignInStudentScreen"
            component={SignInStudentScreen}
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: true,
              headerTitleAlign: "center",
              headerShadowVisible: false
            }}
          />
           <Stack.Screen
            name="SignUpTeachersScreen"
            component={SignUpTeachersScreen}
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: true,
              headerTitleAlign: "center",
              headerShadowVisible: false
            }}
          />

          <Stack.Screen
            name="SignInTeachersScreen"
            component={SignInTeachersScreen}
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: true,
              headerTitleAlign: "center",
              headerShadowVisible: false
            }}
          />

          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: true,
              headerTitleAlign: "center",
              headerShadowVisible: false
            }}
          />

          <Stack.Screen
            name="AdminDashBoardScreen"
            component={AdminDashBoardScreen}
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: true,
              headerTitleAlign: "center",
              headerShadowVisible: false
            }}
          />


          <Stack.Screen
            name="AllGernesScreen"
            component={AllGernesScreen}
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: true,
              headerTitleAlign: "center",
              headerShadowVisible: false
            }}
          />


          <Stack.Screen
            name="AddGerneScreen"
            component={AddGerneScreen}
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: true,
              headerTitleAlign: "center",
              headerShadowVisible: false
            }}
          />

          <Stack.Screen
            name="AllBooksListScreen"
            component={AllBooksListScreen}
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: true,
              headerTitleAlign: "center",
              headerShadowVisible: false
            }}
          />

          <Stack.Screen
            name="AddBookScreen"
            component={AddBookScreen}
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: true,
              headerTitleAlign: "center",
              headerShadowVisible: false
            }}
          />


          <Stack.Screen
            name="StudentDashBoardScreen"
            component={StudentDashBoardScreen}
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: false,
              headerTitleAlign: "center",
              headerShadowVisible: false
            }}
          />

          <Stack.Screen
            name="StudentAccountScreen"
            component={StudentAccountScreen}
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: true,
              headerTitleAlign: "center",
              headerShadowVisible: false
            }}
          />

          <Stack.Screen
            name="SubCategoryListing"
            component={SubCategoryListing}
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: true,
              headerTitleAlign: "center",
              headerShadowVisible: false
            }}
          />

          <Stack.Screen
            name="BookDetailsScreen"
            component={BookDetailsScreen}
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: true,
              headerTitleAlign: "center",
              headerShadowVisible: false
            }}
          />

          <Stack.Screen
            name="TeacherDashBoardScreen"
            component={TeacherDashBoardScreen}
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: true,
              headerTitleAlign: "center",
              headerShadowVisible: false
            }}
          />

          <Stack.Screen
            name="EventListScreen"
            component={EventListScreen}
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: true,
              headerTitleAlign: "center",
              headerShadowVisible: false
            }}
          />

          <Stack.Screen
            name="AddEventScreen"
            component={AddEventScreen}
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: true,
              headerTitleAlign: "center",
              headerShadowVisible: false
            }}
          />

          <Stack.Screen
            name="BookSlotScreen"
            component={BookSlotScreen}
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: true,
              headerTitleAlign: "center",
              headerShadowVisible: false
            }}
          />

          <Stack.Screen
            name="CreateComputerSlotScreen"
            component={CreateComputerSlotScreen}
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: true,
              headerTitleAlign: "center",
              headerShadowVisible: false
            }}
          />

          <Stack.Screen
            name="CreateReadingSlotScreen"
            component={CreateReadingSlotScreen}
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: true,
              headerTitleAlign: "center",
              headerShadowVisible: false
            }}
          />

          <Stack.Screen
            name="EditStudentProfileScreen"
            component={EditStudentProfileScreen}
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: true,
              headerTitleAlign: "center",
              headerShadowVisible: false
            }}
          />

          <Stack.Screen
            name="EditTeacherProfileScreen"
            component={EditTeacherProfileScreen}
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: true,
              headerTitleAlign: "center",
              headerShadowVisible: false
            }}
          />

          <Stack.Screen
            name="TeacherAccountScreen"
            component={TeacherAccountScreen}
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: true,
              headerTitleAlign: "center",
              headerShadowVisible: false
            }}
          />

          <Stack.Screen
            name="AdminNoticeListScreen"
            component={AdminNoticeListScreen}
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: true,
              headerTitleAlign: "center",
              headerShadowVisible: false
            }}
          />


          <Stack.Screen
            name="AddNotificationScreen"
            component={AddNotificationScreen}
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: true,
              headerTitleAlign: "center",
              headerShadowVisible: false
            }}
          />

          <Stack.Screen
            name="NotificationListScreen"
            component={NotificationListScreen}
            options={{
              headerShown: true,
              title: "",
              headerBackVisible: true,
              headerTitleAlign: "center",
              headerShadowVisible: false
            }}
          />


        </Stack.Navigator>
      );
    };

    return (
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <ModalStack.Navigator
            screenOptions={{
              presentation: "transparentModal",
              animation: "slide_from_bottom",
            }}
          >
            <ModalStack.Screen
              name="MainStackScreen"
              component={MainStackScreen}
              options={{
                headerShown: false,
              }}
            />

            <ModalStack.Screen
              name="SelectDateScreen"
              component={SelectDateScreen}
              options={{
                headerShown: false,
                headerBackVisible: false,
              }}
            />

            <ModalStack.Screen
              name="SelectGernePopup"
              component={SelectGernePopup}
              options={{
                headerShown: false,
                headerBackVisible: false,
              }}
            />

            <ModalStack.Screen
            name="SelectTimeScreen"
            component={SelectTimeScreen}
            options={{
              headerShown: false,
              headerBackVisible: false,
            }}
          />
           
          </ModalStack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}
const style = StyleSheet.create({});
