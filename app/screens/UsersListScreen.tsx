import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, FlatList, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { $tabBar, AppStackScreenProps, ChattingNavigatorScreenProps, HomeTabScreenProps } from "app/navigators"
import { Button, EmptyState, ListItem, Screen, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { isRTL, translate } from "app/i18n"
import { StyleSheet } from 'react-native';
import { lessOrEq } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { User, useStores } from "app/models"
import { firebase } from "app/services/api"
import { DocumentReference, FieldValue, collection, getDocs, limit, orderBy, query, where } from "firebase/firestore"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface UsersListScreenProps extends ChattingNavigatorScreenProps<"UsersList"> { }

export const UsersListScreen: FC<UsersListScreenProps> = observer(function UsersListScreen(_props) {

  interface ConvoBox {
    id: number,
    sender: string;
    lastMessage: Message;
  }

  interface Message {
    _id: string,
    text: string,
    createdAt: Date,
    user: {
      _id: string,
    }
  }
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const { userStore } = useStores()
  const [isLoading, setIsLoading] = React.useState(false)
  const { navigation } = _props
  const [profilePic, setProfilePic] = React.useState("")

  const db = firebase.db
  const userId = firebase.auth?.currentUser?.uid

  React.useEffect(() => {
    ; (async function load() {
      setIsLoading(true)
      await userStore.fetchUsers()
      await fetchMessages()
      setIsLoading(false)
    })()
  }, [userStore])

  async function manualRefresh() {
    setIsLoading(true)
    await Promise.all([userStore.fetchUsers(), fetchMessages()])
    setIsLoading(false)
  }
  const fetchMessages = async () => {
    if (userStore.usersForList.length > 0) {
      const promises = userStore.usersForList.map(async user => {
        const recentMessage = await getMostRecentMessage(userId, user?.login.toString())
        return ({
          id: user?.id,
          sender: user?.login.toString(),
          lastMessage: recentMessage
        })
      });

      Promise.all(promises).then(lastMessagesMap => {
        setLastMessages(lastMessagesMap);
      }).catch(error => {
        // Handle any errors here
        console.error('Error fetching messages:', error);
      });
    }
    return
  };

  function getMostRecentMessage(userId: string, receiverId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const conversationsRef = collection(db, 'conversations');
      const conversationQuery = query(conversationsRef, where('userIDs', 'array-contains', userId));

      getDocs(conversationQuery).then(querySnapshot => {
        const conversationDoc = querySnapshot.docs.find(doc =>
          doc.data().userIDs.includes(userId) && doc.data().userIDs.includes(receiverId)
        );

        if (!conversationDoc) {
          console.log('No conversation found');
          resolve(null); // Resolve the promise with null if there's no conversation
          return;
        }

        const conversationRef: DocumentReference = conversationDoc.ref;

        // Fetching the most recent message
        const messagesRef = collection(conversationRef, 'messages');
        const messagesQuery = query(messagesRef, orderBy('timestamp', 'desc'), limit(1));

        getDocs(messagesQuery).then(messagesSnapshot => {
          if (messagesSnapshot.empty) {
            console.log('No messages found');
            resolve(null); // Resolve the promise with null if there's no message
            return;
          }

          const mostRecentMessageDoc = messagesSnapshot.docs[0];
          const mostRecentMessage = {
            _id: mostRecentMessageDoc.id,
            text: mostRecentMessageDoc.data()?.text?.text,
            createdAt: mostRecentMessageDoc.data().timestamp.toDate(),
            user: {
              _id: mostRecentMessageDoc.data().senderID,
            },
          };
          resolve(mostRecentMessage); // Resolve the promise with the most recent message
        }).catch(error => {
          console.error("Error retrieving the most recent message: ", error);
          reject(error); // Reject the promise if there's an error
        });

      }).catch(error => {
        console.error("Error retrieving conversation: ", error);
        reject(error); // Reject the promise if there's an error
      });
    });
  }


  const [lastMessages, setLastMessages] = useState([])

  function openChat(userName: String) {
    navigation.navigate("Chat", userName)
  }

  return (
    <Screen preset="fixed" contentContainerStyle={$container} safeAreaEdges={["top"]}>
      <FlatList<ConvoBox>
        data={lastMessages}
        refreshing={isLoading}
        extraData={lastMessages.length}
        onRefresh={manualRefresh}
        //extraData={}
        contentContainerStyle={$flatListContentContainer}
        //refreshing={refreshing}
        //onRefresh={()=>}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <EmptyState
              preset="generic"
              style={$emptyState}
              headingTx="UsersListScreen.emptyStateHeading"
              contentTx="UsersListScreen.emptyStateContent"
              buttonTextStyle={{ color: colors.textDark }}
              //buttonOnPress={manualRefresh}
              imageStyle={$emptyStateImage}
              ImageProps={{ resizeMode: "contain" }}
            />
          )
        }
        renderItem={({ item }) => (
          <ListItem
            containerStyle={$listItemContainer}
            key={item?.id}
            textStyle={$listItemDescription}
            onPress={() => openChat(item?.sender)}
            LeftComponent={
              <View style={$leftComponent}>
                <Image
                  source={{
                    uri: 'https://imageio.forbes.com/specials-images/imageserve/5c76b7d331358e35dd2773a9/0x0.jpg?format=jpg&crop=4401,4401,x0,y0,safe&height=416&width=416&fit=bounds'
                  }}
                  style={{ width: 45, marginTop: spacing.xs - 3, height: 45, borderRadius: 50 / 2 }}
                />
              </View>
            }
          >
            {/* Direct children of ListItem for username and recent message */}
            <View style={styles.listItemContent}>
              <View style={styles.textSection}>
                <Text preset="bold" style={$listItemDescription}>{item.sender}</Text>
                <Text style={styles.lastMessageText}>
                  {item?.lastMessage?.text?.toString()} {/* Make sure this is a string */}
                </Text>
              </View>
              <View style={styles.timestampSection}>
                <Text style={styles.timestampText}>
                  {item?.lastMessage?.createdAt?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {/* You need to implement formatTimestamp */}
                </Text>
              </View>
            </View>
          </ListItem>
        )}

      />
    </Screen>
  )
})


const $container: ViewStyle = {
  flex: 1,
  marginTop: spacing.xxxl
}

const $flatListContentContainer: ViewStyle = {
  paddingTop: spacing.xl,
  paddingBottom: spacing.lg,
}

const $title: TextStyle = {
  marginBottom: spacing.xs - 4,
  fontSize: spacing.lg

}

const $tagline: TextStyle = {
  marginBottom: spacing.xxl,
}


const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $heading: ViewStyle = {
  marginBottom: spacing.md,
  marginLeft: spacing.md
}

const $emptyState: ViewStyle = {
  marginTop: spacing.xxl,
}

const $leftComponent: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
}

const $listItemDescription: TextStyle = {




}

const $userName: TextStyle = {
  fontSize: spacing.sm
}

const $listItemContainer: ViewStyle = {
  height: spacing.xxxl,
  justifyContent: 'center',
  backgroundColor: colors.backgroundAccent,
  borderWidth: 1,
  borderColor: "#3F3F3F",
  paddingHorizontal: spacing.sm
}

const styles = StyleSheet.create({
  listItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingLeft: spacing.md,
    paddingTop: spacing.md + 7
  },
  textSection: {
    justifyContent: 'center',
  },
  lastMessageText: {
    color: 'white',
    fontSize: 12,
  },
  timestampSection: {
    // Styles to align timestamp to the right
  },
  timestampText: {
    color: 'white',
    fontSize: 10,
  },
  // ... other styles
});




