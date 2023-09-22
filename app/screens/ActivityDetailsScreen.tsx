import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Image, TextStyle, View, ViewStyle } from "react-native"
import { ActivityNavigatorScreenProps } from "app/navigators"
import { Button, EmptyState, Screen, Text } from "app/components"
import { colors, spacing, typography } from "app/theme"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ActivityDetailsScreenProps extends ActivityNavigatorScreenProps<"ActivityDetails"> { }

export const ActivityDetailsScreen: FC<ActivityDetailsScreenProps> = observer(function ActivityDetailsScreen(_props) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const pinIcon = require("../../assets/icons/pin.png")
  const $containerInsets = useSafeAreaInsetsStyle(["top"])


  const { navigation, route } = _props
  const activity = route.params
  if (!activity) {
    return <EmptyState
      preset="generic"
      style={$containerInsets}
      headingTx="ActivityDetailsScreen.emptyStateHeading"
      contentTx="ActivityDetailsScreen.emptyStateContent"
      buttonTx="ActivityDetailsScreen.emptyStateButton"
      buttonOnPress={() => navigation.goBack()}
      ImageProps={{ resizeMode: "contain" }}
    />
  }


  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$screenContainer} preset="scroll"
      safeAreaEdges={["top", "bottom"]}
    >
      <View style={$topContainer}>
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          text={activity.title}
          preset="heading"
        />
        <View style={$addressContainer}>
          <Image source={pinIcon} resizeMode="contain" />
          <Text
            testID="welcome-subheading"
            style={$welcomeSubHeading}
            text={activity.address}
            preset="subheading"
          />
        </View>
      </View>
      <View style={$descriptionContainer}>
        <Text text={activity.description} size="md" />
      </View>
      <Button
      style={$joinButton}
        tx="ActivityDetailsScreen.joinButton"
        onPress={() => { }}
      //style={}
      />
    </Screen>
  )
})

const $screenContainer: ViewStyle = {
  flex: 1,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.md,
  alignSelf: 'center',
}

const $welcomeSubHeading: TextStyle = {
  marginBottom: spacing.md,
  paddingHorizontal: spacing.xs,
  alignSelf: 'center',
  fontFamily: typography.secondary.thin,
  color: colors.textDim
}
const $addressContainer: TextStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignContent: 'center',

}

const $descriptionContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.secondary100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.lg,
  justifyContent: "space-around",
  marginVertical: spacing.xxxl
}

const $joinButton: ViewStyle = {
  borderRadius: 17,
  marginTop: spacing.md,
  backgroundColor: colors.palette.secondary300,
  paddingHorizontal: spacing.md,
  minHeight: 32,
}