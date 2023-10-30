import { SafeAreaView, Text, TouchableOpacity } from "react-native"
import { logoutUser } from "../helpers/userSlice"
import { useAppDispatch } from "../helpers/hook"

const Home = () => {
  const dispatch = useAppDispatch()

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <TouchableOpacity className='my-4' onPress={() => dispatch(logoutUser())}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Home