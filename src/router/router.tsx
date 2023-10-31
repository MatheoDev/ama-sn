import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Feather } from '@expo/vector-icons'
import { HomeStackType, LogSignStackType, TabType } from "./types"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import { useAppSelector } from "../helpers/hook"
import { selectUserConnected } from "../helpers/userSlice"

const Tab = createBottomTabNavigator<TabType>();
const HomeStack = createNativeStackNavigator<HomeStackType>()
const LogSignStack = createNativeStackNavigator<LogSignStackType>()

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
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
        </Tab.Navigator>
        : 
        <LogSignStackScreen />
      }
    </NavigationContainer>
  )
}

export default Router