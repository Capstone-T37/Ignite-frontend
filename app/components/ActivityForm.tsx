import * as React from "react"
import { ScrollView, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "app/theme"
import { useForm, Controller } from "react-hook-form";
import { ActivityIndicator, Snackbar, TextInput } from 'react-native-paper';
import DatePicker from 'react-native-date-picker'
import { Button } from "./Button"
import { Text } from "./Text"
import { api, CreateActivity } from "app/services/api";
import { useNavigationContext } from "app/utils/NavigationContext";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { Tag, TagSnapshotIn, useStores } from "app/models";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Chip } from 'react-native-paper';

export interface ActivityFormProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  sheetRef: BottomSheetMethods
  setSnackBar: () => void
}

/**
 * Describe your component here
 */
export const ActivityForm = observer(function ActivityForm(props: ActivityFormProps) {
  const { style, setSnackBar, sheetRef } = props
  const $styles = [$container, style]
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [selectedTags, setSelectedTags] = React.useState<TagSnapshotIn[]>([]);
  const { tagStore } = useStores()
  const allTags = tagStore.tags;

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      title: '',
      description: '',
      date: new Date()
    }
  });

  async function onSubmit(activity: CreateActivity) {
    try {
      const response = await api.postActivity({ ...activity, tags: selectedTags })
      if (response.kind === "ok") {
        setSnackBar()
        sheetRef.close()
        reset()
      }
    } catch (error) {
      console.error(error)
    }

  }

  const toggleTag = (tag: TagSnapshotIn) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  React.useEffect(() => {
    setLoading(true)
      ; (async function load() {
        setLoading(true)
        await tagStore.fetchTags()
        setLoading(false)
      })()

  }, [tagStore])

  return (
    < View style={{ flex: 1, backgroundColor: colors.background }}>
      {loading ? <ActivityIndicator /> :

        <View style={{ flex: 1,marginBottom:spacing.xxxl }}>
          <Text preset="heading" tx="ActivityForm.Title" style={{ textAlign: 'center' }} />
          <View style={$styles}>

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
            <View>

              <ScrollView horizontal contentContainerStyle={{ maxHeight: 100 }}>
                <View style={$tagsContainer}>
                  {allTags.map((tag) => (
                    <Chip key={tag.id} onPress={() => toggleTag(tag)} mode={selectedTags.includes(tag) ? "flat" : "outlined"} showSelectedCheck={true} showSelectedOverlay={selectedTags.includes(tag)} style={$tag} selected={selectedTags.includes(tag)}>{tag.title}</Chip>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>

          <Button onPress={handleSubmit(onSubmit)} tx="ActivityForm.Submit" textStyle={{ color: colors.text }} style={{ backgroundColor: colors.backgroundAccent }} >
          </Button>
        </View>
      }
    </View >

  )
})

const $container: ViewStyle = {
  flex: 1,
  padding: spacing.sm,
  justifyContent: 'space-evenly',
  backgroundColor: colors.background
}
const $input: ViewStyle = {
  backgroundColor: 'white',
  marginBottom: spacing.sm
}
const $tagsContainer: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
  flexWrap: 'wrap',
}
const $tag: ViewStyle = {
  borderRadius: 18,
  margin: 3,
}




