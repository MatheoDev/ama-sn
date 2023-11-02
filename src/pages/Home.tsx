import { SafeAreaView, FlatList, RefreshControl } from "react-native"
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
        keyExtractor={(item, index) => item.id || String(index)}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => dispatch(fetchPublication())}
          />
        }
      />
    </SafeAreaView>
  )
}

export default Home