import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Image , TouchableOpacity, View, StyleSheet, ImageStyle } from "react-native"
import { ActivityNavigatorScreenProps } from "app/navigators"
import { EmptyState, Screen, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { Chip } from 'react-native-paper';
import { api } from "app/services/api"
import { ActivityDetails } from "app/models"
import FastImage from "react-native-fast-image"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ActivityDetailsScreenProps extends ActivityNavigatorScreenProps<"ActivityDetails"> { }

export const ActivityDetailsScreen: FC<ActivityDetailsScreenProps> = observer(function ActivityDetailsScreen(_props) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const sadFace = require("../../assets/images/sad-face.png")
  const $containerInsets = useSafeAreaInsetsStyle(["top"])
  const [participating, setParticipating] = React.useState(false)
  const [activityDetails, setActivityDetails] = React.useState<ActivityDetails>()
  const { navigation, route } = _props
  const activity = route.params

  React.useEffect(() => {
    api.getActivityDetails(activity.id).then((response) => {
      if (response.kind === "ok") {
        setActivityDetails(response.activityDetails)
        setParticipating(activityDetails?.isParticipating)
      }
    }).catch((e) => {
      console.error(e)
    })

  }, [])

  React.useEffect(() => {
    setParticipating(activityDetails?.isParticipating)
  }, [activityDetails])


  async function joinActivity(activityId: number) {
    const response = await api.joinActivity({ activityId })
    if (response.kind == "ok") {
      setParticipating(true)
    }
  }

  if (!activity) {
    return <EmptyState
      preset="generic"
      style={$containerInsets}
      headingTx="ActivityDetailsScreen.emptyStateHeading"
      contentTx="ActivityDetailsScreen.emptyStateContent"
      buttonTx="ActivityDetailsScreen.emptyStateButton"
      buttonOnPress={() => navigation.goBack()}
      ImageProps={{ resizeMode: "contain" }}
    />
  }


  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} style={styles.container} contentContainerStyle={{ height: '100%', justifyContent: 'center' }} >
      {/* Main Content */}
      <View style={styles.mainContent}>
        <View style={{ flexDirection: "row", alignItems: 'center', width: '100%', justifyContent: 'flex-start' }}>
          {activity?.imageUrl ?
            <FastImage
              resizeMode="cover"
              style={{
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 40,
                height: 80,
                width: 80,
                marginRight: spacing.md
              }}
              source={{ uri: activity?.imageUrl }}
              defaultSource={sadFace}
            />
            : <Image source={sadFace} style={[$imageContainer, { backgroundColor: 'grey' }]} />
          }
          <View>
            <Text style={styles.title}>{activity.title}</Text>
            <Text style={styles.author}>by {activity.userName}</Text>
          </View>
        </View>
        <Text style={styles.description}>
          {activity.description}
        </Text>
        <View>
          {/* Tags */}
          <Text text="Participants:" />
          <View style={styles.participantsContainer}>
            {activityDetails?.participants.map(part => (
              <Chip key={part ?? ""} style={styles.participants} textStyle={styles.partText} onPress={() => console.log('Pressed')}>{part ?? ""}</Chip>
            ))}
          </View>
          {/* Tags */}
          <Text text="Tags:" />
          <View style={styles.tagsContainer}>
            {activityDetails?.tags.map(tag => (
              <Chip key={tag} style={styles.tag} textStyle={styles.tagText} onPress={() => console.log('Pressed')}>{tag}</Chip>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            {participating ?
              <TouchableOpacity style={styles.participatingButton}>
                <Text style={styles.buttonText}>Participating</Text>
              </TouchableOpacity>
              : <TouchableOpacity style={styles.joinButton} onPress={() => { joinActivity(activity.id) }}>
                <Text style={styles.buttonText}> Join!</Text>
              </TouchableOpacity>
            }

          </View>
        </View>
      </View>

    </Screen>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  iconButton: {
    padding: 8,
  },
  interactionText: {
    fontSize: 14,
    color: '#333',
  },
  mainContent: {
    backgroundColor: colors.backgroundAccent,
    borderRadius: 25,
    padding: 16,
    marginHorizontal: 16,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    height: "60%",
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  author: {
    fontSize: 16,
    color: colors.textDim,
    marginBottom: 8,
  },
  description: {
    fontSize: 20,
    color: colors.text,
    marginBottom: 8,
  },
  participantsContainer: {
    justifyContent: "space-around",
    alignItems: "flex-start",
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  participants: {
    backgroundColor: colors.palette.secondary200,
    borderRadius: 18,
    margin: 3

  },

  partText: {
    color: colors.textDark
  },
  tagsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tag: {
    backgroundColor: colors.palette.secondary100,
    borderRadius: 18,
    margin: 3
  },
  tagText: {
    fontWeight: 'bold',
    fontSize: 8,
    color: colors.text
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  joinButton: {
    flexDirection: 'row',
    backgroundColor: colors.palette.accent100,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  participatingButton: {
    flexDirection: 'row',
    backgroundColor: colors.palette.neutral100,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.textDark,
    fontSize: 16,
    marginLeft: 8,
  },
  likedButtonText: {
    marginLeft: 8,
  },
  bottomNavPlaceholder: {
    height: 60,
    backgroundColor: '#C4C4C4', // Placeholder color for bottom navigation
    marginTop: 16,
  },
});
const $imageContainer: ImageStyle = {
  borderWidth: 1,
  borderColor: 'white',
  borderRadius: 40,
  height: 80,
  width: 80,
  marginRight: spacing.md
}
