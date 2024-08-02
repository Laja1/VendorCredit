import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "@/screens/auth/Login";
import Register from "@/screens/auth/Register";
import HomeLayout from "./HomeLayout";
import LoanApplication from "@/screens/loanhistory/LoanApplication";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
      
          <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
           <Stack.Screen name="HomeLayout" component={HomeLayout} options={{headerShown:false}}/>
          <Stack.Screen name="LoanApplication" component={LoanApplication} options={{headerShown:false}}/>
          
      </Stack.Navigator>
    </NavigationContainer>
  );
}
