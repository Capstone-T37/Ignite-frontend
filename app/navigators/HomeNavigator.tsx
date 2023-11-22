import React from "react"
import {
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
import { useStores } from "app/models"
import { ChattingNavigator } from "./ChattingNavigator"
import { RequestNavigator } from "./RequestNavigator"
import ProfileScreen from "app/screens/ProfileScreen"

export type HomeTabParamList = {
  Welcome: undefined
  ActivityNavigator: undefined
  RequestNavigator: undefined
  ChattingNavigator: undefined

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

  const {
    authenticationStore: { isAuthenticated },
  } = useStores()

  React.useEffect(() => {
    isAuthenticated()
  }, [])

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
          //tabBarStyle: { display: "none" },
          tabBarLabel: translate("homeNavigatorTab.activityTab"),
          tabBarIcon: ({ focused }) => (
            <Icon 
              icon="components" 
              color={focused ? colors.tint : colors.palette.neutral300} // Use a ternary operator to set the color
              size={30} 
            />
          ),
        }} />
      <Tab.Screen name="Welcome" component={WelcomeScreen}
        options={{
          tabBarLabel: translate("homeNavigatorTab.homeTab"),
          tabBarIcon: ({ focused }) => (
            <Icon 
              icon="components" 
              color={focused ? colors.tint : colors.palette.neutral300} // Use a ternary operator to set the color
              size={30} 
            />
          )
          ,
        }} />
      <Tab.Screen name="RequestNavigator" component={RequestNavigator}
        options={{
          tabBarLabel: translate("homeNavigatorTab.connectedTab"),
          tabBarIcon: ({ focused }) => (
            <Icon 
              icon="components" 
              color={focused ? colors.tint : colors.palette.neutral300} // Use a ternary operator to set the color
              size={30} 
            />
          ),
        }} />
      <Tab.Screen name="ChattingNavigator" component={ChattingNavigator}
        options={{
          tabBarLabel: translate("homeNavigatorTab.chatTab"),
          tabBarIcon: ({ focused }) => (
            <Icon 
              icon="components" 
              color={focused ? colors.tint : colors.palette.neutral300} // Use a ternary operator to set the color
              size={30} 
            />
          ),
        }} />

      <Tab.Screen name="profileNavigator" component={ProfileScreen}
              options={{
                tabBarLabel: translate("homeNavigatorTab.profileTab"),
                tabBarIcon: ({ focused }) => (
                  <Icon 
                    icon="community" 
                    color={focused ? colors.tint : colors.palette.neutral300} // Use a ternary operator to set the color
                    size={30} 
                  />
                ),
              }} />
    </Tab.Navigator>
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


