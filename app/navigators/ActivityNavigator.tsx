import React, { useRef } from "react"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import {
  ActivityDetailsScreen,
  ActivityListScreen,
  ConnectedScreen,
} from "app/screens"
import { colors, spacing } from "app/theme"
import { Activity } from "app/models"
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, useBottomSheet, useBottomSheetModal } from "@gorhom/bottom-sheet"
import { NavigationContext } from "app/utils/NavigationContext"
import { ActivityMeetNavigation } from "app/components"
import { RequestNavigator } from "./RequestNavigator"

export type ActivityNavigatorParamList = {
  ActivityListScreen: undefined
  ActivityDetails: Activity
  Meet: undefined
}

export type ActivityNavigatorScreenProps<T extends keyof ActivityNavigatorParamList> = NativeStackScreenProps<
  ActivityNavigatorParamList,
  T
>

const Stack = createNativeStackNavigator<ActivityNavigatorParamList>()
export const ActivityNavigator = () => {

  return (
    <Stack.Navigator screenOptions={{
      animation: 'none',
      headerShadowVisible: true,
      headerShown: true,
      headerTransparent: true,
      header: (props) => (
        <ActivityMeetNavigation navigation={props.navigation} />
      )
    }
    }>
      <Stack.Screen name="ActivityListScreen" component={ActivityListScreen} />
      <Stack.Screen name="ActivityDetails" component={ActivityDetailsScreen} />
      <Stack.Screen name="Meet" component={RequestNavigator} />
    </Stack.Navigator>
  )
}
