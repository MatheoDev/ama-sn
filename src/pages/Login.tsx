import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useAppDispatch } from "../helpers/hook"
import { loginUser } from "../helpers/userSlice"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { LogSignStackType } from "../router/types"
import { UserType } from "../helpers/types"

const Login = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<LogSignStackType>>();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const connect = () => {
    const user = {
      email,
      password
    } as UserType
    dispatch(loginUser(user))
  }

  return (
    <SafeAreaView className="flex-1">
    <Text className="text-4xl text-center pt-20">Ama</Text>
      <View className="flex gap-4 p-5 pt-10">
        <Text className="text-3xl font-bold">Se connecter</Text>
        <TextInput
          placeholder="Email"
          className="border border-gray-300 px-4 py-2 rounded-md"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Mot de passe"
          className="border border-gray-300 px-4 py-2 rounded-md"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => connect()}
          className="bg-gray-500 px-4 py-2 rounded-md"
        >
          <Text className="text-white text-center">Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          className="bg-white-500 px-4 py-2 rounded-md border border-gray-300"
        >
          <Text className="text-gray text-center">S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Login