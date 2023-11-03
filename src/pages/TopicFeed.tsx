import { View, Text, RefreshControl, FlatList} from "react-native";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../helpers/hook";
import { fetchPublicationByTopic } from "../helpers/topicSlice";
import { useEffect } from "react"
import { useRoute } from "@react-navigation/native";
import PublicationItem from "../components/Publication/PublicationItem"

type ParamsRoute = {
    id: string
}

const TopicFeed = () => {
    const data = useSelector((state: any) => state.topic.listPublication);

    const route = useRoute()
    const params: ParamsRoute = route.params as ParamsRoute;

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchPublicationByTopic(params.id))
    }, [])
    return (
        <View>
            <FlatList
                data={data}
                renderItem={({ item }) => <PublicationItem item={item} />}
                keyExtractor={(item, index) => item.id || String(index)}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={() => dispatch(fetchPublicationByTopic(params.id))}
                    />
                }
            />
        </View>
    );
}

export default TopicFeed