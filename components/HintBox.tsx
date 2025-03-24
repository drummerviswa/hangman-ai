import { View, Text } from "react-native";
import React from "react";

type hintType = {
  hintData: string;
};

const HintBox = ({ hintData }: hintType) => {
  return (
    <View className="bg-green-600 px-24 py-4 rounded-lg">
      <Text className="text-white text-center text-xl">Hint</Text>
      <Text className="text-white text-center text-lg">{hintData}</Text>
    </View>
  );
};

export default HintBox;
