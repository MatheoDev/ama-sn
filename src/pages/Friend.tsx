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
      <FlatList
        data={data}
        renderItem={TopicItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  )
}

export default Friend