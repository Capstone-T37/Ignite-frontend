import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, Image, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "app/theme"
import { Text } from "app/components/Text"
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { Screen } from "./Screen"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { ParamListBase } from "@react-navigation/native"
import { HomeTabParamList, HomeTabScreenProps } from "app/navigators"

export interface NavigationHeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  navigation: NativeStackNavigationProp<ParamListBase, string, undefined>
}

/**
 * Describe your component here
 */
export const NavigationHeader = observer(function NavigationHeader(props: NavigationHeaderProps) {
  const { style, navigation } = props
  const $styles = [$container, style]

  return (
    <Screen safeAreaEdges={["top"]} backgroundColor="transparent">

      <View style={$styles}>
        <Feather name="send" size={24} color="white" onPress={() => navigation.navigate("ChatList")} />
        <Text
          text="LinkUp"
          preset="bold"
          size="xl"

        />
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            source={{
              uri: 'https://imageio.forbes.com/specials-images/imageserve/5c76b7d331358e35dd2773a9/0x0.jpg?format=jpg&crop=4401,4401,x0,y0,safe&height=416&width=416&fit=bounds'
            }}
            style={{ width: 30, marginTop: spacing.xs - 3, height: 30, borderRadius: 30 / 2 }}
          />
        </TouchableOpacity>

      </View>
    </Screen>

  )
})

const $container: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: spacing.sm,
  backgroundColor: "transparent"
}