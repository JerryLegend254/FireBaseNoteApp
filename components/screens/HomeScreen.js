import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Categories from "../../assets/model/categoryData";
import CategoryInfo from "./CategoryInfo";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import CategoriesNotes from "../../assets/model/CategoryNotesMock"

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <View className="flex-0.1 flex-row justify-center mt-20">
        <Text className="text-red-500 text-7xl font-bold">My </Text>
        <Text className="text-blue-800 text-7xl font-bold">Notes</Text>
      </View>
      <View className="my-24">
        <FlatList
          data={Categories}
          renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {
                  const categoryNotes = CategoriesNotes[item.title]
                  navigation.navigate("CategoryNotes", {title: item.title, noOfNotes: item.noOfItems, notes: categoryNotes});

              }
              } >
              <CategoryInfo title={item.title} noOfNotes={item.noOfItems} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View className="flex-row justify-between items-center mx-8">
        <TouchableOpacity>
          <View className="items-center">
            <Entypo name="menu" size={60} color="indigo" />
            <Text className="text-red-500 text-lg">Menu</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ChooseCategory")}>
          <AntDesign name="pluscircle" size={90} color="red" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
