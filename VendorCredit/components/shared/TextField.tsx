import React from 'react';
import { View, Text, TextInput } from 'react-native';
import tw from 'twrnc';
import { TextFieldProps } from '../types';
import { Colors } from '@/constants/Colors';

export const TextField = ({
  id,
  label,
  onChange,
  value,
  error,
  placeholder,
  surfixIcon,
  prefixIcon,
  type,
  width
}: TextFieldProps) => {
  const baseStyle = tw`border-[#94A3B8] border-2 shadow-sm text-sm p-3 rounded-md flex-row items-center`;
  const errorStyle = error ? tw`border-red-500` : tw`border-gray-300`;

  return (
    <View style={tw`mb-4`}>
      <Text style={tw`text-sm font-medium text-[${Colors.primaryColor.text}] mb-1`}>{label}</Text>
      <View style={[baseStyle, tw`relative items-center justify-center`]}>
        {prefixIcon && (
          <View style={tw`absolute inset-y-0 left-0 flex items-center pl-3`}>
            {prefixIcon}
          </View>
        )}
        <TextInput
          autoCapitalize='none'
          style={[
            errorStyle,
            tw`w-full`,
            prefixIcon && tw`pl-10`,
            surfixIcon && tw`pr-10`,
            width && { width }
          ]}
          placeholder={placeholder}
          placeholderTextColor="#6b7280"
          keyboardType={type === 'email' ? 'email-address' : 'default'}
          secureTextEntry={type === 'password'}
          onChangeText={onChange}
          value={value}
        />
        {surfixIcon && (
          <View style={tw`absolute inset-y-0 right-0 flex items-center pt-3 pr-3`}>
            {surfixIcon}
          </View>
        )}
      </View>
      
      {error && <Text style={tw`text-red-600 text-xs mt-1`}>{error}</Text>}
    </View>
  );
};

export default TextField;