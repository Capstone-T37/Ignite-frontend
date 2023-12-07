import React from "react"
import {
  ActivityDetailsScreen,
  ChatScreen,
  PastActivitiesScreen,
  ProfileScreen,
  UsersListScreen,
  WelcomeScreen
} from "app/screens"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { CompositeScreenProps } from "@react-navigation/native"
import { TextStyle, ViewStyle } from "react-native/types"
import { colors, spacing, typography } from "app/theme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Button, Icon, NavigationHeader } from "app/components"
import { translate } from "app/i18n"
import { ActivityNavigator } from "./ActivityNavigator"
import { Activity, useStores } from "app/models"
import { ChattingNavigator } from "./ChattingNavigator"
import { RequestNavigator } from "./RequestNavigator"
import { View } from "react-native"

export type HomeTabParamList = {
  Welcome: undefined
  ActivityNavigator: undefined
  RequestNavigator: undefined
  ChatList: undefined
  Profile: undefined
  Chat: String
  PastActivities: undefined
  PastMeets: undefined
  ActivityDetails: Activity
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type HomeTabScreenProps<T extends keyof HomeTabParamList> = CompositeScreenProps<
  NativeStackScreenProps<HomeTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Stack = createNativeStackNavigator<HomeTabParamList>()

export const HomeNavigator = () => {
  const { bottom } = useSafeAreaInsets()

  const {
    authenticationStore: { isAuthenticated },
  } = useStores()

  React.useEffect(() => {
    isAuthenticated()
  }, [])

  return (
    <Stack.Navigator initialRouteName="ActivityNavigator" screenOptions={{
      animation: "none",
      headerTransparent: true
    }}>
      <Stack.Screen name="ActivityNavigator" component={ActivityNavigator} options={{
        headerShadowVisible: true,
        headerShown: true,
        headerTransparent: true,
        header: (props) => (
          <NavigationHeader navigation={props.navigation} />
        )
      }} />
      <Stack.Screen name="ChatList" component={UsersListScreen} options={{
        headerShown: true,
        headerTransparent: true,
        headerTitleStyle: { color: colors.text },
        headerTitle: "Conversations"
      }} />
      <Stack.Screen name="Profile" component={ProfileScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitleStyle: { color: colors.text },
        }} />

      <Stack.Screen name="PastActivities" component={PastActivitiesScreen}
        options={{
          headerShown: true,
          headerTitle: "Past Activities",
          headerTransparent: true,
          headerTitleStyle: { color: colors.text },


        }} />
      <Stack.Screen name="ActivityDetails" component={ActivityDetailsScreen}
        options={{
          headerShown: true,
          headerTitle: "Activity Details",
          headerTransparent: true,
          headerTitleStyle: { color: colors.text },


        }}
      />

      <Stack.Screen name="Chat" component={ChatScreen} options={{
        headerTitle: "",
        headerShown: true,
        headerBackButtonMenuEnabled: true,
        headerStyle: { backgroundColor: colors.backgroundAccent },
        headerTitleStyle: { color: colors.text },
      }} />
    </Stack.Navigator>
  )
}

export const $tabBar: ViewStyle = {
  backgroundColor: colors.backgroundAccent,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}


