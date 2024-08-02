import { NavigationProp } from "@/types/navigationType"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
const navigaton = useNavigation<NavigationProp>()
export const handleLogout = async()=>{
   await AsyncStorage.clear()
    navigaton.navigate('Login')
} 