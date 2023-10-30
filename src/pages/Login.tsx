import { SafeAreaView, Text, TouchableOpacity } from "react-native"
import { useAppDispatch } from "../helpers/hook"
import { loginUser } from "../helpers/userSlice"

const user = {
  email: 'matheo.deknuydt@gmail.com',
  password: 'Test1234@',
} as UserType

const Login = () => {
  const dispatch = useAppDispatch()

  return (
    <SafeAreaView>
      <TouchableOpacity className='my-4' onPress={() => dispatch(loginUser(user))}>
        <Text>Connect</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Login