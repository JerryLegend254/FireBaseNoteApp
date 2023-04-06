import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { SvgXml } from "react-native-svg";
import SplashScreenSvg from "../../assets/splashScreen";
const textContent = "Jot something down whenever you need to. Be it personal, work related, ideas, or just lists. My notes helps you organize your notes very well.";
const SplashScreen = ({navigation}) => {
  return (
    <SafeAreaView className="bg-blue-babyBlue flex-1">
      <View className="mt-2 mb-20">
        <Text className="self-center text-6xl font-extrabold justify-center">
          My Notes App
        </Text>
      </View>
      <SvgXml
        className="self-center mr-16"
        height="256"
        width="197"
        xml={SplashScreenSvg}
      />
      <View className="m-10">
        <Text className="font-semibold text-xl">{textContent}</Text>
          </View>
          <TouchableOpacity className="m-10 bg-blue-button self-center w-2/3 rounded-md" onPress={() => navigation.navigate("RegisterScreen")}>
              <View className=" self-center p-5"><Text className="text-white font-bold text-lg">GET STARTED</Text></View>
          </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SplashScreen;
