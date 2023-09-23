import React from "react"
import {
  ConnectedScreen,
  WelcomeScreen
} from "app/screens"
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { CompositeScreenProps } from "@react-navigation/native"
import { TextStyle, ViewStyle } from "react-native/types"
import { colors, spacing, typography } from "app/theme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "app/components"
import { translate } from "app/i18n"
import { ActivityNavigator } from "./ActivityNavigator"

export type HomeTabParamList = {
  Welcome: undefined
  ActivityNavigator: undefined
  Connected: undefined

}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type HomeTabScreenProps<T extends keyof HomeTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<HomeTabParamList>()

export const HomeNavigator = () => {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator initialRouteName="Welcome" screenOptions={{
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarStyle: [$tabBar, { height: bottom + 70 }],
      tabBarActiveTintColor: colors.text,
      tabBarInactiveTintColor: colors.text,
      tabBarLabelStyle: $tabBarLabel,
      tabBarItemStyle: $tabBarItem,
    }}>
      <Tab.Screen name="ActivityNavigator" component={ActivityNavigator}
        options={{
          tabBarLabel: translate("homeNavigatorTab.activityTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="components" color={focused && colors.tint} size={30} />
          ),
        }} />
      <Tab.Screen name="Welcome" component={WelcomeScreen}
        options={{
          tabBarLabel: translate("homeNavigatorTab.homeTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="components" color={focused && colors.tint} size={30} />
          ),
        }} />
      <Tab.Screen name="Connected" component={ConnectedScreen}
        options={{
          tabBarLabel: translate("homeNavigatorTab.connectedTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="components" color={focused && colors.tint} size={30} />
          ),
        }} />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}


