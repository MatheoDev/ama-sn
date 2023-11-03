import { useRoute } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { FlatList, KeyboardAvoidingView, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { ChatType } from "../helpers/types"
import { Timestamp, collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { db } from "../conf/firebase"
import ChatMessage from "../components/Chat/ChatMessage"
import { useAppDispatch, useAppSelector } from "../helpers/hook"
import { selectUserConnected } from "../helpers/userSlice"
import { sendMessage } from "../helpers/chatSlice"

type ParamsRoute = {
  id: string
}

const ChatConv = () => {
  const route = useRoute()
  const params: ParamsRoute = route.params as ParamsRoute;
  const [snapShot, setSnapshot] = useState<ChatType[]>([])
  const [input, setInput] = useState<string>("")
  const user = useAppSelector(selectUserConnected)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const collectionRef = collection(db, "Chat")
    const q = query(collectionRef, where("idConversation", "==", params.id))
    const unsub = onSnapshot(q, (querySnapshot) => {
      const messagesSnap = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as ChatType[]
      messagesSnap.sort((a, b) => a.date.seconds - b.date.seconds)
      setSnapshot(messagesSnap)
    })
    return () => unsub()
  }, [])

  const handleSend = () => {
    const chat: ChatType = {
      idConversation: params.id,
      from: user?.uid as string,
      message: input,
      date: Timestamp.now()
    }
    dispatch(sendMessage(chat))
    setInput("")
  }

  return (
    <KeyboardAvoidingView className="flex-1" behavior="padding" keyboardVerticalOffset={100}>
      <SafeAreaView className="p-4 flex-1">
        {!snapShot.length ?
          <Text className="text-center text-black text-xl my-10">
            Aucun message n'est envoyé
          </Text>
          :
          <FlatList
            data={snapShot}
            renderItem={({ item }) => {
              return <ChatMessage chat={item} />
            }}
            keyExtractor={item => item.id as string}
          />
        }
        <View className="flex flex-row gap-2 p-2">
          <TextInput
            className="flex-1 border border-gray-300 rounded-md p-2 bg-white"
            placeholder="Votre message"
            value={input}
            onChangeText={setInput}

          />
          <TouchableOpacity
            className="flex-2 bg-blue-500 rounded-md p-2"
            onPress={() => handleSend()}
          >
            <Text className="text-white text-center">Envoyer</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default ChatConv