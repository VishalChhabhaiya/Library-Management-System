import React from "react";
import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "../screens/WelcomeScreen";
import AdminLoginScreen from "../screens/Admin/AdminLoginScreen";
import SignUpStudentScreen from "../screens/Students/SignUpStudentScreen";
import SignInStudentScreen from "../screens/Students/SignInStudentScreen";

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
           
          </ModalStack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}
const style = StyleSheet.create({});
