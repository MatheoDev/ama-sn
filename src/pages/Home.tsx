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
    <SafeAreaView>
      <FlatList 
        data={data}
        renderItem={PublicationItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  )
}

export default Home