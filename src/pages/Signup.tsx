import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useAppDispatch } from "../helpers/hook"
import { createUser } from "../helpers/userSlice"
import { UserType } from "../helpers/types"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { LogSignStackType } from "../router/types"

const Signup = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<LogSignStackType>>();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const register = () => {
    const isSamePassword = password === passwordConfirmation
    if (!isSamePassword) {
      return
    }

    const user = {
      email,
      password
    } as UserType
    dispatch(createUser(user))
  }

  return (
    <SafeAreaView className="flex-1">
    <Text className="text-4xl text-center pt-20">Ama</Text>
      <View className="flex gap-4 p-5 pt-10">
        <Text className="text-3xl font-bold">S'inscrire</Text>
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
        <TextInput
          placeholder="Confirmation du mot de passe"
          className="border border-gray-300 px-4 py-2 rounded-md"
          secureTextEntry={true}
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
        />
        <TouchableOpacity
          onPress={() => register()}
          className="bg-gray-500 px-4 py-2 rounded-md"
        >
          <Text className="text-white text-center">S'inscrire</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-white-500 px-4 py-2 rounded-md border border-gray-300"
        >
          <Text className="text-gray text-center">Se connecter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Signup