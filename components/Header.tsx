import { View, Text, Button, TouchableOpacity } from "react-native";
import React from "react";
import { useColorScheme } from "nativewind";
import MAIcon from "react-native-vector-icons/MaterialIcons";

const Header = () => {
  const theme = useColorScheme();
  const myIcon = (
    <MAIcon
      name={theme.colorScheme !== "dark" ? "dark-mode" : "sunny"}
      size={30}
      color={theme.colorScheme !== "dark" ? "#000" : "#fff"}
    />
  );
  return (
    <View className="bg-primary px-4 py-2 rounded-b-xl flex justify-between items-center flex-row">
      <Text className="dark:text-white text-black text-center font-bold text-xl">
        Hangman
      </Text>
      <TouchableOpacity
        onPress={() => {
          theme.toggleColorScheme();
        }}
      >
        {myIcon}
      </TouchableOpacity>
    </View>
  );
};

export default Header;
