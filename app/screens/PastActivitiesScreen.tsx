import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, ImageStyle, ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps, HomeTabScreenProps } from "app/navigators"
import { EmptyState, Screen, Text } from "app/components"
import { ActivityCard } from "."
import { ActivityIndicator, Chip } from "react-native-paper"
import { Activity, useStores } from "app/models"
import { colors, spacing } from "app/theme"
import { isRTL } from "app/i18n"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface PastActivitiesScreenProps extends HomeTabScreenProps<"PastActivities"> { }

export const PastActivitiesScreen: FC<PastActivitiesScreenProps> = observer(function PastActivitiesScreen(_props) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const { navigation } = _props
  // Pull in navigation via hook
  const [isLoading, setIsLoading] = React.useState(false)
  const { activityStore } = useStores()

  // const navigation = useNavigation()
  async function manualRefresh() {
    setIsLoading(true)
    await Promise.all([activityStore.fetchOwnActivities()])
    setIsLoading(false)
  }
  useEffect(() => {
    (async function load() {
      setIsLoading(true)
      await activityStore.fetchOwnActivities()
      setIsLoading(false)
    })()
  }, [activityStore])

  function viewDetails(activity: Activity) {

    navigation.navigate("ActivityDetails", activity)
  }
  return (
    <Screen preset="fixed" contentContainerStyle={$container}>
      <FlatList<Activity>
        data={activityStore.ownActivities}
        extraData={activityStore.ownActivities.length}
        contentContainerStyle={$flatListContentContainer}
        refreshing={isLoading}
        onRefresh={manualRefresh}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <EmptyState
              preset="generic"
              style={$emptyState}
              headingTx="ActivityScreen.emptyStateHeading"
              contentTx="ActivityScreen.emptyStateContent"
              buttonOnPress={manualRefresh}
              imageStyle={$emptyStateImage}
              buttonTextStyle={{ color: colors.textDark }}
              ImageProps={{ resizeMode: "contain" }}
            />
          )
        }
        renderItem={({ item }) => (
          <ActivityCard key={item.id} activity={item} viewDetails={(item) => { viewDetails(item) }} />
        )}
      />

    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  flex: 1,
  marginTop: spacing.xxxl,
}

const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.lg,
}

const $title: TextStyle = {
  marginBottom: spacing.sm,
}

const $tagline: TextStyle = {
  marginBottom: spacing.xxl,
}

const $favoriteButton: ViewStyle = {
  borderRadius: 17,
  marginTop: spacing.md,
  justifyContent: "flex-start",
  backgroundColor: colors.palette.accent100,
  borderColor: colors.palette.accent100,
  paddingHorizontal: spacing.md,
  paddingTop: spacing.xxxs,
  paddingBottom: 0,
  minHeight: 32,
  alignSelf: "flex-start",
}

const $item: ViewStyle = {
  padding: spacing.md,
  marginTop: spacing.md,
  minHeight: 120,
}

const $metadata: TextStyle = {
  color: colors.textDim,
  marginTop: spacing.xs,
  flexDirection: "row",
  alignItems: 'center',

}
const $cardContainer: TextStyle = {
  color: colors.textDim,
  marginTop: spacing.xs,
  flexDirection: "row",
}

const $metadataText: TextStyle = {
  color: colors.textDark,
}
const $metadataTextTime: TextStyle = {
  color: colors.textDark,
  textAlign: 'right'
}
const $contentStyle: TextStyle = {
  color: colors.textDark,
  marginEnd: spacing.md,
  marginBottom: spacing.xs,
}

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $heading: ViewStyle = {
  marginBottom: spacing.md,
}

const $emptyState: ViewStyle = {
  marginTop: spacing.xxl,
}
const $fabStyle: ViewStyle = {
  position: "absolute",
  marginBottom: spacing.xxl,
  marginRight: spacing.xl,
  right: 0,
  bottom: 0,
  backgroundColor: colors.palette.secondary100,
}

const $snackBar: ViewStyle = {
  backgroundColor: colors.palette.accent100,
  borderColor: colors.palette.accent100,
}

const $snackBarText: TextStyle = {
  color: colors.text,
  textAlign: "center",
  alignSelf: "center",
}
const $tagsContainer: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  flexWrap: "wrap",
}
const $tag: ViewStyle = {
  borderRadius: 18,
  margin: 3,
}

const $imageContainer: ImageStyle = {
  borderWidth: 1,
  borderColor: colors.textDim,
  borderRadius: 15,
  height: 30,
  width: 30,
  marginRight: spacing.md
}