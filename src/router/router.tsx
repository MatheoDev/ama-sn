import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Feather } from '@expo/vector-icons'
import {
  ChatStackType,
  CreatePublicationStackType,
  FriendStackType,
  HomeStackType,
  LogSignStackType,
  NotificationStackType,
  TabType
} from "./types"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import { useAppSelector } from "../helpers/hook"
import { selectUserConnected } from "../helpers/userSlice"
import Friend from "../pages/Friend"
import Notification from "../pages/Notification"
import CreatePublication from "../pages/CreatePublication"
import Chat from "../pages/Chat"
import UserIcon from "../components/Button/UserIcon"
import User from "../pages/User"
import TopicFeed from "../pages/TopicFeed"

const Tab = createBottomTabNavigator<TabType>();
const HomeStack = createNativeStackNavigator<HomeStackType>()
const LogSignStack = createNativeStackNavigator<LogSignStackType>()
const FriendStack = createNativeStackNavigator<FriendStackType>()
const NotificationStack = createNativeStackNavigator<NotificationStackType>()
const CreatePublicationStack = createNativeStackNavigator<CreatePublicationStackType>()
const ChatStack = createNativeStackNavigator<ChatStackType>()

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="Home"
        component={Home}
        options={
          {
            headerRight: () => <UserIcon />,
            title: 'Ama',
          }
        } 
      />
      <HomeStack.Screen name="User" component={User} />
    </HomeStack.Navigator>
  )
}

const LogSignStackScreen = () => {
  return (
    <LogSignStack.Navigator>
      <LogSignStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <LogSignStack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
    </LogSignStack.Navigator>
  )
}

const FriendStackScreen = () => {
  return (
    <FriendStack.Navigator>
      <FriendStack.Screen name="Friend" component={Friend} options={{ headerShown: false }} />
      <FriendStack.Screen name="TopicFeed" component={TopicFeed} options={{ headerShown: false }} />
    </FriendStack.Navigator>
  )
}

const NotificationStackScreen = () => {
  return (
    <NotificationStack.Navigator>
      <NotificationStack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
    </NotificationStack.Navigator>
  )
}

const CreatePublicationStackScreen = () => {
  return (
    <CreatePublicationStack.Navigator>
      <CreatePublicationStack.Screen name="CreatePublication" component={CreatePublication} options={{ headerShown: false }} />
    </CreatePublicationStack.Navigator>
  )
}

const ChatStackScreen = () => {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
    </ChatStack.Navigator>
  )
}

const Router = () => {
  const currentUser = useAppSelector(selectUserConnected)

  return (
    <NavigationContainer>
      {
        currentUser ?
          <Tab.Navigator initialRouteName='HomePage'>
            <Tab.Screen
              name="HomePage"
              component={HomeStackScreen}
              options={{ headerShown: false, tabBarShowLabel: false, tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} /> }}
            />
            <Tab.Screen
              name="FriendPage"
              component={FriendStackScreen}
              options={{ headerShown: false, tabBarShowLabel: false, tabBarIcon: ({ color, size }) => <Feather name="users" size={size} color={color} /> }}
            />
            <Tab.Screen
              name="CreatePublicationPage"
              component={CreatePublicationStackScreen}
              options={{ headerShown: false, tabBarShowLabel: false, tabBarIcon: ({ color, size }) => <Feather name="plus" size={size} color={color} /> }}
            />
            <Tab.Screen
              name="ChatPage"
              component={ChatStackScreen}
              options={{ headerShown: false, tabBarShowLabel: false, tabBarIcon: ({ color, size }) => <Feather name="message-circle" size={size} color={color} /> }}
            />
            <Tab.Screen
              name="NotificationPage"
              component={NotificationStackScreen}
              options={{ headerShown: false, tabBarShowLabel: false, tabBarIcon: ({ color, size }) => <Feather name="bell" size={size} color={color} /> }}
            />
          </Tab.Navigator>
          :
          <LogSignStackScreen />
      }
    </NavigationContainer>
  )
}

export default Router