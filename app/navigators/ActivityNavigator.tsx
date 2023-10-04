import React, { useRef } from "react"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import {
  ActivityDetailsScreen,
  ActivityListScreen,
} from "app/screens"
import { colors, spacing } from "app/theme"
import { Activity } from "app/models"
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, useBottomSheet, useBottomSheetModal } from "@gorhom/bottom-sheet"
import { NavigationContext } from "app/utils/NavigationContext"

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
  const sheetRef = useRef<BottomSheetModal>(null);

  return (
    <NavigationContext.Provider value={{ sheetRef: sheetRef }}>
      <Stack.Navigator screenOptions={{ navigationBarColor: colors.background, headerShown: false }}>
        <Stack.Screen name="ActivityListScreen" component={ActivityListScreen} options={{
          headerShown: true, headerStyle: { backgroundColor: colors.background }, headerRight: () => (
            <>
              <Ionicons name="add-circle"
                size={spacing.xl}
                color="black" onPress={() => sheetRef.current.expand()}
              />
            </>)
        }} />
        <Stack.Screen name="ActivityDetails" component={ActivityDetailsScreen} />
      </Stack.Navigator>
    </NavigationContext.Provider>
  )
}
