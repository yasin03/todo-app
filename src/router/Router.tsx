import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Profile from "../screens/profile/Profile";
import TodoList from "../screens/todos/TodoList";
import TodayTodo from "../screens/todos/TodayTodo";

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
      <Stack.Screen name="List" component={TodoList} />
      <Stack.Screen name="Yapılacaklar" component={TodayTodo} />
    </Stack.Navigator>;
  };
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#383eff",
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
          component={TodayTodo}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Icon name="calendar-today" size={24} color={color} />
            ),
            headerShown: true,
            headerTitleStyle: {
              fontSize: 30,
            },
            headerStyle: {
              shadowColor: "#000",
              shadowOffset: {
                width: 5,
                height: 3,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4.65,
              elevation: 3,
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
            headerStyle: {
              shadowColor: "#000",
              shadowOffset: {
                width: 5,
                height: 3,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4.65,
              elevation: 3,
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
            headerStyle: {
              shadowColor: "#000",
              shadowOffset: {
                width: 5,
                height: 3,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4.65,
              elevation: 3,
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Router;
