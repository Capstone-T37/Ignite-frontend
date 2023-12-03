import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, ImageStyle, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { AppStackScreenProps, HomeTabScreenProps } from "app/navigators"
import { AutoImage, Card, Screen, Text } from "app/components"
import { Image } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { colors, spacing } from "app/theme"
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'react-native-image-picker';
import { firebase } from "app/services/api"
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage"
import { updateProfile } from "firebase/auth"
import { useStores } from "app/models"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ProfileScreenProps extends HomeTabScreenProps<"Profile"> { }

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const sadFace = require("../../assets/images/sad-face.png")
  const [profilePic, setProfilePic] = React.useState(firebase.auth?.currentUser?.photoURL)
  // Pull in navigation via hook
  const { profileStore } = useStores()

  React.useEffect(() => {
    ; (async function load() {
      await profileStore.fetchProfile()
    })()
  }, [profileStore])


  const uploadImage = React.useCallback((path: string, imageName: string) => {
    ImagePicker.launchImageLibrary({
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra: false,
    }, async (response) => {
      if (response.didCancel || response.errorMessage || response.errorCode) {
        console.log('Image picker canceled or encountered an error:', response);
      } else {
        try {
          const asset = response.assets.pop()
          const storage = firebase.storage
          const userStorageRef = ref(storage, path);

          const imageRef = ref(userStorageRef, imageName);
          const img = await fetch(asset.uri)
          const bytes = await img.blob()
          const uploadTask = uploadBytesResumable(imageRef, bytes);
          // Listen for state changes, errors, and completion of the upload.
          uploadTask.on('state_changed', (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
            (error) => {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case 'storage/unauthorized':
                  console.log("User doesn't have permission to access the object");
                  break;
                case 'storage/canceled':
                  console.log("User canceled the upload");
                  break;
                case 'storage/unknown':
                  console.log("Unknown error occurred, inspect error.serverResponse");
                  break;
              }
            },
            () => {
              // Upload completed successfully, now we can get the download URL
              getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                console.log('File available at', downloadURL);
                setProfilePic(downloadURL)
                await updateProfile(firebase.auth.currentUser, {
                  photoURL: downloadURL
                })
                //perform your task
              });
            });
          // const downloadURL = await getDownloadURL(imageRef);
          //console.log(imageBlob)
        } catch (error) {
          console.error("Something went wrong uploading image", error)
        }

      }
    });

  }, []);


  return (
    <Screen style={$root} preset="scroll" safeAreaEdges={["top"]}>
      <View style={$container}>
        <View style={$headerStyle}>
          <TouchableOpacity
            style={{ marginVertical: spacing.sm }}
            onPress={() => {
              uploadImage(`users/${firebase.auth?.currentUser?.uid}/profile`, `profilePic`)
            }}>
            {profileStore.profile?.imageUrl.length > 0 ?
              <AutoImage
                resizeMode="cover"
                resizeMethod="scale"
                style={$imageContainer}
                maxHeight={100}
                maxWidth={100}
                source={{ uri: profileStore.profile?.imageUrl }}
              />
              : <Image source={sadFace} style={[$imageContainer, { backgroundColor: 'grey' }]} />
            }
            <View style={{ backgroundColor: 'grey', position: "absolute", bottom: 0, right: 0, height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
              <Entypo name="camera" size={15} color="black" />
            </View>
          </TouchableOpacity>

          <Text text={profileStore.profile?.fullName} preset="heading" style={$fullName} />
          <Text text={profileStore.profile?.userName} style={$userName} />
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
          ListHeaderComponent={
            <Card
              onPress={() => { }}
              preset="reversed"
              verticalAlignment="center"
              ContentComponent={<View style={{ width: '100%', alignItems: 'center' }}><AntDesign name="pluscircleo" size={spacing.lg} color="grey" /></View>}
              contentStyle={{ color: colors.textDark }}
              style={{
                marginHorizontal: spacing.md,
                backgroundColor: 'black',
                borderWidth: 3,
                borderStyle: 'dashed',
                borderColor: 'grey',
                width: 200,
                height: 300,
              }}
            />
          }
          //ListEmptyComponent={}

          renderItem={({ item }) => (
            <></>
          )}
        />


      </View>
    </Screen >
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
  height: 100,
  width: 100
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

