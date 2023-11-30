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

  const [signupUsername, setsignupUsername] = useState("")
  const [signEmail, setsignEmail] = useState("")
  const [signupPW, setsignupPW] = useState("")

  const authPasswordInput = useRef<TextInput>()

  const { navigation } = _props

  const navigateToSignInPage = () => {
    navigation.navigate("SignIn")
  }

  const navigateToOnboarding = () => {
    navigation.navigate("Onboarding")
  }
  
  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="signup-heading" tx="signInScreen.signUp" preset="heading" style={$signUp} />

      <TextField
        style={{ color: colors.textDark }}
        value={signupUsername}
        onChangeText={setsignupUsername}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="signInScreen.userNameFieldLabel"
        placeholderTx="signInScreen.userNameFieldPlaceholder"
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
        secureTextEntry={false}
        labelTx="signInScreen.passwordFieldLabel"
        placeholderTx="signInScreen.passwordFieldPlaceholder"
      />

      <Button 
          testID="login-button"
          style={$tapButton}
          preset="reversed"
          onPress={navigateToOnboarding}
        >  
          <AntDesign 
          color= 'black'
          name='arrowright' 
          size={24}/>
      </Button>

      <View style={$buttonContainer}>
        <Text style={[$txt3, { color: 'white' }]}> Already have an account? </Text>
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
  height: "100%"
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
  borderRadius: 120, 
  marginBottom: 75, 
  width: 62, 
  height: 40, 
  marginLeft: '75%',
  backgroundColor: "white"
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
  alignSelf: 'center'
}

const $txt3 : TextStyle = {

}

