import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import List from "../screens/List";
import Detail from "../screens/Detail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Profile from "../screens/profile/Profile";
import TodoList from "../screens/todos/TodoList";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Router = () => {
  const HomeStackScreen: any = () => {
    <Stack.Navigator
      screenOptions={{
        headerTitle: "Ana Sayfa",
        headerTitleStyle: { color: "white" },
        headerStyle: { backgroundColor: "#134B7F" },
        headerBackTitleVisible: true,
      }}
    >
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Yapılacaklar" component={Detail} />
    </Stack.Navigator>;
  };
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#ef4444",
            height: 70,
            paddingTop: 10,
            paddingBottom: 10,
          },
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "rgba(255, 255, 255, 0.76)",
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen
          name="Bugün"
          component={List}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Icon name="calendar-today" size={24} color={color} />
            ),
            headerShown: true,
            headerTitleStyle: {
              fontSize: 30,
            },
          }}
        />
        <Tab.Screen
          name="Yapılacaklar"
          component={TodoList}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Icon name="format-list-bulleted-type" size={24} color={color} />
            ),
            headerShown: true,
            headerTitleStyle: {
              fontSize: 30,
            },
          }}
        />
        <Tab.Screen
          name="Profil"
          component={Profile}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Icon name="account-outline" size={24} color={color} />
            ),
            headerShown: true,
            headerTitleStyle: {
              fontSize: 30,
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Router;
