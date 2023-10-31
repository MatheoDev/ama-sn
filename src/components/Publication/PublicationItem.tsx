import { Text, TouchableOpacity, View } from "react-native";
import { PublicationType } from "../../helpers/types";

type PublicationItemProps = {
  item: PublicationType
}

const PublicationItem = ({ item }: PublicationItemProps) => {
  const date = new Date(item.date.seconds * 1000);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  return (
    <View className='w-11/12 bg-white my-3 rounded-md p-4 mx-auto'>
      <Text className='text-lg font-bold mb-4'>{item.title}</Text>
      <Text className='text-base mb-4'>{item.body}</Text>
      <Text className='text-sm text-gray-600 mb-4'>{formattedDate}</Text>
      <View className='flex-row justify-between items-center'>
        <View className='flex-row'>
          <TouchableOpacity className='mx-2'>
            <Text>Likes</Text>
          </TouchableOpacity>
          <TouchableOpacity className='mx-2'>
            <Text>Commentaires</Text>
          </TouchableOpacity>
          <TouchableOpacity className='mx-2'>
            <Text>Partages</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PublicationItem