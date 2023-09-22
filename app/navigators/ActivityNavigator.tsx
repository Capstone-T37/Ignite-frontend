import React from "react"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import {
  ActivityDetailsScreen,
  ActivityListScreen,
} from "app/screens"
import { colors } from "app/theme"
import { Activity } from "app/models"

export type ActivityNavigatorParamList = {
  ActivityListScreen: undefined
  ActivityDetails: Activity
}

export type ActivityNavigatorScreenProps<T extends keyof ActivityNavigatorParamList> = NativeStackScreenProps<
  ActivityNavigatorParamList,
  T
>

const Stack = createNativeStackNavigator<ActivityNavigatorParamList>()
export const ActivityNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ navigationBarColor: colors.background, headerShown: false }}>
      <Stack.Screen name="ActivityListScreen" component={ActivityListScreen} />
      <Stack.Screen name="ActivityDetails" component={ActivityDetailsScreen} />
    </Stack.Navigator>
  )
}
