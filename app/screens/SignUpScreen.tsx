import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { KeyboardAvoidingView, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text, TextField } from "app/components"
import { spacing, colors } from "app/theme"
import { Button as PaperButton } from 'react-native-paper'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useStores } from "app/models"
import { isEmpty, isValidEmail, isValidPassword } from '../utils/FieldValidationUtils'
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface SignUpScreenProps extends AppStackScreenProps<"SignUp"> { }

export const SignUpScreen: FC<SignUpScreenProps> = observer(function SignUpScreen(
  _props,
) {

  const [signupFname, setsignupFname] = useState("")
  const [signupLname, setsignupLname] = useState("")
  const [signupUsername, setsignupUsername] = useState("")
  const [signEmail, setsignEmail] = useState("")
  const [signupPW, setsignupPW] = useState("")

  const [fnameError, setFnameError] = useState('');
  const [lnameError, setLnameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const authPasswordInput = useRef<TextInput>()

  const { navigation } = _props

  const navigateToSignInPage = () => {
    navigation.navigate("SignIn")
  }



  const navigateToOnboarding = () => {

    let isValid = true;

    // Validate First Name
    if (isEmpty(signupFname)) {
      setFnameError('First name is required');
      isValid = false;
    } else {
      setFnameError('');
    }

    // Validate Last Name
    if (isEmpty(signupLname)) {
      setLnameError('Last name is required');
      isValid = false;
    } else {
      setLnameError('');
    }

    // Validate Username
    // Add specific conditions for username validation if needed
    if (isEmpty(signupUsername)) {
      setUsernameError('Username is required');
      isValid = false;
    } else {
      setUsernameError('');
    }

    // Validate Email
    if (!isValidEmail(signEmail)) {
      setEmailError('Invalid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Validate Password
    if (!isValidPassword(signupPW)) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // Email and Password validation remains the same as before

    if (isValid) {
      navigation.navigate('ImgPicker', {
        FirstName: signupFname,
        LastName: signupLname,
        email: signEmail,
        password: signupPW,
        username: signupUsername
      });
    }
  }

  return (

    <KeyboardAvoidingView
      style={{ flex: 1 }} // Make KeyboardAvoidingView take up the entire screen
      behavior={"padding"} // Adjust the behavior depending on the platform
    >
      <Screen
        preset="fixed"
        contentContainerStyle={$screenContentContainer}
        safeAreaEdges={["top", "bottom"]}
      >
        <View style={{flex:1, justifyContent:'flex-start'}}>
          <Text testID="signup-heading" tx="signUpScreen.signUp" preset="heading" style={$signUp} />
        </View>

        <View style={!fnameError ? $textField : undefined}>
          <TextField
            style={{ color: colors.textDark }}
            value={signupFname}
            onChangeText={setsignupFname}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            labelTx="signUpScreen.firstNameLabel"
            placeholderTx="signUpScreen.FnameFieldPlaceholder"
          />
          {fnameError ? <Text style={$error}>{fnameError}</Text> : null}
        </View>
        <View style={!lnameError ? $textField : undefined}>
          <TextField
            style={{ color: colors.textDark }}
            value={signupLname}
            onChangeText={setsignupLname}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            labelTx="signUpScreen.lastNameLabel"
            placeholderTx="signUpScreen.LnameFieldPlaceholder"
          />
          {lnameError ? <Text style={$error}>{lnameError}</Text> : null}
        </View>
        <View style={!usernameError ? $textField : undefined}>
          <TextField
            style={{ color: colors.textDark }}
            value={signupUsername}
            onChangeText={setsignupUsername}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            labelTx="signUpScreen.userNameFieldLabel"
            placeholderTx="signUpScreen.userNameFieldPlaceholder"
          />
          {usernameError ? <Text style={$error}>{usernameError}</Text> : null}
        </View>
        <View style={!emailError ? $textField : undefined}>
          <TextField
            style={{ color: colors.textDark }}
            value={signEmail}
            onChangeText={setsignEmail}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            keyboardType="email-address"
            labelTx="signUpScreen.emailFieldLabel"
            placeholderTx="signUpScreen.emailFieldPlaceholder"
          />
          {emailError ? <Text style={$error}>{emailError}</Text> : null}
        </View>
        <View style={!passwordError ? $textField : undefined}>
          <TextField
            style={{ color: colors.textDark }}

            ref={authPasswordInput}
            value={signupPW}
            onChangeText={setsignupPW}
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect={false}
            secureTextEntry={true}
            labelTx="signUpScreen.passwordFieldLabel"
            placeholderTx="signUpScreen.passwordFieldPlaceholder"
          />
          {passwordError ? <Text style={$error}>{passwordError}</Text> : null}
        </View>
        <View style={$arrowbutton}>
          <PaperButton
            style={{ borderRadius: 8, width: 100, padding: 0, backgroundColor: 'white' }}
            labelStyle={{ fontSize: 15, color: 'black' }}
            mode="contained"
            onPress={navigateToOnboarding}
          > Next </PaperButton>
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>

          <View style={$buttonContainer}>
            <Text style={$txt3}> Already have an account? </Text>
            <PaperButton
              style={{ borderRadius: 8, width: 110, padding: 0 }}
              labelStyle={{ fontSize: 12, color: colors.palette.secondary100 }}
              mode="outlined"
              onPress={navigateToSignInPage}
            >
              Sign In
            </PaperButton>
          </View>
        </View>



      </Screen >
    </KeyboardAvoidingView >

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

const $buttonContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
}

const $txt3: TextStyle = {
  color: 'white',
}

const $arrowbutton: ViewStyle = {
  alignItems: 'flex-end',
  marginTop: spacing.md
}

const $error: TextStyle = {
  fontSize: 12, // Smaller font size for error messages
  color: 'red', // Red color to highlight errors
}

