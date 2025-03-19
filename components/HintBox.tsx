import { View, Text } from "react-native";
import React from "react";

type hintType = {
  hintData: string;
};

const HintBox = ({ hintData }: hintType) => {
  return (
    <View className="bg-green-600 px-32 py-8 rounded-lg">
      <Text className="text-white text-center text-lg">Hint</Text>
      <Text className="text-white text-center text-2xl">{hintData}</Text>
    </View>
  );
};

export default HintBox;
