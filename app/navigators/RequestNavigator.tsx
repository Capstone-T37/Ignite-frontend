import React from "react"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import {
  ChatScreen,
  ConnectedScreen,
  WelcomeScreen
} from "app/screens"
import { colors } from "app/theme"

export type RequestNavigatorParamList = {
  Connected: undefined
  Chat: String
}
export type RequestNavigatorScreenProps<T extends keyof RequestNavigatorParamList> = NativeStackScreenProps<
RequestNavigatorParamList,
  T
>
const Stack = createNativeStackNavigator<RequestNavigatorParamList>()
export const RequestNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }}>
      <Stack.Screen name="Connected" component={ConnectedScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false,headerStyle:{backgroundColor:colors.backgroundAccent},headerTitleStyle:{color:colors.text} }} />
    </Stack.Navigator>
  )
}
