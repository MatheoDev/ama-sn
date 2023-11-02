import { useEffect } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { useAppDispatch, useAppSelector } from "../helpers/hook"
import { fetchInfoUser, logoutUser, selectUserInfo } from "../helpers/userSlice"
import { UserInfoType } from "../helpers/types"

const User = () => {
  const dispatch = useAppDispatch()
  const info = useAppSelector(selectUserInfo) as UserInfoType

  useEffect(() => {
    dispatch(fetchInfoUser())
  }, [])

  return (
    <View className="p-5">
      { 
        info && <>
          <Text className="text-3xl">Bonjour @{ info.pseudo }</Text>
          <Text className="text-xl py-4">{ info.description }</Text>
        </>
      }
      <TouchableOpacity
        onPress={() => dispatch(logoutUser())}
        className="bg-red-500 rounded-md p-2"
      >
        <Text className="text-white text-center">Déconnexion</Text>
      </TouchableOpacity>
    </View>
  )
}

export default User