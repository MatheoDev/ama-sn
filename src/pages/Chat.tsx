import { FlatList, SafeAreaView, Text } from "react-native"
import { useAppDispatch, useAppSelector } from "../helpers/hook"
import { useEffect, useState } from "react"
import { fetchUsers, selectUserConnected, selectUsers } from "../helpers/userSlice"
import Conversation from "../components/Chat/Conversation"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../conf/firebase"
import { ConversationType } from "../helpers/types"

const Chat = () => {
  const [snapShot, setSnapShot] = useState<ConversationType[]>([])
  const user = useAppSelector(selectUserConnected)
  // const convs = useAppSelector(selectConversations)
  const users = useAppSelector(selectUsers)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  useEffect(() => {
    const collectionRef = collection(db, "Conversation")
    const q = query(collectionRef, where("users", "array-contains", user?.uid as string))
    const unsub = onSnapshot(q, (querySnapshot) => {
      const convs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as ConversationType[]
      setSnapShot(convs)
    })
    return () => unsub()
  }, [])

  return (
    <SafeAreaView>
      {!users.length || !snapShot.length ?
        <Text>Vous n'avez pas de conversation en cours</Text>
        :
        <FlatList
          data={snapShot}
          renderItem={({ item }) => <Conversation conv={item} users={users} />}
          keyExtractor={item => item.id}
        />
      }

    </SafeAreaView>
  )
}

export default Chat