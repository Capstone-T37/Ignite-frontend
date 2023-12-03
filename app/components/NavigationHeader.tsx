import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, Image, TouchableOpacity, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "app/theme"
import { Text } from "app/components/Text"
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { Screen } from "./Screen"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { ParamListBase } from "@react-navigation/native"
import { HomeTabParamList, HomeTabScreenProps } from "app/navigators"
import { useStores } from "app/models"
import { AutoImage } from "./AutoImage"

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
  const { profileStore } = useStores()
  const sadFace = require("../../assets/images/sad-face.png")

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
          {profileStore.profile?.imageUrl.length > 0 ?
            <AutoImage
              resizeMode="cover"
              resizeMethod="scale"
              style={$imageContainer}
              maxHeight={30}
              maxWidth={30}
              source={{ uri: profileStore.profile?.imageUrl }}
            />
            : <Image source={sadFace} style={[$imageContainer, { backgroundColor: 'grey' }]} />}

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

const $imageContainer: ImageStyle = {
  width: 30, marginTop: spacing.xs - 3, height: 30, borderRadius: 30 / 2
}