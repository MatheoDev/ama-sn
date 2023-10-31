import { SafeAreaView, Text, TouchableOpacity } from "react-native"
import { logoutUser } from "../helpers/userSlice"
import { useAppDispatch } from "../helpers/hook"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchPublication } from "../helpers/publicationSlice"

const Home = () => {
  const data = useSelector((state: any) => state.publication);
  console.log(data);

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPublication())
  }, [data])

  return (
    <SafeAreaView className="flex-1 items-center justify-center">

      <TouchableOpacity className='my-4' onPress={() => dispatch(logoutUser())}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Home