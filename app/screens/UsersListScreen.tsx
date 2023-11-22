import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, FlatList, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { $tabBar, AppStackScreenProps, ChattingNavigatorScreenProps, HomeTabScreenProps } from "app/navigators"
import { Button, EmptyState, ListItem, Screen, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { isRTL, translate } from "app/i18n"
import { lessOrEq } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { User, useStores } from "app/models"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface UsersListScreenProps extends ChattingNavigatorScreenProps<"UsersList"> { }

export const UsersListScreen: FC<UsersListScreenProps> = observer(function UsersListScreen(_props) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const { userStore } = useStores()
  const [isLoading, setIsLoading] = React.useState(false)
  const { navigation } = _props
  const [profilePic, setProfilePic] = React.useState("")

  function openChat(userName: String) {
    navigation.navigate("Chat", userName)
  }

  React.useEffect(() => {
    ; (async function load() {
      setIsLoading(true)
      await userStore.fetchUsers()
      setIsLoading(false)
    })()
  }, [userStore])

  async function manualRefresh() {
    setIsLoading(true)
    await Promise.all([userStore.fetchUsers()])
    setIsLoading(false)
  }

  return (
    <Screen preset="fixed" contentContainerStyle={$container} safeAreaEdges={["top"]}>
      <FlatList<User>
        data={userStore.activitiesForList}
        refreshing={isLoading}
        extraData={userStore.activitiesForList.length}
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
              headingTx="UsersListScreen.emptyStateHeading"
              contentTx="UsersListScreen.emptyStateContent"
              //buttonOnPress={manualRefresh}
              imageStyle={$emptyStateImage}
              ImageProps={{ resizeMode: "contain" }}
            />
          )
        }
        ListHeaderComponent={
          <View style={$heading}>
            <Text preset="heading" tx="UsersListScreen.title" style={$title} />
            <Text tx="UsersListScreen.tagLine" style={$tagline} />
          </View>
        }
        renderItem={({ item }) => (
          <ListItem containerStyle={$listItemContainer}
            key={item.id}
            textStyle={$listItemDescription}
            text={item.login}
            onPress={() => openChat(item?.login)}
          />
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
  justifyContent: 'center',
  alignItems: 'center',
}

const $listItemDescription: TextStyle = {
  textAlign: 'center',
  fontSize: spacing.xl
}

const $userName: TextStyle = {
  fontSize: spacing.sm
}

const $listItemContainer: ViewStyle = {
  height: spacing.xxxl + spacing.lg,
  justifyContent: 'center',
  backgroundColor: colors.backgroundAccent,
  borderRadius: spacing.md,
  paddingHorizontal: spacing.sm
}




