import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { View, Image } from 'react-native'
import { StyleSheet, StyleProp } from "react-native";
import { useRef } from 'react'

import { Button } from 'react-native-paper';
import Carousel from '../components/Carousel'
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { ParamListBase, useRoute } from "@react-navigation/native"
import { useStores } from "app/models"

interface OnboardingScreenProps extends AppStackScreenProps<"Onboarding"> { }

export const OnboardingScreen: FC<OnboardingScreenProps> = observer(function OnboardingScreen(_props: OnboardingScreenProps) {

  const {
    authenticationStore: { setAuthToken },
  } = useStores()

  const { route } = _props;

  const { username, password } = route.params;



  const navg = async () => {
    await setAuthToken({
      username: username,
      password: password,
      rememberMe: true
    })
  }

  return (
    <View style={styles.container}>

      <Carousel

        callback={navg}

        items={[{
          title: 'Explore a variety of events and activities around your city',
        }, {
          title: 'Know where to hang out based on live traffic updates',
        }, {
          title: 'Find your bestfriend and the perfect event for a hangout',
        },]}
      />


      <View style={styles.prvc}>
        <Text style={{ color: 'white' }}>
          By continuing you agree to Meetup's <Text style={{ textDecorationLine: 'underline' }}>Terms of Service</Text> and <Text style={{ textDecorationLine: 'underline' }}>Privacy Policy</Text>

        </Text>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,

    backgroundColor: 'rgb(39, 38, 39)',
    height: '100%',

  },
  stretch: {
    width: 50,
    height: 50,

  },
  txt: {
    fontSize: 30,
    paddingTop: 5,

    fontWeight: 'bold',
    color: 'white'

  },
  ct: {
    position: 'absolute',
    top: 70,
    left: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',

  },
  prvc: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    paddingRight: 50,
    paddingLeft: 50,
    alignItems: 'center'
  }
});