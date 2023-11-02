import {View, Text} from "react-native";
import { useSelector } from "react-redux";


const TopicFeed = () => {
    const data = useSelector((state: any) => state.publication.list);
    return (
        <View>
            <Text>Topic Feed</Text>
        </View>
    );
};

export default TopicFeed