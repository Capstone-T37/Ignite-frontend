import React, { FC, useEffect, useRef } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, FlatList, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { ActivityNavigatorParamList, ActivityNavigatorScreenProps, HomeTabScreenProps } from "app/navigators"
import { Button, Card, EmptyState, ListItem, Screen, Text } from "app/components"
import { isRTL, translate } from "app/i18n"
import { Activity, useStores } from "app/models"
import { colors, spacing } from "app/theme"
import { delay } from "app/utils/delay"
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet"
import { useNavigationContext } from "app/utils/NavigationContext"
import { ActivityForm } from "app/components/ActivityForm"
import { Snackbar } from "react-native-paper"
import { FAB } from 'react-native-paper';

interface ActivityListScreenProps extends ActivityNavigatorScreenProps<"ActivityListScreen"> { }

export const ActivityListScreen: FC<ActivityListScreenProps> = observer(function ActivityListScreen(_props) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const sheetRef = useRef<BottomSheetModal>(null);
  const { activityStore } = useStores()
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [isSnackBarVisible, setIsSnackBarVisible] = React.useState(false)
  const { navigation } = _props

  function viewDetails(activity: Activity) {

    navigation.navigate("ActivityDetails", activity)

  }
  useEffect(() => {
    ; (async function load() {
      setIsLoading(true)
      await activityStore.fetchActivities()
      setIsLoading(false)
    })()
  }, [activityStore])

  async function manualRefresh() {
    setIsLoading(true)
    await Promise.all([activityStore.fetchActivities(), delay(750)])
    setIsLoading(false)
  }
  // Pull in navigation via hook
  // const navigation = useNavigation()
  const handleClose = () => {
    setIsSheetOpen(false);
  };
  return (
    <>
      <Screen preset="fixed" contentContainerStyle={$container} >
        <FlatList<Activity>
          data={activityStore.activitiesForList}
          extraData={activityStore.activities.length}
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
                ImageProps={{ resizeMode: "contain" }}
              />
            )
          }

          renderItem={({ item }) => (
            <ActivityCard
              key={item.id}
              activity={item}
              viewDetails={(item) => viewDetails(item)}
            />
          )}
        />
        <FAB
          icon="plus"
          style={$fabStyle}
          onPress={() => {
            setIsSheetOpen(true)
            sheetRef.current.expand()
          }}
        />
        <Snackbar
          visible={isSnackBarVisible}
          onDismiss={() => { setIsSnackBarVisible(false) }}
          style={$snackBar}
          duration={2000}
        >
          <Text preset='formHelper' tx="ActivityForm.SnackBarText" style={$snackBarText} />
        </Snackbar>
        {// @ts-ignore}
          <BottomSheet
            handleStyle={{ backgroundColor: colors.background, shadowColor: 'white' }}
            ref={sheetRef}
            index={-1}
            snapPoints={["100%"]}
            enablePanDownToClose={true}
            onChange={() => { }}
            onClose={handleClose}
          >
            {isSheetOpen && (
              <ActivityForm sheetRef={sheetRef.current} setSnackBar={() => setIsSnackBarVisible(true)} />
            )}
          </BottomSheet>
        }
      </Screen>
    </>
  )
})

const ActivityCard = observer(function ActivityCard({
  activity,
  viewDetails
}: {
  activity: Activity
  viewDetails: (activity: Activity) => void
}) {



  return (
    <Card
      ContentTextProps={$metadata}
      style={$item}
      contentStyle={$contentStyle}
      verticalAlignment="force-footer-bottom"
      onPress={() => viewDetails(activity)}
      onLongPress={() => { }}
      HeadingComponent={
        <View style={$metadata}>
          <Text
            style={$metadataText}
            size="xxs"
            accessibilityLabel={activity.date}
          >
            {new Date(activity.date).toLocaleString()}
          </Text>
        </View>
      }
      content={`${activity.userName} - ${activity.title}`}
    />
  )
})

const $container: ViewStyle = {
  flex: 1,
  marginTop: spacing.xxxl + spacing.xxxl
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
}

const $metadataText: TextStyle = {
  color: colors.textDark,
  marginEnd: spacing.md,
  marginBottom: spacing.xs,
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
  position: 'absolute',
  margin: 16,
  right: 0,
  bottom: 0,
  backgroundColor: colors.palette.secondary100
}

const $snackBar: ViewStyle = {
  backgroundColor: colors.palette.accent100,
  borderColor: colors.palette.accent100,
}

const $snackBarText: TextStyle = {
  color: colors.text,
  textAlign: 'center',
  alignSelf: 'center'
}