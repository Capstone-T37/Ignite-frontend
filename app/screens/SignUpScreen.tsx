import React, { FC, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextInput, TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text, TextField } from "app/components"
import { spacing, colors } from "app/theme"
import { Button as PaperButton } from 'react-native-paper'
import AntDesign from 'react-native-vector-icons/AntDesign'
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface SignUpScreenProps extends AppStackScreenProps<"SignUp"> {}

export const SignUpScreen: FC<SignUpScreenProps> = observer(function SignUpScreen(
  _props,
) {

  const [signupFname, setsignupFname] = useState("")
  const [signupLname, setsignupLname] = useState("")
  const [signupUsername, setsignupUsername] = useState("")
  const [signEmail, setsignEmail] = useState("")
  const [signupPW, setsignupPW] = useState("")

  const authPasswordInput = useRef<TextInput>()

  const { navigation } = _props

  const navigateToSignInPage = () => {
    navigation.navigate("SignIn")
  }

  const navigateToOnboarding = () => {
    navigation.navigate('ImgPicker', {
      FirstName: signupFname,
      LastName: signupLname,
      email: signEmail,
      password: signupPW,
      username: signupUsername
    });
  }
  
  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="signup-heading" tx="signUpScreen.signUp" preset="heading" style={$signUp} />

      <TextField
        style={{ color: colors.textDark }}
        value={signupFname}
        onChangeText={setsignupFname}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        labelTx="signUpScreen.firstNameLabel"
        placeholderTx="signUpScreen.FnameFieldPlaceholder"
      />

      <TextField
        style={{ color: colors.textDark }}
        value={signupLname}
        onChangeText={setsignupLname}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        labelTx="signUpScreen.lastNameLabel"
        placeholderTx="signUpScreen.LnameFieldPlaceholder"
      />

      <TextField
        style={{ color: colors.textDark }}
        value={signupUsername}
        onChangeText={setsignupUsername}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        labelTx="signUpScreen.userNameFieldLabel"
        placeholderTx="signUpScreen.userNameFieldPlaceholder"
      />

      <TextField
        style={{ color: colors.textDark }}
        value={signEmail}
        onChangeText={setsignEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="signUpScreen.emailFieldLabel"
        placeholderTx="signUpScreen.emailFieldPlaceholder"
      />

      <TextField
        style={{ color: colors.textDark }}

        ref={authPasswordInput}
        value={signupPW}
        onChangeText={setsignupPW}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={true}
        labelTx="signUpScreen.passwordFieldLabel"
        placeholderTx="signUpScreen.passwordFieldPlaceholder"
      />
      <View style={$arrowbutton}>
        <PaperButton
              style={{ borderRadius: 8, width: 100, padding: 0 , backgroundColor: 'white'}}
              labelStyle={{ fontSize: 15 , color: 'black'}}
              mode= "contained"
              onPress={navigateToOnboarding}
          > Next </PaperButton>
      </View>

      <View style={$buttonContainer}>
        <Text style={$txt3}> Already have an account? </Text>
        <PaperButton
            style={{ borderRadius: 8, width: 110, padding: 0 }}
            labelStyle={{ fontSize: 12 }}
            mode="outlined"
            onPress={navigateToSignInPage}
        >
          Sign In          </PaperButton>
      </View>

    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
  height: "100%",
}

const $tapButton: TextStyle = {
  marginTop: spacing.xs,
  borderRadius: 10, 
  width: 80, 
  height: 10, 
  backgroundColor: "white",
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $signUp: TextStyle = {
  marginBottom: spacing.sm,
}

const $buttonContainer : ViewStyle = {
  position: 'absolute',
  bottom: 15,
  alignItems: 'center',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignSelf: 'center',
}

const $txt3 : TextStyle = {
  color: 'white',
}

const $arrowbutton: ViewStyle = {
  alignItems: 'flex-end',
  marginTop: spacing.md
}

