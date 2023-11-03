import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useAppDispatch, useAppSelector } from "../helpers/hook"
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
  const [errorEmail, setErrorEmail] = useState<boolean>(false)
  const [errorPassword, setErrorPassword] = useState<boolean>(false)
  const [errorPasswordConfirmation, setErrorPasswordConfirmation] = useState<boolean>(false)
  const errorLogin = useAppSelector(state => state.user.error)

  const validEmail = (email: string): boolean => {
    const regex = /\S+@\S+\.\S+/
    return regex.test(email)
  }

  const validPassword = (password: string): boolean => {
    // min 8 characters, 1 uppercase, 1 lowercase, 1 number
    // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    // return regex.test(password)
    return password.length >= 8
  }

  const getError = (): boolean => {
    const isEmailInvalid = !email || !validEmail(email)
    const isPasswordInvalid = !password || !validPassword(password)
    const isPasswordConfirmationInvalid = !passwordConfirmation || passwordConfirmation !== password
    setErrorEmail(isEmailInvalid)
    setErrorPassword(isPasswordInvalid)
    setErrorPasswordConfirmation(isPasswordConfirmationInvalid)
    return isEmailInvalid || isPasswordInvalid || isPasswordConfirmationInvalid
  }

  const register = () => {
    if (getError()) return

    const user = {
      email,
      password
    } as UserType
    dispatch(createUser(user))
  }

  return (
    <SafeAreaView className="flex-1">
    <Text className="text-4xl text-center pt-20">Rozo</Text>
      <View className="flex gap-4 p-5 pt-10">
        <Text className="text-3xl font-bold">S'inscrire</Text>
        {errorLogin && <Text className="text-red-500 pl-1">Le compte n'a pas pu être créé</Text>}
        <View className="flex flex-col gap-1">
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
        <View className="flex flex-col gap-1">
          <TextInput
            placeholder="Confirmation du mot de passe"
            className="border border-gray-300 px-4 py-2 rounded-md"
            secureTextEntry={true}
            value={passwordConfirmation}
            onChangeText={setPasswordConfirmation}
          />
          {errorPasswordConfirmation && <Text className="text-red-500 pl-1">Les mots de passe ne correspondent pas</Text>}
        </View>
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