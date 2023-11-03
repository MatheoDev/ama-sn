import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useAppDispatch, useAppSelector } from "../helpers/hook"
import { selectUserConnected, updateUser } from "../helpers/userSlice"
import { useState } from "react"
import { UserInfoType } from "../helpers/types"

const Setting = () => {
  const user = useAppSelector(selectUserConnected)
  const [pseudo, setPseudo] = useState<string>(user?.info?.pseudo ? user.info.pseudo : '')
  const [description, setDescription] = useState<string>(user?.info?.description ? user.info.description : '')
  const dispatch = useAppDispatch()

  const handleModify = () => {
    const userInfo: UserInfoType = {
      pseudo,
      description,
      uid: user?.uid as string
    }
    dispatch(updateUser(userInfo))
  }

  return (
    <SafeAreaView className="">
      <Text className="text-3xl text-left my-5 p-2 ml-2">
        Modifier vos paramètres
      </Text>
      <View className="flex flex-col gap-2 p-3">
        <TextInput placeholder="Pseudo" value={pseudo} className="bg-white border border-gray-300 px-4 py-2 rounded-md" onChangeText={setPseudo} />
        <TextInput placeholder="Description" value={description} className="bg-white border border-gray-300 px-4 py-2 rounded-md" onChangeText={setDescription} />
        <TouchableOpacity className="bg-gray-500 px-4 py-2 rounded-md" onPress={() => handleModify()}>
          <Text className="text-white text-center">Modifier</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Setting