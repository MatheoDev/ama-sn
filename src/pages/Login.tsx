import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useAppDispatch, useAppSelector } from "../helpers/hook"
import { loginUser } from "../helpers/userSlice"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { LogSignStackType } from "../router/types"
import { UserType } from "../helpers/types"

const Login = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<LogSignStackType>>();
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorEmail, setErrorEmail] = useState<boolean>(false)
  const [errorPassword, setErrorPassword] = useState<boolean>(false)
  const errorLogin = useAppSelector(state => state.user.error)

  const validEmail = (email: string): boolean => {
    const regex = /\S+@\S+\.\S+/
    return regex.test(email)
  }

  const getError = (): boolean => {
    const isEmailInvalid = !email || !validEmail(email)
    const isPasswordInvalid = !password
    setErrorEmail(isEmailInvalid)
    setErrorPassword(isPasswordInvalid)
    return isEmailInvalid || isPasswordInvalid
  }

  const connect = () => {
    if (getError()) return

    const user = {
      email,
      password
    } as UserType

    dispatch(loginUser(user))
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row items-center justify-center pt-20 gap-1">
        <Image source={require('../../assets/rozo_logo2.png')} style={{ width: 50, height: 50 }} />
        <Text className="text-4xl">Rozo</Text>
      </View>
      <View className="flex gap-4 p-5 pt-10">
        <Text className="text-3xl font-bold">Se connecter</Text>
        <View className="flex flex-col gap-1">
          {errorLogin && <Text className="text-red-500 pl-1">Email ou mot de passe invalide</Text>}

          <TextInput
            placeholder="Email"
            className="border border-gray-300 px-4 py-2 rounded-md"
            value={email}
            onChangeText={setEmail}
          />
          {errorEmail && <Text className="text-red-500 pl-1">Email invalide</Text>}
        </View>
        <View className="flex flex-col gap-1">
          <TextInput
            placeholder="Mot de passe"
            className="border border-gray-300 px-4 py-2 rounded-md"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          {errorPassword && <Text className="text-red-500 pl-1">Mot de passe invalide</Text>}
        </View>
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