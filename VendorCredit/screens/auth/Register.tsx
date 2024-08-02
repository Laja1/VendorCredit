import React, { useState } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View, ScrollView,ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import tw from 'twrnc';
import axios from 'axios';
import { TextField } from '@/components/shared/TextField';
import Button from '@/components/shared/Button';
import {  Colors } from '@/constants/Colors';
import { NavigationProp } from '@/types/navigationType';
import { registerSchema } from '@/utils/validationSchema/authSchema';

const Register = () => {
  const navigation = useNavigation<NavigationProp>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onChange', // This will make the form validate on change
  });


  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await axios.post('http://localhost:3000/api/signup', data, {
        withCredentials: true,
      });

      console.log(res);
      if (res.status === 201) {
        setSuccessMessage("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          navigation.navigate('Login');
        }, 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to create an account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tw`flex-grow`}>
        <View style={tw`px-5 py-5 pt-10`}>
          <Text style={tw`text-[${Colors.primaryColor.text}] text-2xl font-bold`}>
            Create an Account
          </Text>
          <Text style={tw`text-[${Colors.primaryColor.text}] pt-4 pb-8`}>
            Enter your email and set a password. Or create an account with one of your social profiles.
          </Text>

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                id="firstname"
                label="First Name"
                placeholder=""
                error={errors.firstname?.message}
                onChange={onChange}
                value={value}
              />
            )}
            name="firstname"
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                id="lastname"
                label="Last Name"
                placeholder=""
                error={errors.lastname?.message}
                onChange={onChange}
                value={value}
              />
            )}
            name="lastname"
          />

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
            control={control}
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

          <View style={tw`flex-row gap-2 py-3 pr-5`}>
            <Image source={require('../../assets/images/info.png')} />
            <Text style={tw`text-[${Colors.primaryColor.text}] text-sm`}>
              Password must contain at least 8 characters, 1 upper case letter, 1 lower case letter, 1 number, and 1 special character.
            </Text>
          </View>
        </View>

        <View style={tw`flex justify-end items-center px-5 pb-5`}>
          <Button
          
            text="Create Account"
            onPress={handleSubmit(onSubmit)}
            style={tw`w-full mb-4`}
          />
           {errorMessage && <Text style={tw`text-red-600 mt-2`}>{errorMessage}</Text>}
              {successMessage && <Text style={tw`text-green-600 mt-2`}>{successMessage}</Text>}
       
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <View style={tw`flex-row mx-auto mt-2`}>
              <Text>Already have an account?</Text>
              <Text style={tw`pl-1 text-red-500`}>Login</Text>
            </View>
          </TouchableOpacity>
          <Text style={tw`text-[#94A3B8] uppercase text-sm mt-5`}>
            Your growth, our focus
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;