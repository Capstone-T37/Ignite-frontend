import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "app/theme"
import { useForm, Controller } from "react-hook-form";
import { Snackbar, TextInput } from 'react-native-paper';
import DatePicker from 'react-native-date-picker'
import { Button } from "./Button"
import { Text } from "./Text"
import { api, CreateActivity } from "app/services/api";
import { useNavigationContext } from "app/utils/NavigationContext";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useStores } from "app/models";


export interface ActivityFormProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const ActivityForm = observer(function ActivityForm(props: ActivityFormProps) {
  const { style } = props
  const $styles = [$container, style]
  const [open, setOpen] = React.useState(false)
  const { sheetRef } = useNavigationContext()
  const { snackBarStore } = useStores()


  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      title: '',
      description: '',
      address: '',
      maximum: '',
      date: new Date()
    }
  });

  async function onSubmit(activity: CreateActivity) {
    try {
      await api.postActivity(activity)
      sheetRef.current.close()
      reset()
      snackBarStore.setProp("createActivity", true)
    } catch (error) {
      console.error(error)
    }

  }

  return (
    <View style={$styles}>
      <Text preset="heading" tx="ActivityForm.Title" />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={$input}
            error={errors.title ? true : false}
            label="Title"
            placeholder="Activity title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}

        name="title"
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={$input}
            error={errors.description ? true : false}
            label="Description"
            placeholder="Activity description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}

        name="description"
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={$input}
            error={errors.address ? true : false}
            label="Address"
            placeholder="Activity address"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="address"
      />

      <Controller
        control={control}
        rules={{
          max: 20,
          required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={$input}
            error={errors.maximum ? true : false}
            keyboardType="number-pad"
            label="Max"
            placeholder="Max number of participants"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="maximum"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <DatePicker
              modal
              open={open}
              date={value}
              onConfirm={() => {
                setOpen(false)
              }}
              onCancel={() => {
                setOpen(false)
              }}
            />
            <Button style={{ borderColor: colors.border }} onPress={() => setOpen(true)}>
              <Text style={{ color: colors.textDark }}>{value.toLocaleString()}</Text></Button>
          </>

        )}
        name="date"
      />



      <Button onPress={handleSubmit(onSubmit)} tx="ActivityForm.Submit" textStyle={{ color: colors.text }} style={{backgroundColor:colors.backgroundAccent}} >
      </Button>

    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  padding: spacing.sm,
  justifyContent: 'space-around',
  backgroundColor: colors.background
}
const $input: ViewStyle = {
  backgroundColor: 'white'
}




