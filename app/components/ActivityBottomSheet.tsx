import { ImageStyle, StyleSheet, TouchableOpacity, View , Image} from 'react-native'
import React, { useMemo, useState } from 'react'
import BottomSheet from "@gorhom/bottom-sheet";
import Handle from './BottomSheetHandle';
import { api, firebase } from "app/services/api"
import { useSafeAreaInsetsStyle } from 'app/utils/useSafeAreaInsetsStyle';
import { ActivityDetails } from 'app/models';
import { getDownloadURL, ref } from 'firebase/storage';
import { EmptyState } from './EmptyState';
import { AutoImage, Button, Screen, Text } from "app/components"
import { colors, spacing } from 'app/theme';
import { Chip } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';




const ActivityBottomSheet = (props: any) => {
    // variables
    const snapPoints = useMemo(() => ['25%', '80%'], []);

    const sadFace = require("../../assets/images/sad-face.png")
  const $containerInsets = useSafeAreaInsetsStyle(["top"])
  const [profilePic, setProfilePic] = React.useState("")
  const [participating, setParticipating] = React.useState(false)
  const [activityDetails, setActivityDetails] = React.useState<ActivityDetails>()
  const activity = props.activity
  React.useEffect(() => {
    const picRef = ref(firebase.storage, `users/admin/${activity.userName}/profilePic`);
    getDownloadURL(picRef).then(async (downloadURL) => {
      console.log('File available at', downloadURL);
      setProfilePic(downloadURL)
    }).catch(() => setProfilePic(""))
  }, [])
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

//   if (!activity) {
//     return <EmptyState
//       preset="generic"
//       style={$containerInsets}
//       headingTx="ActivityDetailsScreen.emptyStateHeading"
//       contentTx="ActivityDetailsScreen.emptyStateContent"
//       buttonTx="ActivityDetailsScreen.emptyStateButton"
//       buttonOnPress={() => navigation.goBack()}
//       ImageProps={{ resizeMode: "contain" }}
//     />
//   }

  
    return (
  
        <BottomSheet
            ref={props.bottomSheetRef}
            backgroundStyle = {{
                backgroundColor : 'rgb(39, 38, 39)',
            }}
            snapPoints={snapPoints}
            index={-1}
            // add bottom inset to elevate the sheet
            bottomInset={0}
            // set `detached` to true
            detached={false}
            
            handleComponent={Handle}
            enablePanDownToClose={true}
            style={styles.sheetContainer}
        >
            <TouchableOpacity  
                    onPress={() => {
                        props.bottomSheetRef.current?.close()
                    }}
                    style={styles.button}>
                    <MaterialIcons name="close" size={24} color="#909B9B" />
                </TouchableOpacity>
            <View style={styles.mainContent}>
            
                <View style={{ flexDirection: "row", alignItems: 'center', width: '100%', justifyContent: 'flex-start' }}>
                {profilePic ?
                    <AutoImage
                    resizeMode="cover"
                    resizeMethod="scale"
                    style={$imageContainer}
                    maxHeight={80}
                    maxWidth={80}
                    source={{ uri: profilePic }}
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
                        <Text preset="bold" style={styles.buttonText}> Join!</Text>
                    </TouchableOpacity>
                    }

                </View>
                </View>
            </View>
            

        </BottomSheet>
        

    )
}

export default ActivityBottomSheet

const styles = StyleSheet.create({

    sheetContainer: {
        // add horizontal space
        
        

        elevation: 24,
       


    },textstyle: {
        
        
        color: 'white',
        fontSize: 45,
        fontWeight: 'bold',
        
      
        
    }, desc : {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    }, container: {
        height: '100%',
        width: '100%',
        padding: 30,
        paddingTop: 0
    },
    button: {
        backgroundColor: '#484E4E',
        width: 35,
        height: 35,
        alignItems: 'center',
        position: 'absolute',
        right:10,
        top: 0,
        borderRadius: 20,
        paddingTop: '18%'

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
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        height: "91%",
        justifyContent: 'space-between',
        alignContent: 'center',
        marginTop: spacing.xxl
      },
      title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 4,
        width: "80%"
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
        backgroundColor: "#7b2cf5",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 32,
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginBottom: spacing.lg
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
        color: colors.palette.neutral100,
        fontSize: 19,
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
})

const $imageContainer: ImageStyle = {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 40,
    height: 80,
    width: 80,
    marginRight: spacing.md
  }

