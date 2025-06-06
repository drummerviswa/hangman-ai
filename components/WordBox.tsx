// WordBox.tsx
import { View, Text, useWindowDimensions } from "react-native";
import React, { useMemo } from "react";

type WordBoxType = {
  correctWord: string;
  correctLetters: string[];
};

const WordBox = ({ correctWord, correctLetters }: WordBoxType) => {
  const { width: screenWidth, } = useWindowDimensions();

  // Define parameters for single row fitting
  const MAX_LETTERS_FOR_SINGLE_ROW = 10; // Words up to this length will try to fit on one row
  const PADDING_HORIZONTAL = 100; // Approx. total horizontal padding/margin around WordBox itself (px-2 is 8px each side = 16px, plus some safe margin)
  const MIN_BOX_SIZE = 28;     // Minimum practical size for a letter box (px)
  const MIN_FONT_SIZE = 14;    // Minimum practical font size (px)
  const LETTER_MARGIN = 4;     // Margin between letter boxes (px)

  const letterBoxProperties = useMemo(() => {
    const wordLength = correctWord.length;
    const availableWidth = screenWidth - PADDING_HORIZONTAL;

    if (wordLength === 0) { // Handle empty word case
        return { width: MIN_BOX_SIZE, height: MIN_BOX_SIZE, fontSize: MIN_FONT_SIZE, margin: LETTER_MARGIN };
    }

    // --- Logic to ensure single row for "small words" ---
    if (wordLength <= MAX_LETTERS_FOR_SINGLE_ROW) {
      // Calculate max width for a single box to fit all letters on one line
      const totalMarginSpace = (wordLength - 1) * LETTER_MARGIN;
      const calculatedBoxWidth = (availableWidth - totalMarginSpace) / wordLength;

      // Ensure calculated size is not too small
      const size = Math.max(calculatedBoxWidth, MIN_BOX_SIZE);

      return {
        width: size,
        height: size,
        fontSize: Math.max(size * 0.5, MIN_FONT_SIZE), // Font size roughly 50% of box size
        margin: LETTER_MARGIN,
      };
    } else {
      // --- Logic for longer words (will wrap) ---
      // For longer words, revert to a more fixed, smaller size that allows wrapping efficiently
      const size = Math.max(availableWidth / (wordLength / 2), MIN_BOX_SIZE); // Example: try to fit 2 rows roughly
      return {
        width: size,
        height: size,
        fontSize: Math.max(size * 0.5, MIN_FONT_SIZE),
        margin: LETTER_MARGIN,
      };
    }
  }, [correctWord, screenWidth]); // Recalculate if correctWord or screenWidth changes

  return (
    <View className="px-2 py-4 rounded-lg flex-row flex justify-center flex-wrap">
      {correctWord.split("").map((letter, index) => (
        <View
          key={index}
          style={{
            width: letterBoxProperties.width,
            height: letterBoxProperties.height,
            margin: letterBoxProperties.margin,
            backgroundColor: '#4B5563', // Tailwind gray-700
            borderRadius: 8, // Tailwind rounded-lg
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontSize: letterBoxProperties.fontSize,
              fontWeight: 'bold', // Tailwind font-extrabold
              color: 'white', // Tailwind text-white
              textAlign: 'center',
            }}
          >
            {correctLetters.includes(letter) ? letter : ""}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default WordBox;