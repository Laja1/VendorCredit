import { TextField } from "@/components/shared/TextField"
import { Colors } from "@/constants/Colors"
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { yupResolver } from '@hookform/resolvers/yup';
import {useForm,Controller} from 'react-hook-form'
import { NavigationProp } from "@/types/navigationType";
import tw from 'twrnc'
import { LoginSchema } from "@/utils/validationSchema/authSchema"
import { useState } from "react";
import axios from 'axios'
import { useNavigation } from "@react-navigation/native";
import Button from "@/components/shared/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Login = () => {
  const navigation = useNavigation<NavigationProp>()
    const [isPasswordVisible, setIsPasswordVisible]= useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(LoginSchema),
    mode: 'onChange', // This will make the form validate on change
  });


  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await axios.post('http://localhost:3000/api/signin', data, {
        withCredentials: true,
      });

     const token = res.data.accessToken
        AsyncStorage.setItem('access_token', token)
      if (res.status === 200) {
        
        setSuccessMessage("Succesful login! Please wait ...");
        setTimeout(() => {
         
          navigation.replace('HomeLayout');
        }, 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <SafeAreaView style={{flex:1}}>
       <View style={{flex:2}}><View style={tw`px-5 py-5 pt-10 `}>
       <Text style={tw`text-[${Colors.primaryColor.text}] text-2xl font-bold`}>Welcome back</Text>
    <Text style={tw`text-[${Colors.primaryColor.text}] pt-4 pb-8`}>Log in to your Vendorcredit account to continue where you left off!</Text>
   <View>
   <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                id="email"
                label="Email"
                placeholder="customer@example.com"
                error={errors.email?.message}
                onChange={onChange}
                value={value}
              />
            )}
            name="email"
          />

          <Controller
            control=

{control}
            render={({ field: { onChange, value } }) => (
              <TextField
                id="password"
                label="Password"
                placeholder=""
                type={isPasswordVisible ? 'text' : 'password'}
                error={errors.password?.message}
                onChange={onChange}
                value={value}
                surfixIcon={
                  <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <Image source={require('../../assets/images/eye.png')} />
                  </TouchableOpacity>
                }
              />
            )}
            name="password"
          />
   <Button
            text="Login"
            onPress={handleSubmit(onSubmit)}
            style={tw`w-full mb-4`}
          />
           {errorMessage && <Text style={tw`text-red-600 mt-2`}>{errorMessage}</Text>}
              {successMessage && <Text style={tw`text-green-600 mt-2`}>{successMessage}</Text>}
       
  </View>
 <TouchableOpacity onPress={()=>navigation.navigate('Register')}><View style={tw`flex-row mx-auto mt-2`}><Text>Don’t have an account?</Text><Text style={tw`pl-1 text-red-500`}>Create an account</Text></View></TouchableOpacity> 
  
  </View>
  <View style={tw`pt-10 mx-auto`}><Text style={tw`text-[#94A3B8] uppercase text-sm`}>Your growth, our focus</Text></View></View>
    </SafeAreaView>
  )
}

export default Login
