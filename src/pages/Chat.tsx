import { FlatList, SafeAreaView, Text, TouchableOpacity } from "react-native"
import { useAppDispatch, useAppSelector } from "../helpers/hook"
import { useEffect, useState } from "react"
import { fetchUsers, selectUserConnected, selectUsers } from "../helpers/userSlice"
import Conversation from "../components/Chat/Conversation"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../conf/firebase"
import { ConversationType } from "../helpers/types"
import { Entypo } from '@expo/vector-icons';
import ListUser from "../components/Modal/ListUser"

const Chat = () => {
  const [snapShot, setSnapShot] = useState<ConversationType[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const user = useAppSelector(selectUserConnected)
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
    <SafeAreaView className="flex-1">
      {
        users.length && showModal &&
        <ListUser
          showModal={showModal}
          setModal={setShowModal}
          snapShot={snapShot}
        />
      }

      {!users.length || !snapShot.length ?
        <Text className="text-center text-black text-xl my-10">
          Vous n'avez pas de conversation en cours
        </Text>
        :
        <FlatList
          data={snapShot}
          renderItem={({ item }) => <Conversation conv={item} users={users} />}
          keyExtractor={item => item.id as string}
        />
      }
      <TouchableOpacity
        className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center absolute bottom-5 right-5"
        onPress={() => setShowModal(true)}
      >
        <Entypo name="new-message" size={18} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Chat