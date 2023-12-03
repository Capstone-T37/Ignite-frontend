import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Alert, FlatList, ImageStyle, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { AppStackScreenProps, HomeTabScreenProps } from "app/navigators"
import { AutoImage, Card, Screen, Text } from "app/components"
import { Image } from "react-native"
import { colors, spacing } from "app/theme"
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'react-native-image-picker';
import { Api, CreateUser, firebase } from "app/services/api"
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage"
import { Button as PaperButton } from 'react-native-paper'
import { useStores } from "app/models"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ImgPickerScreenProps extends AppStackScreenProps<"ImgPicker"> {}

export const ImgPickerScreen: FC<ImgPickerScreenProps> = observer(function ImgPickerScreen( _props) {
  const sadFace = require("../../assets/images/sad-face.png")
  const [profilePic, setProfilePic] = React.useState(undefined)
  
  const { navigation } = _props
  const { route } = _props;
  const { email, password, username, FirstName, LastName } = route.params;

  const {
    authenticationStore: { setAuthToken },
  } = useStores()


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

  const navigateToSignInPage = () => {
    navigation.navigate("SignIn")
  }

  const createAccount = async () => {
    let userCreds : CreateUser = {
      firstName: FirstName,
      lastName: LastName,
      email: email,
      password: password,
      login: username,
      imageUrl: profilePic
    }
    try {
      const response = await api.postUser(userCreds)
      if (response.kind !== "ok") {
        Alert.alert("Something bad happened. Try again later!")
        return
      } else {
        navigation.navigate("Onboarding")
      }
    } catch (error) {
      Alert.alert("Something bad happened. Try again later!")
    }
  }

  return (
    <Screen preset="auto" contentContainerStyle={$root}  safeAreaEdges={["top", "bottom"]}>
        <Text testID="login-heading" tx="imagePickerSignUp.pickImage" preset="heading" style={$signIn} />
        <Text tx="imagePickerSignUp.chooseImage" preset="subheading" style={$enterDetails} />
        <View style={$headerStyle}>
          <TouchableOpacity
              style={{ marginVertical: spacing.sm }}
              onPress={() => {
                uploadImage(`users/${firebase.auth?.currentUser?.uid}/profile`, `profilePic`)
              }}>
              {profilePic ?
                <AutoImage
                  resizeMode="cover"
                  resizeMethod="scale"
                  style={$imageContainer}
                  maxHeight={100}
                  maxWidth={100}
                  source={{ uri: profilePic }}
                />
                : <Image source={sadFace} style={[$imageContainer, { backgroundColor: 'grey' }]} />
              }
              <View style={{ backgroundColor: 'grey', position: "absolute", bottom: 0, right: 0, height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                <Entypo name="camera" size={15} color="black" />
              </View>
            </TouchableOpacity>
        </View>
        <View style={$arrowbutton}>
          <PaperButton
                style={{ borderRadius: 8, width: 167, padding: 0 , backgroundColor: 'white'}}
                labelStyle={{ fontSize: 15 , color: 'black'}}
                mode= "contained"
                onPress={createAccount}
            > Create Account </PaperButton>
        </View>
        <View style={$buttonContainer}>
            <Text style={$txt3}> Already have an account? </Text>
            <PaperButton
                style={{ borderRadius: 8, width: 110, padding: 0 }}
                labelStyle={{ fontSize: 12 }}
                mode="outlined"
                onPress={navigateToSignInPage}
            > Sign In  </PaperButton>
        </View>
    </Screen >
  )
})

const $root: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
  height: "100%",
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

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
}

const $arrowbutton: ViewStyle = {
  alignItems: 'flex-end',
  marginTop: spacing.xxxl
}

const $buttonContainer : ViewStyle = {
  position: 'absolute',
  bottom: 15,
  alignItems: 'center',
  flexDirection: 'row',
  alignSelf: 'center',
}

const $txt3 : TextStyle = {
  color: 'white',
}

export const api = new Api()

function setSnackBar() {
  throw new Error("Function not implemented.")
}
