import { SafeAreaView, Text, TouchableOpacity } from "react-native"
import { useAppDispatch } from "../helpers/hook"
import { createUser } from "../helpers/userSlice"

const user = {
  email: 'matheo.deknuydt@gmail.com',
  password: 'Test1234@',
} as UserType

const Signup = () => {
  const dispatch = useAppDispatch()

  return (
    <SafeAreaView>
      <TouchableOpacity className='my-4' onPress={() => dispatch(createUser(user))}>
        <Text>Sign up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Signup