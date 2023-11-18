import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"

import { Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"
import { GiftedChat } from "react-native-gifted-chat"
import { useNavigation } from "@react-navigation/native"
import { firebase } from "app/services/api"
import { colors, spacing } from "app/theme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { addDoc, collection, CollectionReference, doc, DocumentReference, FieldValue, Firestore, getDoc, getDocs, onSnapshot, orderBy, query, runTransaction, serverTimestamp, setDoc, where, writeBatch } from "firebase/firestore"
import { ChattingNavigatorScreenProps } from "app/navigators/ChattingNavigator"
import { $tabBar } from "app/navigators/HomeNavigator"
interface ChatScreenProps extends ChattingNavigatorScreenProps<"Chat"> { }

export const ChatScreen: FC<ChatScreenProps> = observer(function ChatScreen(_props) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [messages, setMessages] = React.useState([]);
  const db = firebase.db
  // Pull in navigation via hook
  const { navigation, route } = _props
  const headerTitle = route.params
  const { bottom } = useSafeAreaInsets()
  const userId = firebase.auth?.currentUser?.uid

  interface Message {
    senderID: string;
    text: string;
    timestamp: FieldValue;
    read: boolean;
  }

  interface RenderedMessages {
    _id: string,
    text: string,
    createdAt: Date,
    user: {
      _id: string,
    }
  }

  interface ConversationData {
    userIDs: string[];
    lastMessage: string;
    lastMessageTimestamp: FieldValue;
    unreadCount: Record<string, number>;
  }

  function createMessage(userId: string, receiverId: string, messageText: string): void {
    const conversationsRef: CollectionReference = collection(db, 'conversations');
    const q = query(conversationsRef, where('userIDs', 'array-contains', userId));

    getDocs(q).then(querySnapshot => {
      let conversationRef: DocumentReference;

      const existingConversation = querySnapshot.docs.find(doc => doc.data().userIDs.includes(receiverId));

      if (existingConversation) {
        conversationRef = existingConversation.ref;
      } else {
        const newConversationRef: DocumentReference = doc(collection(db, 'conversations'));
        setDoc(newConversationRef, {
          userIDs: [userId, receiverId],
          lastMessage: messageText,
          lastMessageTimestamp: serverTimestamp(),
          unreadCount: { [userId]: 0, [receiverId]: 1 }
        });
        conversationRef = newConversationRef;
      }

      addMessageToConversation(conversationRef, userId, messageText);
    }).catch(error => console.error("Error finding conversation: ", error));
  }
  async function addMessageToConversation(conversationRef: DocumentReference, senderId: string, messageText: string): Promise<void> {
    const messagesRef: CollectionReference = collection(conversationRef, 'messages');
    const newMessageRef: DocumentReference = doc(messagesRef);

    try {
      // Perform the read operation outside the transaction
      const conversationSnapshot = await getDoc(conversationRef);
      if (!conversationSnapshot.exists()) {
        throw new Error("Conversation does not exist!");
      }
      const conversationData: ConversationData = conversationSnapshot.data() as ConversationData;

      await runTransaction(db, async (transaction) => {
        const timestamp = serverTimestamp();
        const messageData: Message = {
          senderID: senderId,
          text: messageText,
          timestamp: timestamp,
          read: false
        };

        transaction.set(newMessageRef, messageData);

        const updatedConversationData: Partial<ConversationData> = {
          lastMessage: messageText,
          lastMessageTimestamp: timestamp,
          unreadCount: incrementUnreadCounts(conversationData.unreadCount, senderId)
        };

        transaction.update(conversationRef, updatedConversationData);
      });

    } catch (error) {
      console.error("Transaction failed: ", error);
    }
  }



  function incrementUnreadCounts(unreadCounts: Record<string, number>, senderId: string): Record<string, number> {
    const updatedUnreadCounts: Record<string, number> = { ...unreadCounts };
    Object.keys(updatedUnreadCounts).forEach(userId => {
      if (userId !== senderId) {
        updatedUnreadCounts[userId] = (updatedUnreadCounts[userId] || 0) + 1;
      }
    });
    return updatedUnreadCounts;
  }

  function getConversation(userId: string, receiverId: string): void {
    const conversationsRef = collection(db, 'conversations');
    const conversationQuery = query(conversationsRef, where('userIDs', 'array-contains', userId));

    getDocs(conversationQuery).then(querySnapshot => {
      const conversationDoc = querySnapshot.docs.find(doc =>
        doc.data().userIDs.includes(userId) && doc.data().userIDs.includes(receiverId)
      );
      const newConversationRef = conversationDoc?.ref ?? doc(conversationsRef);
      if (!conversationDoc) {
        setDoc(newConversationRef, {
          userIDs: [userId, receiverId],
          lastMessage: "",
          lastMessageTimestamp: serverTimestamp(),
          unreadCount: { [userId]: 0, [receiverId]: 0 }
        });
      }

      const conversationRef: DocumentReference = newConversationRef;

      // Fetching messages with real-time updates
      const messagesRef = collection(conversationRef, 'messages');
      const messagesQuery = query(messagesRef, orderBy('timestamp', 'desc'));
      onSnapshot(messagesQuery, (snapshot) => {
        if (snapshot.empty) {
          setMessages([])
          return;
        }
        const messages: RenderedMessages[] = snapshot.docs.map(doc => ({
          _id: doc.id,
          text: doc.data()?.text?.text,
          createdAt: doc.data().timestamp.toDate(),
          user: {
            _id: doc.data().senderID,
          },
        }));

        setMessages(messages);
      });

      markMessagesAsRead(userId, receiverId);
    }).catch(error => {
      console.error("Error retrieving conversation: ", error);
    });
  }

  async function markMessagesAsRead(currentUserId: string, otherUserId: string): Promise<void> {
    const conversationsRef = collection(db, 'conversations');
    const conversationQuery = query(conversationsRef, where('userIDs', 'array-contains', currentUserId));

    try {
      const querySnapshot = await getDocs(conversationQuery);
      const conversationDoc = querySnapshot.docs.find(doc => doc.data().userIDs.includes(otherUserId));

      if (!conversationDoc) {
        console.error("Conversation not found!");
        return;
      }

      const conversationRef = conversationDoc.ref;
      const messagesRef = collection(conversationRef, 'messages');
      const unreadMessagesQuery = query(messagesRef, where('senderID', '!=', currentUserId), where('read', '==', false));

      const messagesSnapshot = await getDocs(unreadMessagesQuery);
      const batch = writeBatch(db);

      // Update each unread message
      messagesSnapshot.forEach(doc => {
        const messageRef = doc.ref;
        batch.update(messageRef, { read: true });
      });

      // Reset the unread count for the current user in the conversation
      if (!messagesSnapshot.empty) {
        const unreadCountUpdate = {};
        unreadCountUpdate[`unreadCount.${currentUserId}`] = 0;
        batch.update(conversationRef, unreadCountUpdate);
      }

      await batch.commit();

    } catch (error) {
      console.error("Error in marking messages as read: ", error);
      throw error;
    }
  }
  React.useLayoutEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    navigation.setOptions({ headerTitle: headerTitle?.toString() })

      ; (async function load() {
        await Promise.all([getConversation(userId, headerTitle?.toString())])
      })()
    return () => {
      navigation.getParent()?.setOptions({ tabBarStyle: [$tabBar, { display: "flex", height: bottom + 70, }] });

    }
  }, [navigation])



  const onSend = React.useCallback((messages = [], userId: string, receiverId: string) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    createMessage(userId, receiverId, messages.pop())
  }, []);

  return (

    <View style={{ height: '100%', paddingBottom: spacing.md, backgroundColor: colors.background }}>
      <GiftedChat
        messagesContainerStyle={{ backgroundColor: colors.background }}
        messages={messages}
        onSend={(messages) => onSend(messages, userId, headerTitle.toString())}
        user={{
          _id: firebase.auth?.currentUser?.uid,
          //avatar: auth?.currentUser?.photoURL
        }}
      />
    </View>

  )
})

const $root: ViewStyle = {
  flex: 1,
}
