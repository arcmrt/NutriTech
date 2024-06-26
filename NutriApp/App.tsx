import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import  fonts  from "./config/fonts";
import Navigation from '@/routers/navigators';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <SafeAreaProvider>
      <Navigation/>
    </SafeAreaProvider>
      
  );
}
/*
        <Tab.Navigator
          screenOptions={({ route }) => ({
            
            tabBarIcon: ({ focused, color, size }) => {
              let iconTag;
              size = 30;

              if(route.name === "Welcome"){
                iconTag = focused ? "earth": "earth-outline"; 
              }

              else if (route.name === 'Home') {
                iconTag = focused ? 'home' : 'home-outline';
                
              } 
              else if (route.name === 'Profile') {
                iconTag = focused ? 'person' : 'person-outline';
              }

              return <Ionicons name={iconTag} size={size} color={color} />;
            },

            // tabBar styling
            tabBarActiveTintColor: 'lightblue',
            tabBarInactiveTintColor: 'orange',
            tabBarLabelStyle: {
              fontSize: 12,
              color: "green",
              borderTopWidth: 1,
              borderTopColor: "lightgray",
              height: 15,
              fontWeight: "bold",
            },
            headerShown: false,
            animation:"fade",

          })}
        >
          <Tab.Screen name="Home"  component={HomeStackScreen} 
          listeners={() => ({
            tabPress: e => {
              // Prevent default action
              // e.preventDefault();
              // Do something with the `navigation` object
            }
          })} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
*/