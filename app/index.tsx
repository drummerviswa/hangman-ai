import HintBox from "@/components/HintBox";
import KeyboardLayout from "@/components/KeyboardLayout";
import ManFigure from "@/components/ManFigure";
import WordBox from "@/components/WordBox";
import { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  Animated,
  Easing,
} from "react-native"; // Import Modal, Animated, Easing
import Toast from "react-native-toast-message"; // We'll need to install this library

export default function Index() {
  const [correctWord, setCorrectWord] = useState(""); // Start with empty, will be fetched
  const [hint, setHint] = useState("");
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [wrongWord, setWrongWord] = useState(0);
  const [status, setStatus] = useState<"playing" | "completed" | "gameOver">(
    "playing"
  ); // More specific status
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [animatedValue] = useState(new Animated.Value(0)); // For animation

  // Function to start the game by fetching data
  const startGame = async () => {
    setCorrectLetters([]);
    setWrongWord(0);
    setStatus("playing");
    setModalVisible(false); // Hide modal on new game

    try {
      const response = await fetch("https://hangman-ai.onrender.com/gameData");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCorrectWord(data.word.toUpperCase());
      setHint(data.hint);
      Toast.show({
        type: "success",
        text1: "New Game Started!",
        text2: "Guess the word! Good luck!",
        visibilityTime: 3000,
      });
    } catch (error) {
      console.error("Error fetching game data:", error);
      Toast.show({
        type: "error",
        text1: "Failed to load game!",
        text2: "Please check your connection and try again.",
        visibilityTime: 4000,
      });
      // Set a default word if fetch fails
      setCorrectWord("FETCHERROR");
      setHint("Could not fetch game data.");
    }
  };

  // Initial game load
  useEffect(() => {
    startGame();
  }, []);

  // Animation for game over/completed modal
  useEffect(() => {
    if (status === "gameOver" || status === "completed") {
      setModalVisible(true);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else {
      animatedValue.setValue(0); // Reset animation for new game
    }
  }, [status]);

  const updateStatus = (cl: string[]) => {
    if (correctWord.split("").every((letter) => cl.includes(letter))) {
      setStatus("completed");
      Toast.show({
        text1Style: { fontSize: 20 },
        text2Style: { fontSize: 16 },
        type: "success",
        text1: "Congratulations!",
        text2: `You guessed the word: ${correctWord}!`,
        visibilityTime: 4000,
        topOffset: 80,
      });
    }
  };

  const handleCorrectLetters = (input: string) => {
    if (status !== "playing") return; // Prevent input if game is over/completed

    const keyInput = input.toUpperCase();
    if (correctWord.includes(keyInput)) {
      if (!correctLetters.includes(keyInput)) {
        const updatedLetters = [...correctLetters, keyInput];
        setCorrectLetters(updatedLetters);
        updateStatus(updatedLetters);
      } else {
        Toast.show({
          type: "info",
          text1: "Already guessed!",
          text2: `'${keyInput}' has already been tried.`,
          visibilityTime: 2000,
        });
      }
    } else {
      if (wrongWord + 1 < 8) {
        // Only increment if not already max wrong guesses
        setWrongWord((prev) => prev + 1);
        Toast.show({
          type: "error",
          text1: "Incorrect guess!",
          text2: `'${keyInput}' is not in the word.`,
          visibilityTime: 2000,
        });
      }

      if (wrongWord + 1 >= 8) {
        setWrongWord((prev) => prev + 1); // Increment one last time
        setStatus("gameOver");
        Toast.show({
          type: "error",
          text1: "Game Over!",
          text2: `The word was: ${correctWord}. Better luck next time!`,
          visibilityTime: 5000,
          topOffset: 80,
        });
      } else {
        setWrongWord((prev) => prev + 1);
      }
    }
  };

  const modalScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1], // Start smaller, scale to normal size
  });

  const modalOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1], // Fade in
  });

  return (
    <View className="flex-1 items-center justify-center p-4 bg-blue-100">
      <View className="flex-grow justify-center items-center">
        <ManFigure wrongWord={wrongWord} />
        <HintBox hintData={hint} />

        {/* Toast Message Component */}
        <WordBox correctWord={correctWord} correctLetters={correctLetters} />
      </View>

      {/* Keyboard Layout */}
      <View className="w-full max-w-lg mb-4">
        {/* Constrain keyboard width */}
        <KeyboardLayout onPressFn={handleCorrectLetters} />
      </View>

      {/* Game Over/Completed Modal */}
      <Modal
        animationType="none" // Controlled by Animated.Value
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <Animated.View
            style={{
              transform: [{ scale: modalScale }],
              opacity: modalOpacity,
            }}
            className="bg-white p-8 rounded-xl shadow-lg w-4/5 items-center"
          >
            {status === "gameOver" ? (
              <>
                <Text className="text-4xl font-bold text-red-600 mb-4">
                  GAME OVER!
                </Text>
                <Text className="text-xl text-gray-700 text-center mb-6">
                  The word was:{" "}
                  <Text className="font-bold text-blue-800">{correctWord}</Text>
                </Text>
              </>
            ) : (
              <>
                <Text className="text-4xl font-bold text-green-600 mb-4">
                  CONGRATULATIONS!
                </Text>
                <Text className="text-xl text-gray-700 text-center mb-6">
                  You've guessed the word:
                  <Text className="font-bold text-blue-800">{correctWord}</Text>
                </Text>
              </>
            )}
            <TouchableOpacity
              onPress={startGame} // Use startGame to reset and fetch new data
              className="bg-blue-600 px-6 py-3 rounded-full shadow-md active:bg-blue-700"
            >
              <Text className="text-white text-lg font-semibold">
                Play Again!
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
      {/* Main Game Content */}
      <Toast position="top" />
    </View>
  );
}
