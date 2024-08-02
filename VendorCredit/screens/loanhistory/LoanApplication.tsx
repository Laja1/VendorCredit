import { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import {  useNavigation } from "@react-navigation/native";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import AntDesign from 'react-native-vector-icons/AntDesign';
import tw from 'twrnc';
import { TextField } from "@/components/shared/TextField";
import { Colors } from "@/constants/Colors";
import Button from "@/components/shared/Button";
import { loanSchema } from "@/utils/validationSchema/loanSchema";
import { NavigationProp } from "@/types/navigationType";

const LoanApplication = () => {
  const navigation = useNavigation<NavigationProp>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loanSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('access_token');
        setToken(storedToken);
      } catch (error) {
        console.error("Failed to retrieve token:", error);
      }
    };

    fetchToken();
  }, []);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await axios.post('http://localhost:3000/api/request-loan', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201 && res.data) {
        setSuccessMessage("Loan request successfully submitted");
        setTimeout(() => {
          console.log(res);
          navigation.navigate('HomeLayout');
        }, 2000);
      } else {
        throw new Error('Unexpected response from the server');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to submit the loan application. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 p-5 `}>
     <View style={tw`p-5`}>
      <TouchableOpacity
        style={tw`absolute bg-gray-200 p-3 rounded-full left-3 top-2.5`}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={20} color="black" />
      </TouchableOpacity>
      <View style={tw`pt-14 justify-center`}>
        <Text style={tw`text-[${Colors.primaryColor.text}] text-2xl pb-4 font-bold`}>
          Loan Application
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              id="loanAmount"
              label="Loan Amount"
              placeholder="Enter loan amount"
              error={errors.loanAmount?.message}
              onChange={onChange}
              value={value}
            />
          )}
          name="loanAmount"
        />
        <View style={tw`flex-row items-center pb-2`}>
          <Image source={require('../../assets/images/info.png')} />
          <Text style={tw`text-[${Colors.primaryColor.text}] text-sm pl-2`}>
            Loan amount cannot exceed 80% of the cost of execution of this contract.
          </Text>
        </View>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              id="loanPurpose"
              label="Loan Purpose"
              placeholder="Enter loan purpose"
              error={errors.loanPurpose?.message}
              onChange={onChange}
              value={value}
            />
          )}
          name="loanPurpose"
        />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              id="loanTerm"
              label="Loan Term"
              placeholder="Enter loan term"
              error={errors.loanTerm?.message}
              onChange={onChange}
              value={value}
            />
          )}
          name="loanTerm"
        />
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primaryColor.text} />
        ) : (
          <>
            <Button
              text="Submit Loan Application"
              onPress={handleSubmit(onSubmit)}
              style={tw`w-full mt-4`}
            />
            {errorMessage && (
              <Text style={tw`text-red-600 mt-2`}>{errorMessage}</Text>
            )}
            {successMessage && (
              <Text style={tw`text-green-600 mt-2`}>{successMessage}</Text>
            )}
          </>
        )}
      </View>
      </View>
    </SafeAreaView>
  );
};

export default LoanApplication;
