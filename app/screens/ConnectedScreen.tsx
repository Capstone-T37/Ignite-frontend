import React, { FC, useEffect, useRef } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, FlatList, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { ActivityNavigatorScreenProps } from "app/navigators"
import { Button, EmptyState, ListItem, MeetForm, Screen, Text } from "app/components"
import { Meet, Request, useStores } from "app/models"
import { colors, spacing } from "app/theme"
import { isRTL, translate } from "app/i18n"
import { delay } from "app/utils/delay"
import { Snackbar } from "react-native-paper"
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet"
import { MeetRequestModal } from "app/components/MeetRequestModal"
import DefaultModalContent from "app/components/DefaultModalContent"
import { Divider } from 'react-native-paper';
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ConnectedScreenProps extends ActivityNavigatorScreenProps<"ActivityListScreen"> { }


export const ConnectedScreen: FC<ConnectedScreenProps> = observer(function ConnectedScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const { meetStore, snackBarStore, profileStore, requestStore } = useStores()
  const [isLoading, setIsLoading] = React.useState(false)
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [isRequestVisible, setisRequestVisible] = React.useState(false);
  const [iListVisible, setisListVisible] = React.useState(false);

  // Pull in navigation via hook
  // const navigation = useNavigation()

  async function manualRefresh() {
    setIsLoading(true)
    await Promise.all([meetStore.fetchMeets(), profileStore.fetchStatus(), requestStore.fetchRequestCount(), requestStore.fetchRequests(), delay(750)])
    setIsLoading(false)
  }

  useEffect(() => {
    ; (async function load() {
      setIsLoading(true)
      await meetStore.fetchMeets()
      setIsLoading(false)
    })()
  }, [meetStore])

  useEffect(() => {
    ; (async function load() {
      await Promise.all([requestStore.fetchRequestCount(), requestStore.fetchRequests()])
      console.log("requestscount: ", requestStore.requestCount)
    })()
  }, [requestStore])

  useEffect(() => {
    ; (async function load() {
      await profileStore.fetchStatus()
    })()
  }, [])

  return (
    <Screen preset="fixed" contentContainerStyle={$container} safeAreaEdges={["top"]}>
      <MeetRequestModal style={$sendModal} isVisible={isRequestVisible} setIsVisible={setisRequestVisible}>
        <DefaultModalContent onPress={() => { setisRequestVisible(false) }} />
      </MeetRequestModal>

      <MeetRequestModal style={$listModal} isVisible={iListVisible} setIsVisible={setisListVisible}>
        <FlatList<Request>
          data={requestStore.requests}
          //refreshing={isLoading}
          //onRefresh={manualRequestRefresh}
          //extraData={}
          contentContainerStyle={$flatListContentContainer}
          //refreshing={refreshing}
          //onRefresh={()=>}
          ListEmptyComponent={
            isLoading ? (
              <ActivityIndicator />
            ) : (
              <EmptyState
                preset="generic"
                style={$emptyState}
                headingTx="ConnectedScreen.emptyStateHeading"
                contentTx="ConnectedScreen.emptyStateContent"
                //buttonOnPress={manualRefresh}
                imageStyle={$emptyStateImage}
                ImageProps={{ resizeMode: "contain" }}
              />
            )
          }

          renderItem={({ item }) => (
            <ListItem text={item.userName} containerStyle={$listItemContainer} textStyle={$listItemDescription} bottomSeparator={true}
            />
          )}
        />
      </MeetRequestModal>

      <FlatList<Meet>
        data={meetStore.meetsForList}
        refreshing={isLoading}
        onRefresh={manualRefresh}
        //extraData={}
        contentContainerStyle={$flatListContentContainer}
        //refreshing={refreshing}
        //onRefresh={()=>}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <EmptyState
              preset="generic"
              style={$emptyState}
              headingTx="ConnectedScreen.emptyStateHeading"
              contentTx="ConnectedScreen.emptyStateContent"
              //buttonOnPress={manualRefresh}
              imageStyle={$emptyStateImage}
              ImageProps={{ resizeMode: "contain" }}
            />
          )
        }
        ListHeaderComponent={
          <View style={$heading}>
            <Text preset="heading" tx="ConnectedScreen.title" style={$title} />
            <Text tx="ConnectedScreen.tagLine" style={$tagline} />
            {
              profileStore.isMeetEnabled ?
                <Button
                  onPress={() => {
                    profileStore.disableStatus()
                  }}
                  onLongPress={() => { }}
                  style={[$stopButton]}
                >
                  <Text
                    style={{ color: 'white' }}
                    size="xxs"
                    weight="medium"
                    text={translate("ConnectedScreen.stopButtonText")}
                  />
                </Button> :
                <Button
                  onPress={() => bottomSheetRef.current.expand()}
                  onLongPress={() => { }}
                  style={[$goLiveButton]}
                >
                  <Text
                    size="xxs"
                    weight="medium"
                    text={translate("ConnectedScreen.goLiveButtonText")}
                  />
                </Button>
            }
            <ListItem containerStyle={$requestsContainer} textStyle={$listItemDescription} bottomSeparator={true} onPress={() => { setisListVisible(true) }}
              LeftComponent={
                <View style={$requestLeftComponent} ><Text text={"Requests"} size="xs" preset="heading" /></View>
              }
              RightComponent={
                <View style={$requestRightComponent} ><Text text={String(requestStore.requestCount??0)} size="xs" preset="heading" /></View>
              } />
          </View>
        }
        renderItem={({ item }) => (
          <ListItem text={item.description} containerStyle={$listItemContainer} textStyle={$listItemDescription} bottomSeparator={true}
            LeftComponent={
              <View style={$leftComponent} ><Text text={item.userName} size="xs" preset="heading" /></View>
            }
            RightComponent={
              <Button
                onPress={() => { setisRequestVisible(true) }}
                onLongPress={() => { }}
                style={[$meetButton]}
              >
                <Text
                  size="xxs"
                  weight="medium"
                  text={translate("ConnectedScreen.meetButtonText")}
                />
              </Button>
            } />
        )}
      />
      <Snackbar
        visible={snackBarStore.createMeet}
        onDismiss={() => { snackBarStore.setProp("createMeet", false) }}
        style={$snackBar}
        duration={2000}
      >
        <Text preset='formHelper' tx="MeetForm.SnackBarTextSuccess" style={$snackBarText} />
      </Snackbar>
      {// @ts-ignore}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={["70%"]}
          enablePanDownToClose={true}
          onChange={() => { }}
        >
          <MeetForm meetSheet={bottomSheetRef} />
        </BottomSheet>
      }
    </Screen>
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
const $listTest: ViewStyle = {
  justifyContent: "flex-end",
  backgroundColor: 'white',
  padding: spacing.xl,
  borderRadius: 30,
  borderColor: 'rgba(0, 0, 0, 0.1)',
}

const $title: TextStyle = {
  marginBottom: spacing.sm,
}

const $tagline: TextStyle = {
  marginBottom: spacing.xxl,
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

const $leftComponent: ViewStyle = {
  backgroundColor: 'grey',
  height: 50,
  width: 50,
  borderRadius: 25,
  justifyContent: 'center',
  alignItems: 'center',
}

const $requestLeftComponent: ViewStyle = {
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
}

const $requestRightComponent: ViewStyle = {
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
}

const $listItemDescription: TextStyle = {
  textAlign: 'center'
}

const $listItemContainer: ViewStyle = {
  height: spacing.xxxl + spacing.lg,
  justifyContent: 'center',
}

const $requestsContainer: ViewStyle = {
  height: spacing.xxxl,
  justifyContent: 'center',
  alignItems: 'center'
}

const $meetButton: ViewStyle = {
  borderRadius: 17,
  backgroundColor: colors.palette.accent500,
  borderColor: colors.palette.neutral300,
}

const $goLiveButton: ViewStyle = {
  borderRadius: 17,
  backgroundColor: colors.palette.success100,
  borderColor: colors.palette.neutral100,
}

const $stopButton: ViewStyle = {
  borderRadius: 17,
  backgroundColor: colors.palette.angry500,
  borderColor: colors.palette.neutral100,
}

const $snackBar: ViewStyle = {
  backgroundColor: colors.palette.success100,
  marginLeft: spacing.xl,
  zIndex: 1

}
const $snackBarText: TextStyle = {
  color: colors.text,
  textAlign: 'center',
  alignSelf: 'center'
}

const $sendModal: ViewStyle = {
  justifyContent: 'flex-end',
  margin: 20,
}
const $listModal: ViewStyle = {
  backgroundColor: 'white',
  borderRadius: 30,
  marginVertical: spacing.xxxl
}