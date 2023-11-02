import {Text, View, TouchableOpacity} from "react-native";
import {TopicType} from "../../helpers/types";

type TopicItemProps = {
    item: TopicType
}

const TopicItem = ({item}: TopicItemProps) => {
    return (
        <TouchableOpacity>
            <View className='w-11/12 bg-white my-2 rounded-md p-2 mx-auto'>
                <Text className='text-lg font-bold mb-1'>{item.title}</Text>
                <Text className='text-base mb-2'>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default TopicItem