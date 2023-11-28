import * as React from "react"
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "app/theme"
import { Text } from "app/components/Text"
import { Screen } from "./Screen"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { ParamListBase, useRoute } from "@react-navigation/native"

export interface ActivityMeetNavigationProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  navigation: NativeStackNavigationProp<ParamListBase, string, undefined>
}

/**
 * Describe your component here
 */
export const ActivityMeetNavigation = observer(function ActivityMeetNavigation(props: ActivityMeetNavigationProps) {
  const { style, navigation } = props
  const $styles = [$container, style]
  const route = useRoute();
  const [isSelected, setIsSelected] = React.useState(route.name)

  return (
    <Screen safeAreaEdges={["top"]} backgroundColor="transparent">
      <View style={$styles}>
        <TouchableOpacity onPress={() => {
          navigation.navigate("ActivityListScreen")
        }}>
          <Text text="Activities" style={isSelected === "ActivityListScreen" ? $highlightedText : $dimText} preset="bold" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.navigate("Meet")
        }}>
          <Text text="Meets" style={isSelected === "Meet" ? $highlightedText : $dimText} preset="bold" />
        </TouchableOpacity>

      </View>
    </Screen>
  )
})

const $container: ViewStyle = {
  justifyContent: "space-evenly",
  alignItems: 'center',
  flexDirection: "row",
  marginTop: spacing.xxl
}

const $highlightedText: TextStyle = {
  color: colors.text, // or any color for highlighted text
};

const $dimText: TextStyle = {
  color: colors.textDim, // or any color for dimmed text
};
