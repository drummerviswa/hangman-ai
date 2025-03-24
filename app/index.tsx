import HintBox from "@/components/HintBox";
import KeyboardLayout from "@/components/KeyboardLayout";
import ManFigure from "@/components/ManFigure";
import WordBox from "@/components/WordBox";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
    const [correctWord, setCorrectWord] = useState("REACT"); // Initial state for development
    const [hint, setHint] = useState("");
    const [correctLetters, setCorrectLetters] = useState<string[]>([]);
    const [wrongWord, setWrongWord] = useState(0);
    const [status, setStatus] = useState("");

    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const response = await fetch("http://localhost:5000/gameData");
                const data = await response.json();
                setCorrectWord(data.word.toUpperCase());
                setHint(data.hint);
            } catch (error) {
                console.error("Error fetching game data:", error);
                // Handle the error (e.g., show an error message)
            }
        };
        fetchGameData();
    }, []);

    const updateStatus = (cl: string[]) => {
        if (correctWord.split("").every((letter) => cl.includes(letter))) {
            setStatus("completed");
        }
    };

    const handleCorrectLetters = (input: string) => {
        const keyInput = input.toUpperCase();
        if (correctWord.includes(keyInput)) {
            if (!correctLetters.includes(keyInput)) {
                const updatedLetters = [...correctLetters, keyInput];
                setCorrectLetters(updatedLetters);
                updateStatus(updatedLetters);
            }
        } else {
            setWrongWord((prev) => prev + 1);
            if (wrongWord + 1 >= 8) {
                setStatus("gameOver");
            }
        }
    };

    const restartGame = () => {
        setCorrectLetters([]);
        setWrongWord(0);
        setStatus("");
        fetch("http://localhost:5000/gameData")
            .then((response) => response.json())
            .then((data) => {
                setCorrectWord(data.word.toUpperCase());
                setHint(data.hint);
            })
            .catch((error) => {
                console.error("Error fetching new game data:", error);
            });
    };

    return (
        <View className="grid grid-row-12 items-center gap-2 p-4 my-8 mx-4">
            <View className="row-span-6 gap-x-2">
                <ManFigure wrongWord={wrongWord} />
            </View>
            <View className="row-span-2 gap-y-2">
                <HintBox hintData={hint} />
            </View>
            <View className="row-span-4 gap-y-2">
                <WordBox correctWord={correctWord} correctLetters={correctLetters} />
                <KeyboardLayout onPressFn={handleCorrectLetters} />

                {status === "gameOver" && (
                    <Text className="text-red-500 text-lg">Game Over! Try Again.</Text>
                )}
                {status === "completed" && (
                    <Text className="text-green-500 text-lg">
                        You Completed All Words!
                    </Text>
                )}

                <TouchableOpacity
                    onPress={restartGame}
                    className="bg-red-500 text-white text-center p-2 rounded-lg"
                >
                    <Text className="text-white text-center">Restart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}