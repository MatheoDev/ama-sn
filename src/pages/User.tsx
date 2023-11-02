import { useEffect } from "react"
import { Text, View } from "react-native"
import { useAppDispatch, useAppSelector } from "../helpers/hook"
import { fetchInfoUser, selectUserInfo } from "../helpers/userSlice"
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
    </View>
  )
}

export default User