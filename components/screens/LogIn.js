import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
} from "../../firebase/index";
const textContent = "Welcome back! We missed you";

const auth = getAuth();

const LogIn = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigation.navigate("HomeScreen");
        setEmail("");
        setPassword("");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
    Keyboard.dismiss();
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);
  return (
    <KeyboardAvoidingView
      className="flex-1 items-center justify-center bg-blue-babyBlue"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <Text className="text-6xl font-extrabold">SIGN IN</Text>
      </View>
      <View className="my-8">
        <Text className="font-extrabold text-xl">{textContent}</Text>
      </View>
      <View className="mx-10 w-3/4">
        <TextInput
          className="bg-white p-5 rounded-full"
          placeholder="Enter your email address"
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          keyboardAppearance="dark"
        />
        <TextInput
          className="bg-white p-5 rounded-full my-2"
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          keyboardAppearance="dark"
        />
      </View>
      <TouchableOpacity
        className="m-4 bg-blue-button self-center w-2/3 rounded-md"
        onPress={handleSignIn}
      >
        <View className=" self-center p-5">
          <Text className="text-white font-bold text-lg">SIGN IN</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row self-center"
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        <Text className="font-bold">Don't have an account ?</Text>
        <Text className="font-bold text-blue-button"> Sign Up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default LogIn;
