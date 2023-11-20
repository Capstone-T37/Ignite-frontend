import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps, HomeTabScreenProps } from "app/navigators"
import { AutoImage, Card, Screen, Text } from "app/components"
import { Image } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { colors, spacing } from "app/theme"
import { Entypo } from '@expo/vector-icons';
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ProfileScreenProps extends HomeTabScreenProps<"Profile"> { }

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const sadFace = require("../../assets/images/sad-face.png")

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll" safeAreaEdges={["top"]}>
      <View style={$container}>
        <View style={$headerStyle}>
          <View>
            <AutoImage
              style={$imageContainer}
              maxHeight={100}
              maxWidth={100}
              source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png' }}
            />
            <View style={{ backgroundColor: 'grey', position: "absolute", bottom: 10, right: 0, height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
              <Entypo name="camera" size={15} color="black" onPress={() => { }} />
            </View>
          </View>

          <Text text="Ayman Fakri" preset="heading" style={$fullName} />
          <Text text="aymanfakri" style={$userName} />
          <Text text="Ottawa" style={$location} />
        </View>
        <Text text="Standout" preset="heading" style={{ fontSize: spacing.md }} />
        <FlatList
          horizontal
          data={[{}, {}]}
          //ListHeaderComponent={}
          //refreshing={isLoading}
          //onRefresh={manualRequestRefresh}
          //extraData={}
          contentContainerStyle={$promptsContainer}
          //refreshing={refreshing}
          //onRefresh={()=>}
          ListHeaderComponentStyle={{ height: '100%' }}
          ListHeaderComponent={
            <Card
              onPress={() => { }}
              preset="reversed"
              verticalAlignment="center"
              LeftComponent={<Text text="left" style={{ color: colors.textDark }} />}
              RightComponent={<Text text="left" style={{ color: colors.textDark }} />}
              heading="Card Heading"
              headingStyle={{ color: colors.textDark }}
              HeadingTextProps={{ weight: "bold" }}
              ContentComponent={<View style={{ width: '100%', alignItems: 'center' }}><AntDesign name="pluscircleo" size={spacing.lg} color="grey" /></View>}
              contentStyle={{ color: colors.textDark }}
              footer="Card Footer"
              footerStyle={{ color: colors.textDark }}
              style={{
                marginHorizontal: spacing.md, backgroundColor: 'black', borderWidth: 3,
                borderStyle: 'dashed',
                borderColor: 'grey',
                height: '100%'
              }}
            />
          }
          //ListEmptyComponent={}

          renderItem={({ item }) => (
            <Card
              preset="reversed"
              verticalAlignment="space-between"
              LeftComponent={<Text text="left" style={{ color: colors.textDark }} />}
              RightComponent={<Text text="right" style={{ color: colors.textDark }} />}
              heading="Card Heading"
              headingStyle={{ color: "#a511dc" }}
              HeadingTextProps={{ weight: "bold" }}
              content="Card Content"
              contentStyle={{ color: "#a511dc" }}
              ContentTextProps={{ weight: "light" }}
              footer="Card Footer"
              footerStyle={{ color: "#a511dc" }}
              FooterTextProps={{ weight: "medium" }}
              style={{ marginHorizontal: spacing.md, backgroundColor: 'white' }}
            />
          )}
        />


      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
const $container: ViewStyle = {
  flex: 1,
}
const $headerStyle: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: spacing.xl,
}
const $imageContainer: ImageStyle = {
  borderRadius: 50,
  marginVertical: spacing.sm
}
const $fullName: TextStyle = {
  fontSize: spacing.lg,
  lineHeight: 0
}
const $userName: TextStyle = {
  fontSize: spacing.md,
  lineHeight: 0


}
const $location: TextStyle = {
  fontSize: spacing.sm,
  color: colors.textDim,
  lineHeight: spacing.xl
}

const $promptsContainer: ViewStyle = {
  height: 300,
}

