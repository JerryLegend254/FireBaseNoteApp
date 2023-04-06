import React, {useState} from "react"
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
} from "../../firebase/index";
const textContent = "Start your amazing note taking journey today";

const auth = getAuth();
const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: lName,
        })
          .then(() => {})
          .catch((e) => {
            alert(e);
          });
        navigation.navigate("LogIn");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  };
  return (
    <SafeAreaView className="flex-1 bg-blue-babyBlue">
      <View className="mt-5">
        <Text className="font-extrabold text-6xl self-center">REGISTER</Text>
      </View>
      <View className="my-8 mx-10 items-center">
        <Text className="font-bold text-2xl text-center">{textContent}</Text>
      </View>
      <View className="mx-10">
        <TextInput
          className="bg-white p-5 rounded-full"
          placeholder="Enter your first name"
          value={fName}
          onChangeText={(text) => setFName(text)}
          keyBoardAppearance="dark"
        />
        <TextInput
          className="bg-white p-5 rounded-full my-2"
          placeholder="Enter your last name"
          value={lName}
          onChangeText={(text) => setLName(text)}
          keyBoardAppearance="dark"
        />
        <TextInput
          className="bg-white p-5 rounded-full"
          placeholder="Enter your email address"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyBoardAppearance="dark"
        />
        <TextInput
          className="bg-white p-5 rounded-full my-2"
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          keyBoardAppearance="dark"
        />
        <TouchableOpacity
          className="m-10 bg-blue-button self-center w-5/6 rounded-md"
          onPress={handleRegister}
        >
          <View className=" self-center p-5">
            <Text className="text-white font-bold text-lg">REGISTER</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row self-center" onPress={() => navigation.navigate("LogIn")}>
          <Text className="font-bold">Already have an account ?</Text>
          <Text className="font-bold text-blue-button"> Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
