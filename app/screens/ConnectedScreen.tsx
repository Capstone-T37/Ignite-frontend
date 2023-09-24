import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, FlatList, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { ActivityNavigatorScreenProps } from "app/navigators"
import { Button, EmptyState, ListItem, Screen, Text } from "app/components"
import { Meet, useStores } from "app/models"
import { colors, spacing } from "app/theme"
import { isRTL, translate } from "app/i18n"
import { delay } from "app/utils/delay"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ConnectedScreenProps extends ActivityNavigatorScreenProps<"ActivityListScreen"> { }


export const ConnectedScreen: FC<ConnectedScreenProps> = observer(function ConnectedScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const { meetStore } = useStores()
  const [isLoading, setIsLoading] = React.useState(false)

  // Pull in navigation via hook
  // const navigation = useNavigation()

  async function manualRefresh() {
    setIsLoading(true)
    await Promise.all([meetStore.fetchMeets(), delay(750)])
    setIsLoading(false)
  }

  useEffect(() => {
    ; (async function load() {
      setIsLoading(true)
      await meetStore.fetchMeets()
      setIsLoading(false)
    })()
  }, [meetStore])

  return (
    <Screen preset="fixed" contentContainerStyle={$container} safeAreaEdges={["top"]}>
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
          </View>
        }
        renderItem={({item}) => (
          <ListItem text={item.description} containerStyle={$listItemContainer} textStyle={$listItemDescription} bottomSeparator={true}
            LeftComponent={
              <View style={$leftComponent} ><Text text={item.userName} size="xs" preset="heading" /></View>
            }
            RightComponent={
              <Button
                onPress={() => { }}
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

const $listItemDescription: TextStyle = {
  textAlign: 'center'
}

const $listItemContainer: ViewStyle = {
  height: spacing.xxxl + spacing.lg,
  justifyContent: 'center',
}

const $meetButton: ViewStyle = {
  borderRadius: 17,
  backgroundColor: colors.palette.accent500,
  borderColor: colors.palette.neutral300,
}