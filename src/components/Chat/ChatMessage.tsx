import { Text, View } from "react-native"
import { useAppSelector } from "../../helpers/hook"
import { selectUserConnected } from "../../helpers/userSlice"
import { ChatType } from "../../helpers/types"

type ChatMessageProp = {
  chat: ChatType,
}

const ChatMessage = ({chat}: ChatMessageProp) => {
  const user = useAppSelector(selectUserConnected)
  const isSender = chat.from === user?.uid
  const timestamp = new Date(chat.date.seconds * 1000)
  const date = `${timestamp.getDate()}/${timestamp.getMonth() + 1}/${timestamp.getFullYear()} ${timestamp.getHours() < 10 ? '0' + timestamp.getHours() : timestamp.getHours()}:${timestamp.getMinutes() < 10 ? '0' + timestamp.getMinutes() : timestamp.getMinutes()}`

  return (
    <View className={`${isSender ? 'bg-blue-500' : 'bg-gray-300'} rounded-md my-2 mx-2 p-2`}>
      <View className={`px-1`}>
        <Text className={`${isSender ? 'text-base text-white text-right' : 'text-black text-left'}`}>
          {chat.message}
        </Text>
        <Text className={`${isSender ? 'text-gray-300 text-right' : 'text-gray-500 text-left'}`}>
          {date}
        </Text>
      </View>
    </View>
  )
}

export default ChatMessage