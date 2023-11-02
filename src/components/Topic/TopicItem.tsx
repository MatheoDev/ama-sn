import {Text, TouchableOpacity} from "react-native";
import {TopicType} from "../../helpers/types";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FriendStackType} from '../../router/types';
import { useNavigation } from '@react-navigation/native';


type TopicItemProps = {
    item: TopicType
}

const TopicItem = ({item}: TopicItemProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<FriendStackType>>();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('TopicFeed', {id:item.id})} className='w-11/12 bg-white my-2 rounded-md p-2 mx-auto'>
                <Text className='text-lg font-bold mb-1'>{item.title}</Text>
                <Text className='text-base mb-2'>{item.description}</Text>
        </TouchableOpacity>
    );
};

export default TopicItem