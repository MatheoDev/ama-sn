import { SafeAreaView, Text, TouchableOpacity, FlatList, View, StyleSheet } from "react-native"
import { useAppDispatch } from "../helpers/hook"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchPublication } from "../helpers/publicationSlice"
import PublicationItem from "../components/Publication/PublicationItem"

const Home = () => {
  const data = useSelector((state: any) => state.publication.list);

  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(fetchPublication())
  }, [])

  return (
    <SafeAreaView className="">
      <FlatList 
        data={data}
        renderItem={PublicationItem}
        keyExtractor={item => item.id}
      />

      {/* <TouchableOpacity className='my-4' onPress={() => dispatch(logoutUser())}>
        <Text>Logout</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  )
}

export default Home