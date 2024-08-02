import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import LoanHistory from '@/screens/loanhistory/LoanHistory'
// import LoanApplication from '@/screens/loanhistory/LoanApplication';

const Tab = createBottomTabNavigator();
export default function HomeLayout() {
  return (
   
      <Tab.Navigator>
           <Tab.Screen name="Home" component={LoanHistory} options={{headerShown:false,
 tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={25}/>
          ),
        }}/>
         
      </Tab.Navigator>

  );
}
