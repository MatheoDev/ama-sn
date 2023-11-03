import { Feather } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native"
import { HomeStackType } from "../../router/types";

const SettingIcon = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackType>>();

  return (
    <TouchableOpacity className='flex items-center justify-center' onPress={() => navigation.navigate('Setting')}>
      <Feather name="settings" size={24} color="black"/>
    </TouchableOpacity>
  )
}

export default SettingIcon