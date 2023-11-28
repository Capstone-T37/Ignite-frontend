import React, { FC, useEffect, useRef } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, FlatList, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { ActivityNavigatorScreenProps, HomeTabScreenProps, RequestNavigatorScreenProps } from "app/navigators"
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
import { api } from "app/services/api"
import { AntDesign } from '@expo/vector-icons';
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ConnectedScreenProps extends RequestNavigatorScreenProps<"Connected"> { }


export const ConnectedScreen: FC<ConnectedScreenProps> = observer(function ConnectedScreen(_props) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const { navigation } = _props
  const { meetStore, profileStore, requestStore } = useStores()
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedMeet, setSelectedMeet] = React.useState<number>(null)
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [isRequestVisible, setisRequestVisible] = React.useState(false);
  const [iListVisible, setisListVisible] = React.useState(false);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [isSnackBarVisible, setIsSnackBarVisible] = React.useState(false)


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
    })()
  }, [requestStore])

  useEffect(() => {
    ; (async function load() {
      await profileStore.fetchStatus()
    })()
  }, [profileStore])

  const handleClose = () => {
    setIsSheetOpen(false);
  };

  return (
    <Screen preset="fixed" contentContainerStyle={$container} safeAreaEdges={["top"]}>
      <MeetRequestModal style={$sendModal} isVisible={isRequestVisible} setIsVisible={setisRequestVisible}>
        <DefaultModalContent onPress={async () => {
          try {
            setisRequestVisible(false)
            await api.postRequest({ meetId: selectedMeet })
            await meetStore.fetchMeets()
            setSelectedMeet(undefined)
          } catch (error) {
            console.error(error)
          }

        }} />
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
          ListHeaderComponent={
            <View style={$heading}>
              <Text preset="heading" tx="ConnectedScreen.requestsTitle" style={$requestTitle} />
            </View>
          }
          ListEmptyComponent={
            isLoading ? (
              <ActivityIndicator />
            ) : (
              <></>
            )
          }

          renderItem={({ item }) => (
            <ListItem text={item.userName} containerStyle={$listItemContainer} textStyle={$listItemDescription}
              onPress={() => {
                setisListVisible(false)
                navigation.navigate("Chat", item.userName)
              }}
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
        //ListEmptyComponent={}
        ListHeaderComponent={
          <View style={$heading}>
            <Text preset="heading" tx="ConnectedScreen.title" style={$title} />
            <Text tx="ConnectedScreen.tagLine" style={$tagline} />
            {
              profileStore.isMeetEnabled ?
                <Button
                  onPress={async () => {
                    profileStore.disableStatus().then(async () => {
                      await Promise.all([requestStore.fetchRequestCount(), requestStore.fetchRequests()])
                    })
                  }}
                  onLongPress={() => { }}
                  style={[$stopButton]}
                >
                  <Text
                    style={{ color: colors.textDark }}
                    size="xxs"
                    weight="medium"
                    text={translate("ConnectedScreen.stopButtonText")}
                  />
                </Button> :
                <Button
                  onPress={() => {
                    setIsSheetOpen(true)
                    bottomSheetRef.current.expand()
                  }}
                  onLongPress={() => { }}
                  style={[$goLiveButton]}
                >
                  <Text
                    style={{ color: colors.textDark }}
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
                <View style={$requestRightComponent} ><Text text={String(requestStore.requestCount ?? 0)} size="xs" preset="heading" /></View>
              } />
          </View>
        }
        renderItem={({ item }) => (
          <ListItem text={item.description} containerStyle={$listItemContainer} textStyle={$listItemDescription} disabled
            LeftComponent={
              <View style={$leftComponent} ><Text text={item.userName} size="xs" preset="heading" /></View>
            }
            RightComponent={
              item.isRequestSent ?
                <View style={{ justifyContent: 'center', height: '100%' }}>
                  <AntDesign name="checkcircleo" size={spacing.xl} color="green" />
                </View>
                :
                <Button
                  onPress={() => {
                    setSelectedMeet(item.id)
                    setisRequestVisible(true)
                  }}
                  onLongPress={() => { }}
                  style={[$meetButton]}
                >
                  <Text
                    size="xxs"
                    weight="medium"
                    text={translate("ConnectedScreen.meetButtonText")}
                    style={{ color: colors.textDark }}
                  />
                </Button>
            } />
        )}
      />
      <Snackbar
        visible={isSnackBarVisible}
        onDismiss={() => { setIsSnackBarVisible(false) }}
        style={$snackBar}
        duration={2000}
      >
        <Text preset='formHelper' tx="MeetForm.SnackBarTextSuccess" style={$snackBarText} />
      </Snackbar>
      {// @ts-ignore}
        <BottomSheet
          handleStyle={{ backgroundColor: colors.background }}
          ref={bottomSheetRef}
          index={-1}
          snapPoints={["70%"]}
          enablePanDownToClose={true}
          onClose={handleClose}
        >
          {isSheetOpen && (
            <MeetForm setSnackBar={() => setIsSnackBarVisible(true)} meetSheet={bottomSheetRef} style={$bottomSheetStyle} />
          )}
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
const $bottomSheetStyle: ViewStyle = {
  backgroundColor: colors.background,
}

const $title: TextStyle = {
  marginBottom: spacing.sm,
}

const $tagline: TextStyle = {
  marginBottom: spacing.xxl,
}
const $requestTitle: TextStyle = {
  marginBottom: spacing.sm,
  textAlign: 'center'
}

const $heading: ViewStyle = {
  marginBottom: spacing.md,
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
  backgroundColor: colors.backgroundAccent,
  borderRadius: spacing.md,
  paddingHorizontal: spacing.sm
}

const $requestsContainer: ViewStyle = {
  height: spacing.xxxl,
  justifyContent: 'center',
  alignItems: 'center'
}

const $meetButton: ViewStyle = {
  borderRadius: 17,
  backgroundColor: colors.palette.yellow,
  borderColor: colors.palette.yellow,
}

const $goLiveButton: ViewStyle = {
  borderRadius: 17,
  backgroundColor: colors.palette.accent100,
  borderColor: colors.palette.accent100,
}

const $stopButton: ViewStyle = {
  borderRadius: 17,
  backgroundColor: colors.palette.angry500,
  borderColor: colors.palette.angry500,
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

const $sendModal: ViewStyle = {
  justifyContent: 'flex-end',
  margin: 20,
  backgroundColor: colors.backgroundAccent

}
const $listModal: ViewStyle = {
  backgroundColor: colors.background,
  borderRadius: 30,
  marginVertical: spacing.xxxl,
  height: '70%',
}