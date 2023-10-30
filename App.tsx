import { Provider } from 'react-redux'
import { store } from './src/helpers/store'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAppDispatch } from './src/helpers/hook'
import { createUser, loginUser, logoutUser } from './src/helpers/userSlice'

const user = {
  email: 'matheo.deknuydt@gmail.com',
  password: 'Test1234@',
} as UserType

const WrapperApp = () => {
  const dispatch = useAppDispatch()

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity className='my-4' onPress={() => dispatch(loginUser(user))}>
        <Text>Connect</Text>
      </TouchableOpacity>


      <TouchableOpacity className='my-4' onPress={() => dispatch(logoutUser())}>
        <Text>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity className='my-4' onPress={() => dispatch(createUser(user))}>
        <Text>Sign up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

  export default function App() {
    return (
      <Provider store={store}>
        <WrapperApp />
      </Provider>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
