import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
  Button,
  Platform,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/EvilIcons";
const eli = require("../assets/eli.png");
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import tw from "twrnc";

export default function User({ navigation }) {
  const [userinfo, setUserinfo] = useState("");

  useEffect(() => {
    // Retrieve userinfo from AsyncStorage
    AsyncStorage.getItem("userinfo")
      .then((value) => {
        console.log("Retrieved userinfo:", value); // Log retrieved value
        if (value) {
          setUserinfo(value);
        }
      })
      .catch((error) => {
        console.error("Error retrieving userinfo:", error.message);
      });
  }, []);

  const handleLogout = () => {
    AsyncStorage.clear();
    axios
      .get("http://localhost:3001/auth/logout")
      .then((result) => {
        console.log("successfully logged out");
        navigation.navigate("Reglog");
      })
      .catch((error) => {
        console.error("Error making request:", error.message);
      });
  };

  return (
    <SafeAreaView style={tw`h-full bg-[#040404] `}>
      <StatusBar barStyle="light-content" />
      <View style={tw`p-5 `}>
        <Text style={tw`text-white text-[24px] pb-5`}>Profile</Text>
        <View style={tw`flex-row items-center justify-between pr-3`}>
          <Image source={eli} />
          <Text style={tw`text-white font-bold  text-[20px]`}>{userinfo}</Text>
          <Icon name="chevron-right" size={35} color="white" />
        </View>
        <View style={tw` pt-5`}>
          <Text style={tw`text-white text-[24px]`}>Settings</Text>
          <View style={tw`items-center pt-5`}>
            <View style={tw`pb-3 `}>
              <View style={tw`flex-row items-center justify-between`}>
                <View style={tw`flex-row gap-3 items-center justify-between`}>
                  <Icon name="user" size={35} color="white" />
                  <Text style={tw`text-white text-[16px]`}>
                    Personal Information
                  </Text>
                </View>
                <Icon name="chevron-right" size={35} color="white" />
              </View>
              <Text
                style={{
                  marginTop: -5,
                  color: "#FFFFFF80",
                }}
              >
                ____________________________________________
              </Text>
            </View>
            <View style={tw`pb-3`}>
              <View style={tw`flex-row items-center justify-between`}>
                <View style={tw`flex-row gap-4 items-center justify-between`}>
                  <Ionicons name="card-outline" size={30} color="white" />
                  <Text style={tw`text-white text-[16px]`}>
                    Payments and Payouts
                  </Text>
                </View>
                <Icon name="chevron-right" size={35} color="white" />
              </View>
              <Text
                style={{
                  marginTop: -5,
                  color: "#FFFFFF80",
                }}
              >
                ____________________________________________
              </Text>
            </View>
            <View style={tw`pb-3`}>
              <View style={tw`flex-row items-center justify-between`}>
                <View style={tw`flex-row gap-5 items-center justify-between`}>
                  <AntDesign name="file1" size={25} color="white" />
                  <Text style={tw`text-white text-[16px]`}>Taxes</Text>
                </View>
                <Icon name="chevron-right" size={35} color="white" />
              </View>
              <Text
                style={{
                  marginTop: -5,
                  color: "#FFFFFF80",
                }}
              >
                ____________________________________________
              </Text>
            </View>
            <View style={tw`pb-3`}>
              <View style={tw`flex-row items-center justify-between`}>
                <View style={tw`flex-row gap-4 items-center justify-between`}>
                  <MaterialCommunityIcons
                    name="shield-check-outline"
                    size={30}
                    color="white"
                  />
                  <Text style={tw`text-white text-[16px]`}>
                    Login and Security
                  </Text>
                </View>
                <Icon name="chevron-right" size={35} color="white" />
              </View>
              <Text
                style={{
                  marginTop: -5,
                  color: "#FFFFFF80",
                }}
              >
                ____________________________________________
              </Text>
            </View>
            <View style={tw`pb-3`}>
              <View style={tw`flex-row items-center justify-between`}>
                <View style={tw`flex-row gap-7 items-center justify-between`}>
                  <FontAwesome6 name="person" size={30} color="white" />
                  <Text style={tw`text-white text-[16px]`}>Accessibility</Text>
                </View>
                <Icon name="chevron-right" size={35} color="white" />
              </View>
              <Text
                style={{
                  marginTop: -5,
                  color: "#FFFFFF80",
                }}
              >
                ____________________________________________
              </Text>
            </View>
            <View style={tw`pb-3`}>
              <View style={tw`flex-row items-center justify-between`}>
                <View style={tw`flex-row gap-4 items-center justify-between`}>
                  <MaterialCommunityIcons
                    name="google-translate"
                    size={30}
                    color="white"
                  />
                  <Text style={tw`text-white text-[16px]`}>Translation</Text>
                </View>
                <Icon name="chevron-right" size={35} color="white" />
              </View>
              <Text
                style={{
                  marginTop: -5,
                  color: "#FFFFFF80",
                }}
              >
                ____________________________________________
              </Text>
            </View>
            <View style={tw`pb-3`}>
              <View style={tw`flex-row items-center justify-between`}>
                <View style={tw`flex-row gap-5 items-center justify-between`}>
                  <Ionicons
                    name="notifications-outline"
                    size={25}
                    color="white"
                  />
                  <Text style={tw`text-white text-[16px]`}>Notifications</Text>
                </View>
                <Icon name="chevron-right" size={35} color="white" />
              </View>
              <Text
                style={{
                  marginTop: -5,
                  color: "#FFFFFF80",
                }}
              >
                ____________________________________________
              </Text>
            </View>
            <View style={tw`pb-3`}>
              <View style={tw`flex-row items-center justify-between`}>
                <View style={tw`flex-row gap-4 items-center justify-between`}>
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={30}
                    color="white"
                  />
                  <Text style={tw`text-white text-[16px]`}>
                    Privacy and Sharing
                  </Text>
                </View>
                <Icon name="chevron-right" size={35} color="white" />
              </View>
              <Text
                style={{
                  marginTop: -5,
                  color: "#FFFFFF80",
                }}
              >
                ____________________________________________
              </Text>
            </View>
          </View>
        </View>
        <View style={tw`mt-[20px] justify-center items-center`}>
          <TouchableOpacity onPress={() => handleLogout()}>
            <View
              style={tw`w-[200px] h-[52px] bg-[#ffffff] rounded-[10px] items-center justify-center`}
            >
              <Text style={tw`text-[16px]`}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
