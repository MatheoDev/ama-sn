import { SafeAreaView, Text, TouchableOpacity, FlatList, View, StyleSheet } from "react-native"
import { useAppDispatch } from "../helpers/hook"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchPublication } from "../helpers/publicationSlice"

const Home = () => {
  const data = useSelector((state: any) => state.publication.list);

  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(fetchPublication())
  }, [])

  console.log(data);

  const renderItem = ({ item }) => {
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

  return (
    <SafeAreaView className="">
      <FlatList 
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      {/* <TouchableOpacity className='my-4' onPress={() => dispatch(logoutUser())}>
        <Text>Logout</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  )
}

export default Home