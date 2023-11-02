import { Text, TouchableOpacity } from "react-native"
import { ConversationType, UserInfoType } from "../../helpers/types"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { ChatStackType } from "../../router/types"

type ConversationProp = {
  conv: ConversationType,
  users: UserInfoType[]
}

const Conversation = ({ conv, users }: ConversationProp) => {
  const navigation = useNavigation<NativeStackNavigationProp<ChatStackType>>()
  const usersConv = users.filter(user => conv.users.includes(user.uid))
  const userLabelConv = usersConv.map(user => user.pseudo).join(", ")

  return (
    <TouchableOpacity 
      className="my-2 mx-4 p-4 border border-gray-300 rounded-md bg-white"
      onPress={() => navigation.navigate("ChatConv", { id: conv.id, users: usersConv })}
    >
      <Text>
        {userLabelConv}
      </Text>
    </TouchableOpacity>
  )
}

export default Conversation