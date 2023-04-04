import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
// import Categories from "../../assets/model/categoryData";
import CategoryInfo from "./CategoryInfo";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  auth,
  collection,
  db,
  onSnapshot,
  query,
  where,
  signOut,
} from "../../firebase/index";
import uuid from "react-native-uuid";

const HomeScreen = ({ navigation }) => {
  const [pNotes, setPNotes] = useState([]);
  const [wNotes, setWNotes] = useState([]);
  const [iNotes, setINotes] = useState([]);
  const [lNotes, setLNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const allNotes = [...pNotes, ...wNotes, ...iNotes, ...lNotes];

  const getPNotes = () => {
    try {
      const unsub = onSnapshot(
        query(
          collection(db, "Personal"),
          where("userId", "==", auth.currentUser.uid)
        ),
        (querySnapshot) => {
          setPNotes(
            querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        }
      );
    } catch (e) {
      console.log("Error", e);
    }
  };

  const getWNotes = () => {
    try {
      const unsub = onSnapshot(
        query(
          collection(db, "Work"),
          where("userId", "==", auth.currentUser.uid)
        ),
        (querySnapshot) => {
          setWNotes(
            querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        }
      );
    } catch (e) {
      console.log("Error", e);
    }
  };

  const getINotes = () => {
    try {
      const unsub = onSnapshot(
        query(
          collection(db, "Ideas"),
          where("userId", "==", auth.currentUser.uid)
        ),
        (querySnapshot) => {
          setINotes(
            querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        }
      );
    } catch (e) {
      console.log("Error", e);
    }
  };

  const getLNotes = async () => {
    try {
      const unsub = onSnapshot(
        query(
          collection(db, "Lists"),
          where("userId", "==", auth.currentUser.uid)
        ),
        (querySnapshot) => {
          setLNotes(
            querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        }
      );
    } catch (e) {
      console.log("Error", e);
    }
  };
  const getAllNotes = () => {
    getPNotes();
    getWNotes();
    getINotes();
    getLNotes();
  };
  const setify = (ar) => {
    let setCat = new Set();
    ar.map((n) => setCat.add(n.category));
    const setArr = [...setCat];
    return setArr;
  };

  useEffect(() => {
    getAllNotes();
  }, []);
  const allCategories = setify(allNotes);
  const mapping = {
    Personal: pNotes.length,
    Work: wNotes.length,
    Ideas: iNotes.length,
    Lists: lNotes.length,
  };

  const transform = (arr) => {
    const tranformedArr = arr.map((c, i) => ({
      id: i,
      title: c,
      noOfItems: mapping[c],
    }));
    return tranformedArr;
  };

  const Categories = transform(allCategories);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setModalVisible(!modalVisible);
        navigation.popToTop();
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <View className="flex-1">
      <SafeAreaView>
        <View className="flex-row justify-center mt-20">
          <Text className="text-red-500 text-7xl font-bold">My </Text>
          <Text className="text-blue-800 text-7xl font-bold">Notes</Text>
        </View>
        <View className="my-28">
          <FlatList
            data={Categories}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  let categoryNotes;
                  //   const categoryNotes = CategoriesNotes[item.title];
                  //   navigation.navigate("CategoryNotes", {
                  //     title: item.title,
                  //     noOfNotes: item.noOfItems,
                  //     notes: categoryNotes,
                  //   });
                  // }
                  const { title, noOfItems } = item;

                  switch (title) {
                    case "Personal":
                      categoryNotes = pNotes;
                      break;
                    case "Work":
                      categoryNotes = wNotes;
                      break;
                    case "Ideas":
                      categoryNotes = iNotes;
                      break;
                    case "Lists":
                      categoryNotes = lNotes;
                      break;
                  }
                  navigation.navigate("CategoryNotes", {
                    title,
                    noOfNotes: noOfItems,
                    notes: categoryNotes,
                  });
                }}
              >
                <CategoryInfo title={item.title} noOfNotes={item.noOfItems} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View className="bg-blue-800 h-1/3 m-5 mt-56 rounded-2xl items-center justify-center">
              <TouchableOpacity className="self-end mr-5" onPress={() => setModalVisible(false)}>
                <AntDesign name="closecircle" size={24} color="white" />
              </TouchableOpacity>
              <View className="items-center p-5 rounded-2xl shadow-xl w-4/5 mt-6">
                <Text className="font-bold text-2xl mb-4 text-white">
                  SIGN OUT
                </Text>
                <Pressable
                  className="bg-white rounded-full w-1/2 items-center"
                  onPress={handleSignOut}
                >
                  <Text className="p-2 text-xl font-bold text-red-500">
                    Sign Out
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        <View className="place-self-end flex-row justify-between items-center mx-8">
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View className="items-center">
              <Entypo name="menu" size={60} color="indigo" />
              <Text className="text-red-500 text-lg">Menu</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ChooseCategory")}
          >
            <AntDesign name="pluscircle" size={90} color="red" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
