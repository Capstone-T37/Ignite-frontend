import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { KeyboardAvoidingView, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "app/components"
import { spacing, colors } from "app/theme"
import { useStores } from "app/models"
import { useNavigation } from "@react-navigation/native"
import { Button as PaperButton } from 'react-native-paper'
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface SignInScreenProps extends AppStackScreenProps<"SignIn"> { }

export const SignInScreen: FC<SignInScreenProps> = observer(function SignInScreen(
  _props,
) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const { navigation } = _props
  const authPasswordInput = useRef<TextInput>()

  const [authPassword, setAuthPassword] = useState("")
  const [userId, setUserId] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const {
    authenticationStore: { setAuthToken },
  } = useStores()

  useEffect(() => {
    return () => {
      setAuthPassword("")
    }
  }, [])

  async function login() {
    setAuthToken({
      username: userId,
      password: authPassword,
      rememberMe: true
    })
  }

  const navigateToSignUpPage = () => {
    navigation.navigate("SignUp")
  }

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
      KeyboardAvoidingViewProps={{ enabled: true }}
    >

      <Text testID="login-heading" tx="signInScreen.signIn" preset="heading" style={$signIn} />
      <Text tx="signInScreen.enterDetails" preset="subheading" style={$enterDetails} />

      <TextField
        style={{ color: colors.textDark }}
        value={userId}
        onChangeText={setUserId}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="signInScreen.userNameFieldLabel"
        placeholderTx="signInScreen.userNameFieldPlaceholder"
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        style={{ color: colors.textDark }}

        ref={authPasswordInput}
        value={authPassword}
        onChangeText={setAuthPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="signInScreen.passwordFieldLabel"
        placeholderTx="signInScreen.passwordFieldPlaceholder"
        onSubmitEditing={login}
        RightAccessory={PasswordRightAccessory}
      />

      <Button
        testID="login-button"
        tx="signInScreen.tapToSignIn"
        style={$tapButton}
        preset="reversed"
        onPress={login}
      />

      <View style={$buttonContainer}>
        <Text style={[$txt3, { color: 'white' }]}> Don't have an account? </Text>
        <PaperButton
          style={{ borderRadius: 8, width: 110, padding: 0 }}
          labelStyle={{ fontSize: 12, color: colors.palette.secondary100 }}
          mode="outlined"
          onPress={navigateToSignUpPage}
        >
          Sign Up
        </PaperButton>
      </View>

    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
  height: "100%"
}

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
}

const $buttonContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  paddingTop: spacing.xxxl
}

const $txt3: TextStyle = {

}
