import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {
  ActivityDetailsScreen,
  ActivityListScreen,
} from "app/screens"
import { colors } from "app/theme"

export type ActivityNavigatorParamList = {
  ActivityListScreen: undefined
  ActivityDetails: undefined
}

const Stack = createNativeStackNavigator<ActivityNavigatorParamList>()
export const ActivityNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, navigationBarColor: colors.background }}>
      <Stack.Screen name="ActivityListScreen" component={ActivityListScreen} />
      <Stack.Screen name="ActivityDetails" component={ActivityDetailsScreen} />
    </Stack.Navigator>
  )
}
