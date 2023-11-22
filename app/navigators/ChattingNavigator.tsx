import React from "react"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import {
  WelcomeScreen
} from "app/screens"
import { UsersListScreen } from "app/screens/UsersListScreen"
import { ChatScreen } from "app/screens/ChatScreen"
import { colors } from "app/theme"
import { Button } from "app/components/Button"

export type ChattingNavigatorParamList = {
  UsersList: undefined
  Chat: String
}
export type ChattingNavigatorScreenProps<T extends keyof ChattingNavigatorParamList> = NativeStackScreenProps<
  ChattingNavigatorParamList,
  T
>
const Stack = createNativeStackNavigator<ChattingNavigatorParamList>()
export const ChattingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }}>
      <Stack.Screen name="UsersList" component={UsersListScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ 
        headerShown: true,
        headerStyle:{backgroundColor:colors.backgroundAccent},
        headerTitleStyle:{color:colors.text},
        }} />
    </Stack.Navigator>
  )
}
