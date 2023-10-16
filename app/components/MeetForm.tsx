import * as React from "react"
import { Alert, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "app/theme"
import { Text } from "app/components/Text"
import { Button } from "./Button"
import { Controller, useForm } from "react-hook-form"
import { TextInput } from "react-native-paper"
import { api, CreateMeet } from "app/services/api"
import { useStores } from "app/models"
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types"

export interface MeetFormProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  meetSheet: React.MutableRefObject<BottomSheetModalMethods>
}

/**
 * Describe your component here
 */
export const MeetForm = observer(function MeetForm(props: MeetFormProps) {
  const { style, meetSheet } = props
  const $styles = [$container, style]
  const { snackBarStore, profileStore } = useStores()

  

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      description: '',
    }
  });

  async function onSubmit(meet: CreateMeet) {
    try {
      const response = await api.postMeet(meet)
      if(response.kind!=="ok"){
        Alert.alert("Something bad happened. Try again later!")
        return
      }
      meetSheet.current.close()
      reset()
      snackBarStore.setProp("createMeet", true)
      profileStore.setProp("meetEnabled",true)
    } catch (error) {

    }

  }

  return (
    <View style={$styles}>
      <Text preset="heading" tx="MeetForm.Title" style={$title} />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            error={errors.description ? true : false}
            label="Description"
            placeholder="Meet description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}

        name="description"
      />
      <Button onPress={handleSubmit(onSubmit)} tx="ActivityForm.Submit"  >
      </Button>

    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  padding: spacing.sm,
  justifyContent: 'space-around',
}

const $title: TextStyle = {
  textAlign: 'center'
}
