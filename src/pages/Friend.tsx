import { FlatList, SafeAreaView, Text } from "react-native"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchTopic } from "../helpers/topicSlice"
import { useAppDispatch } from "../helpers/hook"
import TopicItem from "../components/Topic/TopicItem"

const Friend = () => {
  const data = useSelector((state: any) => state.topic.list);

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTopic())
  }, [])

  return (
    <SafeAreaView>
      <Text className="text-3xl text-left mt-5 p-2 ml-3">Explorez les racines</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => <TopicItem item={item} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
  )
}

export default Friend