import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, FlatList, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { HomeTabScreenProps } from "app/navigators"
import { Button, Card, EmptyState, ListItem, Screen, Text } from "app/components"
import { isRTL, translate } from "app/i18n"
import { Activity, useStores } from "app/models"
import { colors, spacing } from "app/theme"
import { delay } from "app/utils/delay"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ActivityScreenProps extends HomeTabScreenProps<"Activity"> { }

export const ActivityScreen: FC<ActivityScreenProps> = observer(function ActivityScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const { activityStore } = useStores()
  const [refreshing, setRefreshing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  useEffect(() => {
    ; (async function load() {
      setIsLoading(true)
      await activityStore.fetchActivities()
      setIsLoading(false)
    })()
  }, [activityStore])

  async function manualRefresh() {
    setRefreshing(true)
    setIsLoading(true)
    await Promise.all([activityStore.fetchActivities(), delay(750)])
    setRefreshing(false)
    setIsLoading(false)
  }
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen preset="fixed" contentContainerStyle={$container} safeAreaEdges={["top"]}>

      <FlatList<Activity>
        data={activityStore.activitiesForList}
        extraData={activityStore.activities.length}
        contentContainerStyle={$flatListContentContainer}
        refreshing={refreshing}
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
              ImageProps={{ resizeMode: "contain" }}
            />
          )
        }
        ListHeaderComponent={
          <View style={$heading}>
            <Text preset="heading" tx="ActivityScreen.title" style={$title} />
            <Text tx="ActivityScreen.tagLine" style={$tagline} />
          </View>
        }
        renderItem={({ item }) => (
          <ActivityCard
            key={item.id}
            activity={item}
          />
        )}
      />
    </Screen>
  )
})

const ActivityCard = observer(function ActivityCard({
  activity,
}: {
  activity: Activity
}) {

  const handlePressCard = () => { }

  return (
    <Card
      style={$item}
      verticalAlignment="force-footer-bottom"
      onPress={handlePressCard}
      onLongPress={() => { }}
      HeadingComponent={
        <View style={$metadata}>
          <Text
            style={$metadataText}
            size="xxs"
            accessibilityLabel={activity.date}
          >
            {activity.date}
          </Text>
          <Text
            style={$metadataText}
            size="xxs"
            accessibilityLabel={activity.maximum.toString()}
          >
            {activity.maximum}
          </Text>
        </View>
      }
      content={`${activity.firstName} - ${activity.title}`}
      FooterComponent={
        <Button
          onPress={() => { }}
          onLongPress={() => { }}
          style={[$favoriteButton]}
        >
          <Text
            size="xxs"
            weight="medium"
            text={translate("ActivityScreen.joinButtonContent")}
          />
        </Button>
      }
    />
  )
})

const $container: ViewStyle = {
  flex: 1,
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

const $description: TextStyle = {
  marginBottom: spacing.lg,
}

const $sectionTitle: TextStyle = {
  marginTop: spacing.xxl,
}

const $favoriteButton: ViewStyle = {
  borderRadius: 17,
  marginTop: spacing.md,
  justifyContent: "flex-start",
  backgroundColor: colors.palette.neutral300,
  borderColor: colors.palette.neutral300,
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
}

const $metadataText: TextStyle = {
  color: colors.textDim,
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