import { Text, TouchableOpacity, View } from "react-native";
import { PublicationType } from "../../helpers/types";
import { AntDesign, FontAwesome, Entypo } from '@expo/vector-icons';

type PublicationItemProps = {
  item: PublicationType
}

const PublicationItem = ({ item }: PublicationItemProps) => {
  const date = new Date(item.date.seconds * 1000);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours() < 10 ? '0'+date.getHours():date.getHours()}:${date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes()}`

  return (
    <View className='w-11/12 bg-white my-3 rounded-md p-4 mx-auto'>
      <Text className='text-lg font-bold mb-4'>{item.title}</Text>
      <Text className='text-base mb-4'>{item.body}</Text>
      <Text className='text-sm text-gray-600 mb-4'>{formattedDate}</Text>
      <View className='flex-row justify-around items-center'>
        <TouchableOpacity className='mx-2'>
          <AntDesign name="like1" size={18} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className='mx-2'>
          <FontAwesome name="comment" size={18} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className='mx-2'>
          <Entypo name="share-alternative" size={18} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PublicationItem