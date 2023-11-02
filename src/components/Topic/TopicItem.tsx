import {Text, View} from "react-native";
import {TopicType} from "../../helpers/types";

type TopicItemProps = {
    item: TopicType
}

const TopicItem = ({item}: TopicItemProps) => {
    console.log(item)
    return (
        <View className='w-11/12 bg-white my-3 rounded-md p-4 mx-auto'>
            <Text className='text-lg font-bold mb-4'>{item.title}</Text>
            <Text className='text-base mb-4'>{item.description}</Text>
            <View className='flex-row justify-around items-center'>
            </View>
        </View>
    );
};

export default TopicItem