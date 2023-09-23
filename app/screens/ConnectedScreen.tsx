import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, FlatList, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { ActivityNavigatorScreenProps } from "app/navigators"
import { Button, EmptyState, ListItem, Screen, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { isRTL, translate } from "app/i18n"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ConnectedScreenProps extends ActivityNavigatorScreenProps<"ActivityListScreen"> { }


export const ConnectedScreen: FC<ConnectedScreenProps> = observer(function ConnectedScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen preset="fixed" contentContainerStyle={$container} safeAreaEdges={["top"]}>
      <FlatList<any>
        data={["test", "test", "test"]}
        //extraData={}
        contentContainerStyle={$flatListContentContainer}
        //refreshing={refreshing}
        //onRefresh={()=>}
        ListEmptyComponent={
          false ? (
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
        renderItem={() => (
          <ListItem text={"Lets Hangout!"} containerStyle={$listItemContainer} textStyle={$listItemDescription} bottomSeparator={true}
            LeftComponent={
              <View style={$leftComponent} ><Text text="A" size="xl" preset="heading" /></View>
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