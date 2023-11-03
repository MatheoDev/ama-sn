
import { FlatList, Modal, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../helpers/hook';
import { selectUserConnected, selectUsers } from '../../helpers/userSlice';
import { ConversationType } from '../../helpers/types';
import { createConversation } from '../../helpers/chatSlice';

type ListUserProp = {
  showModal: boolean,
  setModal: (value: boolean) => void,
  snapShot: ConversationType[]
}

const ListUser = ({ showModal, setModal, snapShot }: ListUserProp) => {
  const users = useAppSelector(selectUsers)
  const userConnected = useAppSelector(selectUserConnected)
  const usersInSnapShot = snapShot.map((conv) => conv.users).flat()
  const usersFiltered = users.filter((user) => user.uid !== userConnected?.uid && !usersInSnapShot.includes(user.uid))
  const dispatch = useAppDispatch()

  const handleClick = (uid: string) => {
    const conv: ConversationType = {
      users: [userConnected?.uid as string, uid],
    }
    dispatch(createConversation(conv))
    setModal(false)
  }

  return (
    <Modal
      className="flex-1"
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => setModal(false)}
    >
      <SafeAreaView className="flex-1">
        <TouchableOpacity
          className="flex-1"
          onPress={() => setModal(false)}
        />
        <SafeAreaView className="bg-white">
          <Text className="text-center text-black text-xl p-4 border-b border-gray-200">
            Choisir un utilisateur
          </Text>
          {
            !usersFiltered.length ?
              <Text className="text-center text-black text-base p-4 border-b border-gray-200">
                Vous parlez déjà avec tous les utilisateurs
              </Text>
              :
              <FlatList
                data={usersFiltered}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="flex-1"
                    onPress={() => handleClick(item.uid)}
                  >
                    <Text className="text-black text-base p-4 border-b border-gray-200">{item.pseudo}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.uid}
              />
          }
        </SafeAreaView>
      </SafeAreaView>
    </Modal>
  )
}

export default ListUser