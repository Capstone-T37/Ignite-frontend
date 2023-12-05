import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, FlatList, ImageStyle, ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { ActivityNavigatorParamList, ActivityNavigatorScreenProps, HomeTabScreenProps } from "app/navigators"
import { Button, Card, EmptyState, ListItem, Screen, Text } from "app/components"
import { isRTL, translate } from "app/i18n"
import { Activity, TagSnapshotIn, useStores } from "app/models"
import { colors, spacing } from "app/theme"
import { delay } from "app/utils/delay"
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet"
import { useNavigationContext } from "app/utils/NavigationContext"
import { ActivityForm } from "app/components/ActivityForm"
import ActivityBottomSheet from '../components/ActivityBottomSheet';
import { Chip, Snackbar } from "react-native-paper"
import { FAB } from 'react-native-paper';


interface ActivityListScreenProps extends ActivityNavigatorScreenProps<"ActivityListScreen"> { }

export const ActivityListScreen: FC<ActivityListScreenProps> = observer(function ActivityListScreen(_props) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const sheetRef = useRef<BottomSheetModal>(null);
  const activityBottomSheet = useRef<BottomSheetModal>(null);
  const { activityStore } = useStores()
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [isSnackBarVisible, setIsSnackBarVisible] = React.useState(false)
  const [clickedActivity, setclickedActivity] = useState({
    id: 1,
    userName: "",
    title: "",
    description: "",
    date: "",
  })
  const { navigation } = _props
  const [selectedTags, setSelectedTags] = React.useState<TagSnapshotIn[]>([]);
  const { tagStore } = useStores()
  const allTags = tagStore.tags;

  function viewDetails(activity: Activity) {
    //setclickedActivity(activity)
    //activityBottomSheet.current?.expand()

    navigation.navigate("ActivityDetails", activity)
  }

  const toggleTag = (tag: TagSnapshotIn) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  useEffect(() => {
    ; (async function load() {
      setIsLoading(true)
      await tagStore.fetchTags()
      setIsLoading(false)
    })()
  }, [tagStore])


  useEffect(() => {
    ; (async function load() {
      setIsLoading(true)
      await activityStore.fetchActivities(selectedTags)
      setIsLoading(false)
    })()
  }, [selectedTags, activityStore])

  async function manualRefresh() {
    setIsLoading(true)
    await Promise.all([activityStore.fetchActivities(selectedTags), delay(750)])
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
          ListHeaderComponent={
            (
              <View >
                <Text text="Tags: " />
                <ScrollView horizontal>
                  <View style={$tagsContainer}>

                    {allTags.map((tag) => (
                      <Chip key={tag.id} onPress={() => toggleTag(tag)} mode={selectedTags.includes(tag) ? "flat" : "outlined"} showSelectedCheck={true} showSelectedOverlay={selectedTags.includes(tag)} style={$tag} selected={selectedTags.includes(tag)}>{tag.title}</Chip>
                    ))}
                  </View>
                </ScrollView>
              </View>
            )
          }
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
          // <ActivityBottomSheet
          //   activity={clickedActivity}
          //   bottomSheetRef={activityBottomSheet}
          // />
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
const $tagsContainer: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
  flexWrap: 'wrap',
}
const $tag: ViewStyle = {
  borderRadius: 18,
  margin: 3,
}
