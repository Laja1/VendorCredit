import { StackNavigationProp } from '@react-navigation/stack';


type RootStackParamList = {
  Login: undefined;
  HomeLayout: undefined;
  Register:undefined
  LoanApplication:undefined
};

export type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;