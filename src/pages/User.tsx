import { useEffect, useState } from "react"
import { FlatList, RefreshControl, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { useAppDispatch, useAppSelector } from "../helpers/hook"
import { fetchInfoUser, logoutUser, selectUserConnected, selectUserInfo } from "../helpers/userSlice"
import { PublicationType, UserInfoType } from "../helpers/types"
import { fetchPublicationByUser, selectListPubUser } from "../helpers/publicationSlice"
import PublicationItem from "../components/Publication/PublicationItem"

const User = () => {
  const dispatch = useAppDispatch()
  const [pubOrShare, setPubOrShare] = useState<'pub' | 'share'>('pub')
  const user = useAppSelector(selectUserConnected)
  const info = useAppSelector(selectUserInfo) as UserInfoType
  const publications = useAppSelector(selectListPubUser) as PublicationType[]

  useEffect(() => {
    dispatch(fetchInfoUser(user?.uid as string))
    dispatch(fetchPublicationByUser(user?.uid as string))
  }, [])

  return (
    <SafeAreaView className="flex-1">
      <View className="p-5">
        {
          info ? <>
            <Text className="text-3xl">Bonjour @{info.pseudo}</Text>
            <Text className="text-xl pt-4">{info.description}</Text>
          </>
          : <Text className="text-xl">Bonjour, veuillez créer votre profil dans les paramètres</Text>
        }
      </View>
      <View className="flex flex-row justify-around py-4">
        <TouchableOpacity onPress={() => setPubOrShare('pub')} className={`w-1/2 border-b-2 ${pubOrShare === 'pub' ? 'border-info-300' : 'border-gray-300'}`}>
          <Text className="text-center pb-3 text-xl">Publications</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setPubOrShare('share')} className={`w-1/2 border-b-2 ${pubOrShare === 'share' ? 'border-info-300' : 'border-gray-300'}`}>
          <Text className="text-center pb-3 text-xl">Partager</Text>
        </TouchableOpacity>
      </View>
      {
        publications && pubOrShare === 'pub' &&
        <FlatList
          data={publications}
          renderItem={({ item }) => <PublicationItem item={item} />}
          keyExtractor={item => item.id as string}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => dispatch(fetchPublicationByUser(user?.uid as string))}
            />
          }
        />
      }
      <TouchableOpacity
        onPress={() => dispatch(logoutUser())}
        className="bg-red-500 rounded-md m-3 p-2"
      >
        <Text className="text-white text-center">Déconnexion</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default User