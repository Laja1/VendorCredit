import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import tw from 'twrnc';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { NavigationProp } from "@/types/navigationType";
import Button from "@/components/shared/Button";

import { LoanProps } from "@/types/loanType";


const LoanHistory: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loans, setLoans] = useState<LoanProps[]>([]);

  useEffect(() => {
    const fetchTokenAndLoans = async () => {
      setIsLoading(true);
      try {
        const storedToken = await AsyncStorage.getItem('access_token');
        if (!storedToken) {
          navigation.navigate('Login');
          return;
        }
        setToken(storedToken);
        const res = await axios.get<LoanProps[]>('http://localhost:3000/api/loans', {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setLoans(res.data);
      } catch (error) {
        console.error("Failed to retrieve token or loans:", error);
        setErrorMessage("Failed to retrieve loans.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokenAndLoans();
  }, [navigation]);

 const handleLogout = async()=>{
   await AsyncStorage.clear()
    navigaton.navigate('Login')
} 

  const renderLoan = ({ item }: { item: LoanProps }) => (
    <View style={tw`p-4 bg-white mb-4 rounded-lg shadow`}>
      <Text style={tw`text-lg font-semibold`}>Amount: {item.loanAmount}</Text>
      <Text style={tw`text-sm text-gray-600`}>Purpose: {item.loanPurpose}</Text>
      <Text style={tw`text-sm text-gray-600`}>Term: {item.loanTerm} months</Text>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`px-5 py-10`}>
        <View style={tw`mb-6 w-full justify-between flex-row items-center`}>
          <Text style={tw`text-xl font-bold`}>Welcome, Samuel</Text>
          <TouchableOpacity
            style={tw` bg-gray-200 p-3 rounded-full left-3`}
            onPress={handleLogout}
          >
            <AntDesign name="logout" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <Text>Loading...</Text>
        ) : errorMessage ? (
          <View style={tw`p-4 bg-red-100 rounded-lg`}>
            <Text style={tw`text-red-600`}>{errorMessage}</Text>
          </View>
        ) : loans.length === 0 ? (
          <View style={tw`p-4 bg-white rounded-lg shadow`}>
            <Text style={tw`text-lg font-semibold mb-2`}>There are no active loans</Text>
            <Text style={tw`text-sm text-gray-600`}>
              You haven’t completed any loans. Apply for a loan or repay an existing loan to get started.
            </Text>
            <View style={tw``}>
                <Button
                  text="Apply Now"
                  onPress={() => navigation.navigate('LoanApplication')}
                  style={tw`w-full mb-4`}
                />
              </View>
          </View>
        ) : (
          <FlatList
            data={loans}
            keyExtractor={(item) => item._id}
            renderItem={renderLoan}
            ListFooterComponent={
              <View style={tw`pb-10`}>
                <Button
                  text="Apply Now"
                  onPress={() => navigation.navigate('LoanApplication')}
                  style={tw`w-full mb-4`}
                />
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default LoanHistory;
