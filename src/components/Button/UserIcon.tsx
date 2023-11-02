import { Feather } from '@expo/vector-icons'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native'
import { HomeStackType } from '../../router/types';
import { useNavigation } from '@react-navigation/native';

const UserIcon = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackType>>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('User')} className='flex items-center justify-center'>
      <Feather name="user" size={24} color="black"/>
    </TouchableOpacity>
  )
}

export default UserIcon